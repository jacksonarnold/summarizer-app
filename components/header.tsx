import React from "react";
import {auth} from "@/auth";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, User} from "@nextui-org/react";
import {AcmeLogo} from "./ui/AcmeLogo"
import {SignIn, SignOut} from "@/components/auth-components";

export default async function Header() {
    let session = await auth();
    let userEmail = session?.user?.email;
    const profileImageUrl = session?.user?.image;

    const isActiveItem = false;

    return (
        <Navbar>
            <NavbarBrand>
                <AcmeLogo/>
                <p className="font-bold text-inherit">ASSISTANT</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                <NavbarItem isActive={true}>
                    <Link color="foreground" href="/waitlist">
                        Waitlist
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={false}>
                    <Link href="/" aria-current="page">
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
                {userEmail ?
                    <NavbarItem>
                        <User
                            name={session?.user?.name}
                            description="Account"
                            avatarProps={{
                                src: profileImageUrl ? profileImageUrl : undefined,
                            }}
                        />
                    </NavbarItem>
                    : <div></div>
                }
                <NavbarItem>
                    {userEmail ? <SignOut/> : <SignIn/>}
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
