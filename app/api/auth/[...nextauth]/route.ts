import type { Session } from "next-auth";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_ID ?? "",
            clientSecret: process.env.DISCORD_SECRET ?? "",
        }),
    ],
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async session({ session }: { session: Session }) {
            delete session.user;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };