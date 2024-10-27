import { cookies } from "next/headers";

export default async function set(key, value) {
    const cookie = await cookies();
    cookie.set(key, value);
}