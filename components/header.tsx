"use client";
import React, { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    User,
} from "@nextui-org/react";
import { AcmeLogo } from "./ui/AcmeLogo";
import { SignIn, SignOut } from "@/components/auth-components";
import { useRouter } from "next/navigation";
import { firebaseConfig } from "@/lib/firebase/config";
import { onAuthStateChanged } from "@/lib/firebase/auth";

function useUserSession(initialUser: any) {
    // The initialUser comes from the server via a server component
    const [user, setUser] = useState(initialUser);
    const router = useRouter();

    // Register the service worker that sends auth state back to server
    // The service worker is built with npm run build-service-worker
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            const serializedFirebaseConfig = encodeURIComponent(
                JSON.stringify(firebaseConfig)
            );
            const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;

            navigator.serviceWorker
                .register(serviceWorkerUrl)
                .then((registration) =>
                    console.log("scope is: ", registration.scope)
                );
        }
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged((authUser: any) => {
            setUser(authUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        onAuthStateChanged((authUser: any) => {
            if (user === undefined) return;

            // refresh when user changed to ease testing
            if (user?.email !== authUser?.email) {
                router.refresh();
            }
        });
    }, [user]);

    return user;
}

export default function Header(initialUser: any) {
    const user = useUserSession(initialUser);

    return (
        <Navbar>
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">ASSISTANT</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Docs
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Summarize
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                {user ? (
                    <NavbarItem>
                        <User
                            name={user.displayName}
                            description="Account"
                            avatarProps={{
                                src: user.photoURL ? user.photoURL : undefined,
                            }}
                        />
                    </NavbarItem>
                ) : (
                    <div></div>
                )}
                <NavbarItem>
                    {user?.email ? <SignOut /> : <SignIn />}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
