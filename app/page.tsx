import {auth, signIn, signOut} from "@/auth";
import React from "react";
import {Button} from "@nextui-org/react";

function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google");
            }}
        >
            <p>You are not logged in</p>
            <Button className="mt-10 bg-blue-500" type="submit">Sign in with Google</Button>
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
            <Button className="mt-10" type="submit">Sign out</Button>
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
