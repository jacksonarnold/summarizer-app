import {auth, signIn, signOut} from "@/auth";
import React from "react";
import { Button } from "@nextui-org/button";

function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google", { callbackUrl: "/middleware-example" });
            }}
        >
            <p>You are not logged in</p>
            <Button className="mt-10" type="submit" color="primary">Sign in with Google</Button>
        </form>
    );
}

function SignOut({children}: { children: React.ReactNode }) {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <p>{children}</p>
            <Button className="mt-10" type="submit" color="primary">Sign out</Button>
        </form>
    );
}

export default async function Page() {
    let session = await auth();
    let user = session?.user?.email;

    return (
        <section>
            <h1>Home</h1>
            <div>
                {user ? <SignOut>{`Welcome ${user}`}</SignOut> : <SignIn/>}
            </div>
        </section>
    );
}
