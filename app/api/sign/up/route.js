import { MongoClient } from "mongodb";
import { cookies } from "next/headers";

export async function GET(request) {
    const client = new MongoClient(process.env.MONGO);
    const username = request.nextUrl.searchParams.get('username');
    const password = request.nextUrl.searchParams.get('password');
    let rec = {};

    try {
        await client.connect();
        const db = client.db("Alzaid");
        const users = db.collection("users");
        rec = await users.findOne({ username });

        if (!rec) {
            await users.insertOne({ username, password });
            rec = { code: 100, message: "User created successfully" };
            cookies().set("username", username);
        } else {
            rec = { code: 200, message: "Username already exists" };
        }
    } catch (error) {
        rec = { code: 500, message: "Internal Server Error" };
    } finally {
        await client.close();
    }

    return new Response(JSON.stringify(rec), {
        headers: { 'Content-Type': 'application/json' }
    });
}