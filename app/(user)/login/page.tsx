import { loginSchema } from "@/interface/form";
import { useZodForm } from "@/lib/use-zod-form";
import { z } from "zod";

export function useLoginForm() {
    const { register, handleSubmit, formState: { errors }, } = useZodForm(loginSchema, { defaultValues: { email: "", password: "" } });
    return (
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
