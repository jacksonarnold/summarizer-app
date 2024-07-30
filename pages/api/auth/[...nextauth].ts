import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID ?? '',
            clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
});
