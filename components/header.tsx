import React from "react";
import {auth} from "@/auth";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, User} from "@nextui-org/react";
import {AcmeLogo} from "./ui/AcmeLogo"
import {SignIn, SignOut} from "@/components/auth-components";

export default async function Header() {
    let session = await auth();
    let userEmail = session?.user?.email;
    const profileImageUrl = session?.user?.image;

    return (
        <Navbar>
            <NavbarBrand>
                <AcmeLogo/>
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
                {/*<NavbarItem className="hidden lg:flex">*/}
                {/*    <Link href="#">Login</Link>*/}
                {/*</NavbarItem>*/}
                {/*<NavbarItem>*/}
                {/*    <Button as={Link} color="primary" href="#" variant="flat">*/}
                {/*        Sign Up*/}
                {/*    </Button>*/}
                {/*</NavbarItem>*/}
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
