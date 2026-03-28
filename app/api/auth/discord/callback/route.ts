import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionMaxAge,
  SESSION_COOKIE_NAME,
  SessionUser,
} from "@/lib/auth-session";
import { DISCORD_STATE_COOKIE_NAME, getDiscordConfig } from "@/lib/discord-oauth";

interface DiscordTokenResponse {
  access_token?: string;
}

interface DiscordUserResponse {
  id?: string;
  username?: string;
  global_name?: string | null;
  avatar?: string | null;
}

function redirectWithError(request: NextRequest, message: string): NextResponse {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url);
}

function buildAvatarUrl(user: DiscordUserResponse): string | null {
  if (!user.id || !user.avatar) return null;
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`;
}

export async function GET(request: NextRequest) {
  let config;
  try {
    config = getDiscordConfig();
  } catch {
    return redirectWithError(request, "server_config_error");
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");
  const cookieState = request.cookies.get(DISCORD_STATE_COOKIE_NAME)?.value;

  if (oauthError) {
    return redirectWithError(request, oauthError);
  }

  if (!code || !state || !cookieState || state !== cookieState) {
    return redirectWithError(request, "invalid_oauth_state");
  }

  const tokenBody = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    client_id: config.clientId,
    client_secret: config.clientSecret,
    redirect_uri: config.redirectUri,
  });

  const tokenResponse = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: tokenBody,
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    return redirectWithError(request, "token_exchange_failed");
  }

  const tokenData = (await tokenResponse.json()) as DiscordTokenResponse;
  if (!tokenData.access_token) {
    return redirectWithError(request, "missing_access_token");
  }

  const userResponse = await fetch("https://discord.com/api/users/@me", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
    cache: "no-store",
  });

  if (!userResponse.ok) {
    return redirectWithError(request, "userinfo_failed");
  }

  const userInfo = (await userResponse.json()) as DiscordUserResponse;
  if (!userInfo.id || !userInfo.username) {
    return redirectWithError(request, "invalid_userinfo");
  }

  const user: SessionUser = {
    id: userInfo.id,
    name: userInfo.global_name ?? userInfo.username,
    username: userInfo.username,
    avatarUrl: buildAvatarUrl(userInfo),
  };

  const sessionToken = createSessionToken(user, config.sessionSecret);
  const response = NextResponse.redirect(new URL("/", request.url));

  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionToken,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: getSessionMaxAge(),
  });
  response.cookies.set({
    name: DISCORD_STATE_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}
