export const DISCORD_STATE_COOKIE_NAME = "bloxbolt_discord_state";

export interface DiscordConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  sessionSecret: string;
}

export function getDiscordConfig(): DiscordConfig {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;
  const sessionSecret = process.env.AUTH_SESSION_SECRET;

  if (!clientId || !clientSecret || !redirectUri || !sessionSecret) {
    throw new Error(
      "Missing OAuth env vars. Required: DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI, AUTH_SESSION_SECRET",
    );
  }

  let parsedRedirectUri: URL;
  try {
    parsedRedirectUri = new URL(redirectUri);
  } catch {
    throw new Error(
      "DISCORD_REDIRECT_URI must be a full URL (for example: https://example.com/api/auth/discord/callback)",
    );
  }

  return {
    clientId,
    clientSecret,
    redirectUri: parsedRedirectUri.toString(),
    sessionSecret,
  };
}
