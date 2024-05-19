import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [GitHub, Google],
    callbacks:
        {
            async jwt({ token, account }) {
                // Persist the OAuth access_token and or the user id to the token right after sign in
                if (account) {
                    token.accessToken = account.access_token
                }
                return token
            }
        }
});
