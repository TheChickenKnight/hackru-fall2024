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
            rec = {
                code: 200
            };
        } else if (rec.password != password) {
            rec.code = 250;
        } else {
            rec.code = 100;
            (await cookies()).set("username", username);
        }
    } catch {
        rec = {
            code: 500
        };
    } finally {
        await client.close();
    }

    return new Response(JSON.stringify(rec), {
        headers: { 'Content-Type': 'application/json' }
    });
}