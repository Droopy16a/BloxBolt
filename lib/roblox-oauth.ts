export const ROBLOX_STATE_COOKIE_NAME = "bloxbolt_roblox_state";

export interface RobloxConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  sessionSecret: string;
}

export function getRobloxConfig(): RobloxConfig {
  const clientId = process.env.ROBLOX_CLIENT_ID;
  const clientSecret = process.env.ROBLOX_CLIENT_SECRET;
  const redirectUri = process.env.ROBLOX_REDIRECT_URI;
  const sessionSecret = process.env.AUTH_SESSION_SECRET;

  if (!clientId || !clientSecret || !redirectUri || !sessionSecret) {
    throw new Error(
      "Missing OAuth env vars. Required: ROBLOX_CLIENT_ID, ROBLOX_CLIENT_SECRET, ROBLOX_REDIRECT_URI, AUTH_SESSION_SECRET",
    );
  }

  let parsedRedirectUri: URL;
  try {
    parsedRedirectUri = new URL(redirectUri);
  } catch {
    throw new Error(
      "ROBLOX_REDIRECT_URI must be a full URL (for example: https://example.com/api/auth/roblox/callback)",
    );
  }

  return {
    clientId,
    clientSecret,
    redirectUri: parsedRedirectUri.toString(),
    sessionSecret,
  };
}
