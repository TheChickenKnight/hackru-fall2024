'use server'

import { cookies } from "next/headers"

export default async function Get(key) {
    return (await cookies()).get(key);
}