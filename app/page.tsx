import { cookies } from "next/headers";
import MainPage from "@/MainPage";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth-session";

export default async function Home() {
  const sessionSecret = process.env.AUTH_SESSION_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session =
    sessionSecret && token ? verifySessionToken(token, sessionSecret) : null;

  return <MainPage user={session?.user ?? null} />;
}
