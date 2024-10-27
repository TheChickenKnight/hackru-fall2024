"use server"

import { cookies } from "next/headers"

export default async function remove() {
    const cookie = await cookies();
    cookie.delete("username");
}