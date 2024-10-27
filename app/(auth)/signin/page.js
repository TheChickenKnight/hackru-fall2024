'use client'

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
 
const formSchema = z.object({
    username: z.string()
        .min(2, { message: "Username must be at least 2 characters." })
        .max(16, { message: "Username cannot be longer than 16 characters." }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters." })
        .max(20, { message: "Passwords cannot be longer than 20 characters." })
        .regex(/^(?=.*[0-9]).*$/, { message: "Password must include at least one number." })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, { message: "Password must include one uppercase, lowercase, and special character." })
});

export default function SignIn() {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        }
    });

    async function onSubmit(values) {
        try {
            const response = await fetch(`/api/sign/in?username=${encodeURIComponent(values.username)}&password=${encodeURIComponent(values.password)}`);
            const result = await response.json();

            switch (result.code) {
                case 200:
                    toast({ title: "Incorrect details :(", variant: "destructive", description: `The username ${values.username} does not match our records` });
                    break;
                case 250:
                    toast({ title: "Incorrect password :(", variant: "destructive", description: "Password was wrong or typed incorrectly" });
                    break;
                case 100:
                    toast({ title: "Signed in successfully :)", description: `Welcome back, ${values.username}!` });
                    break;
                default:
                    toast({ title: "Error", variant: "destructive", description: "An unexpected error occurred. Please try again." });
                    break;
            }
        } catch {
            toast({ title: "Error", variant: "destructive", description: "An error occurred while signing in. Please try again." });
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to sign in</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-4">Submit</Button>
                        <Button onClick={()=>{router.push('/signup')}} className='ml-8'>Sign up instead</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}