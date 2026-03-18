import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { ROBLOX_STATE_COOKIE_NAME, getRobloxConfig } from "@/lib/roblox-oauth";

export async function GET() {
  let config;
  try {
    config = getRobloxConfig();
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
  const authorizeUrl = new URL("https://apis.roblox.com/oauth/v1/authorize");
  authorizeUrl.searchParams.set("client_id", config.clientId);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", "openid profile");
  authorizeUrl.searchParams.set("redirect_uri", config.redirectUri);
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set({
    name: ROBLOX_STATE_COOKIE_NAME,
    value: state,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 10,
  });

  return response;
}
