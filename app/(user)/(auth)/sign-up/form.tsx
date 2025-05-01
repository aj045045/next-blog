"use client"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import Link from "next/link"
import { pageLinks } from "@/constant/page-links"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useState } from "react"
import { UtilityHandler } from "@/lib/form-handler"
import { OTPGeneratorUtil } from "@/lib/otp-generator"
import { OTPEmailProps } from "@/interface/email"
import { signUpFormSchema } from "@/interface/form"
import * as z from "zod"
import { User } from "lucide-react"
import { useZodForm } from "@/lib/use-zod-form"


export function SignUpForm() {
    const [sendOTP, setSendOTP] = useState(false);
    const form = useZodForm(signUpFormSchema, { defaultValues: { email: "", name: "", password: "", username: "", sendPin: "", pin: "" } });
    const showButton = form.watch("email")?.length > 12 ? false : true;

    const sendOTPButton = async () => {
        const email = form.watch("email").trim();
        if (!email) {
            toast.error("Please enter a valid email address.");
            return;
        }
        const sendPin = OTPGeneratorUtil();
        form.setValue("sendPin", sendPin);
        setSendOTP(true);
        const payload: OTPEmailProps = { name: form.getValues("name"), emailId: email, code: sendPin, task: "Sign Up" };
        UtilityHandler.onSubmitPost('/api/emails/otp', payload, `An OTP is being sent to ${email}. Please check your email.`, 'Please check your email for the OTP and enter it to proceed');
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((payload) =>
                UtilityHandler.onSubmitPost('/api/auth', payload, `Handling Sign-Up Form Submission`, 'You have successfully sign up try to login now'))}
                className="row-span-2 py-10 mx-auto space-y-8 text-green-950">
                <div>
                    <div className="font-sans text-3xl">Sign Up</div>
                    <div className="flex items-center text-sm text-neutral-600">
                        <span>Already have an account? </span>
                        <Link href={pageLinks.login}>
                            <Button variant={"link"}>Login</Button>
                        </Link>
                    </div>
                </div>
                {/* NOTE Username */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Username <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        <User className="h-4 w-4" />
                                    </span>
                                    <Input
                                        placeholder="John Wick"
                                        required
                                        type="text"
                                        className="pl-10" // Add padding to the left for the icon
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormDescription>Enter your user name</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* NOTE Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email Address<span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <Input
                                    required
                                    placeholder="user@example.com"
                                    type="email"
                                    {...field} />
                            </FormControl>
                            <FormDescription>Enter your email-id</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* NOTE Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password<span className="text-red-500">*</span></FormLabel>
                            <FormControl>
                                <PasswordInput required placeholder="U$er123" {...field} />
                            </FormControl>
                            <FormDescription>Enter your password.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {
                    sendOTP ?
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>One-Time Password<span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                        <InputOTP maxLength={7} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                                <InputOTPSlot index={4} />
                                                <InputOTPSlot index={5} />
                                                <InputOTPSlot index={6} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription>
                                        Please enter the one-time password sent to your email.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        :
                        <div className="space-y-2">
                            <Button disabled={showButton} onClick={sendOTPButton}>Send OTP</Button>
                            <div className="text-sm text-neutral-600">
                                Please enter your email address to receive the one-time password.
                            </div>
                        </div>
                }
                {sendOTP && <Button type="submit">Submit</Button>}
            </form>
        </Form >
    )
}
