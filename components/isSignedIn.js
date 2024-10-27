"use server"

import { cookies } from "next/headers"

export default async function isSignedIn() {
    const cookie = await cookies();
    if (!cookie.has("username"))
        return;
    return cookie.get("username").value;
}