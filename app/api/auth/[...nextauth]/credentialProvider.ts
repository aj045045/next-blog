import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const credentialsProvider = CredentialsProvider({
    name: "Credentials",
    credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
        }

        //NOTE Check if the user exists
        const user = await prisma.user.findUnique({
            where: { email: credentials.email },
        });
        if (user) {
            const isValidUser = await bcrypt.compare(credentials.password, user.password);
            if (!isValidUser) {
                throw new Error("Invalid password for user");
            }
            return {
                id: user.id.toString(),
                name: user.username,
                email: user.email,
                isAdmin: false,
                image: user.image,
            };
        }

        //NOTE Check if admin exists    
        const admin = await prisma.admin.findUnique({
            where: { email: credentials.email },
        })

        if (admin) {
            const isValidAdmin = await bcrypt.compare(credentials.password, admin.password);
            if (!isValidAdmin) {
                throw new Error("Invalid password for admin");
            }

            return {
                id: admin.id.toString(),
                name: admin.username,
                email: admin.email,
                isAdmin: true,
            };
        }
        throw new Error("No user found with this email");
    }
});