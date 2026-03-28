import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { DISCORD_STATE_COOKIE_NAME, getDiscordConfig } from "@/lib/discord-oauth";

export async function GET() {
  let config;
  try {
    config = getDiscordConfig();
  } catch (error) {
    return NextResponse.json(
      {
        error: "server_config_error",
        message: error instanceof Error ? error.message : "Unknown config error",
      },
      { status: 500 },
    );
  }

  const state = randomBytes(16).toString("hex");
  const authorizeUrl = new URL("https://discord.com/oauth2/authorize");
  authorizeUrl.searchParams.set("client_id", config.clientId);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", "identify email");
  authorizeUrl.searchParams.set("redirect_uri", config.redirectUri);
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set({
    name: DISCORD_STATE_COOKIE_NAME,
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}
