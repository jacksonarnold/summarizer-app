import { Button } from "@nextui-org/button";
import React from "react";
import { signInWithGoogle, signOut } from "@/lib/firebase/auth";

export function SignIn() {
    function handleClick() {signInWithGoogle().then(r => console.log('sign in'));}

    return (
        <Button type="submit" color="primary" variant="flat" onClick={handleClick}
        >
            Sign In
        </Button>
    );
}

export function SignOut() {

    function handleClick() {
        signOut().then(r => console.log('sign out'));
    }

    return (
        <Button
            type="submit"
            color="default"
            variant="ghost"
            className="border-0 shadow-none"
            onClick={handleClick}
        >
            Sign out
        </Button>
    );
}
