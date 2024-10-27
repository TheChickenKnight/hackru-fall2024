'use client'

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
 
const formSchema = z.object({
    username: z.string()
        .min(2, {message:"Username must be at least 2 characters."})
        .max(16, {message:"Username cannot be longer than 16 characters."}),
    password: z.string()
        .min(8, {message:"Password must be at least 8 characters."})
        .max(20, {message:"Passwords cannot be longer than 20 characters."})
        .regex(/^(?=.*[0-9]).*$/, {message:"Password must include at least one number."})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, {message:"Password must include one uppercase, lowercase, and special character."}) 
})

export default function SignUp() {
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "username",
            password: "password"
        }
    });
    async function onSubmit(values) {
        let res = await (await fetch("/api/sign/up?username=" + encodeURIComponent(values.username) + "&password=" + encodeURIComponent(values.password))).text();
        alert(res);
        res = JSON.parse(res);
        switch(res.code) {
             case 200:
                 toast({title: "Sign in failed", variant: "destructive", description: "Someone with the username " + values.username + " already exists", action: <ToastAction altText="sign in" onClick={()=>{router.push("/signin")}}>Sign in?</ToastAction>})
             break;
             case 100:
                 toast({title: "Signed in!", description: "Signed in as " + values.username + "!"});
             break;
             case 500:
                 toast({title: "INTERNAL SERVER ERROR", variant: "destructive"});
             break;
        }
     }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>description</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Username goes here</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        >
                        </FormField>
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormDescription>Password goes here</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Sign up</Button>
                        <Button onClick={()=>{router.push('/signin')}} className='ml-8'>Sign in instead</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}