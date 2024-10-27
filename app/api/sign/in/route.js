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
            rec = { code: 200, message: "Username does not match our records" };
        } else if (rec.password !== password) {
            rec = { code: 250, message: "Password was wrong or typed incorrectly" };
        } else {
            rec = { code: 100, message: "Signed in successfully" };
            cookies().set("username", username);
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