import { NextAuthOptions } from "next-auth";
import { credentialsProvider } from "./credentialProvider";

const callbacksProvider: NextAuthOptions['callbacks'] = {
    async jwt({ token, user }) {
        if (user) {
            token.isAdmin = user.isAdmin as boolean; // Explicitly cast it to boolean
        }
        return token;
    },

    async session({ session, token }) {
        session.user.isAdmin = token.isAdmin as boolean; // Explicitly cast it to boolean
        return session;
    },
};

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },// 30 days
    providers: [credentialsProvider],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: callbacksProvider,
};