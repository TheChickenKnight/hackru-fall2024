'use client'

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

 
const formSchema = z.object({
    username: z.string()
        .min(2, {message:"Username must be at least 2 characters."})
        .max(15, {message:"Username cannot be longer than 15 characters."}),
    password: z.string()
        .min(8, {message:"Password must be at least 8 characters."})
        .max(20, {message:"Passwords cannot be longer than 20 characters."})
        .regex(/^(?=.*[0-9]).*$/, {message:"Password must include at least one number."})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/, {message:"Password must include one uppercase, lowercase, and special character."}) 
})

export default function SignIn() {
    const toast = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "username",
            password: "password"
        }
    });
    async function onSubmit(values) {
       
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign in</CardTitle>
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
                                        <Input placeholder="username" {...field} />
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
                                        <Input type="password" placeholder="password" {...field} />
                                    </FormControl>
                                    <FormDescription>Password goes here</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}