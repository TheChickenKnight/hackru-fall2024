// getServerSideCookies.js
import { cookies } from "next/headers";

export async function getServerSideCookies() {
  const cookieStore = await cookies();
  const usernameCookie = cookieStore.get("username");
  return {
    username: usernameCookie ? usernameCookie.value : null,
  };
}