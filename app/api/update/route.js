import { MongoClient } from "mongodb";

export async function GET(request) {
    const client = new MongoClient(process.env.MONGO);
    const username = request.nextUrl.searchParams.get('username');
    const key = request.nextUrl.searchParams.get('key');
    const value = request.nextUrl.searchParams.get('value');
    let rec = {};

    try {
        await client.connect();
        const db = client.db("Alzaid");
        const users = db.collection("users");
        rec = await users.findOne({ username });

        if (!rec) {
            rec = {
                code: 200,
            };
        } else {
            rec.code = 200;
            await users.updateOne({
                username
            }, {
                [key]: value,
            });
        }
    } catch {
        rec = {
            code: 500,
        };    
    } finally {
        await client.close();
    }

    return new Response(JSON.stringify(rec), {
        headers: { 'Content-Type': 'application/json' }
    });
}