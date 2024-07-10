import {signIn, signOut} from "@/auth";
import {Button} from "@nextui-org/button";
import React from "react";

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                await signIn("google", {callbackUrl: "/hello"});
            }}
        >
            <Button type="submit" color="primary" variant="flat">Sign In</Button>
        </form>
    );
}

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server";
                await signOut();
            }}
        >
            <Button type="submit" color="default" variant="ghost" className="border-0 shadow-none">Sign out</Button>
        </form>
    );
}
