import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import remove from "./remove";
import { cookies } from "next/headers";

export default async function SignOut() {
    const cookie = await cookies();
    if (cookie.has("username"))
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Sign Out</CardTitle>
                    <CardDescription>Are you sure?</CardDescription>
                    <CardContent>
                        <Button onClick={remove}>Sign Out</Button>
                    </CardContent>
                </CardHeader>
            </Card>
        );
}