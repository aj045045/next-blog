import { z } from "zod";

/* This code snippet is defining a schema using Zod, which is a TypeScript-first schema declaration and
validation library. */
export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});