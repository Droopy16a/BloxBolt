import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  getSessionMaxAge,
  SESSION_COOKIE_NAME,
  SessionUser,
} from "@/lib/auth-session";
import { ROBLOX_STATE_COOKIE_NAME, getRobloxConfig } from "@/lib/roblox-oauth";

interface RobloxTokenResponse {
  access_token?: string;
}

interface RobloxUserinfoResponse {
  sub?: string;
  name?: string;
  preferred_username?: string;
  nickname?: string;
  picture?: string;
}

function redirectWithError(request: NextRequest, message: string): NextResponse {
  const url = new URL("/login", request.url);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url);
}

export async function GET(request: NextRequest) {
  let config;
  try {
    config = getRobloxConfig();
  } catch {
    return redirectWithError(request, "server_config_error");
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");
  const cookieState = request.cookies.get(ROBLOX_STATE_COOKIE_NAME)?.value;

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

  const tokenResponse = await fetch("https://apis.roblox.com/oauth/v1/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: tokenBody,
    cache: "no-store",
  });

  if (!tokenResponse.ok) {
    return redirectWithError(request, "token_exchange_failed");
  }

  const tokenData = (await tokenResponse.json()) as RobloxTokenResponse;
  if (!tokenData.access_token) {
    return redirectWithError(request, "missing_access_token");
  }

  const userinfoResponse = await fetch(
    "https://apis.roblox.com/oauth/v1/userinfo",
    {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
      cache: "no-store",
    },
  );

  if (!userinfoResponse.ok) {
    return redirectWithError(request, "userinfo_failed");
  }

  const userinfo = (await userinfoResponse.json()) as RobloxUserinfoResponse;
  if (!userinfo.sub) {
    return redirectWithError(request, "invalid_userinfo");
  }

  const user: SessionUser = {
    id: userinfo.sub,
    name: userinfo.name ?? null,
    username: userinfo.preferred_username ?? userinfo.nickname ?? null,
    avatarUrl: userinfo.picture ?? null,
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
    name: ROBLOX_STATE_COOKIE_NAME,
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}
