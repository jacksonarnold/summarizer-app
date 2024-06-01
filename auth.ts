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
            jwt({ token, trigger, session, account }) {
                if (trigger === "update") token.name = session.user.name
                if (account?.provider === "keycloak") {
                    return { ...token, accessToken: account.access_token }
                }

                console.log('Token: ', token);
                return token
            },
            async session({ session, token }) {
                if (token?.accessToken) {
                    session.accessToken = token.accessToken as string;
                }
                return session
            },
        }
});

declare module "next-auth" {
    interface Session {
        accessToken?: string
    }
}

declare module "@auth/core" {
    interface JWT {
        accessToken?: string
    }
}