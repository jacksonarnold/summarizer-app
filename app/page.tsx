"use server";
import { auth } from "@/auth";
import React from "react";
import { FileUpload } from "@/components/file-upload";
import { getUser } from "@/lib/mongo";

export default async function Page() {
    let session = await auth();
    let userEmail = session?.user?.email ?? "";

    let user = await getUser(userEmail);

    return (
        user ? <FileUpload/> :
            <div>This product is still in testing.
                Add your name to the waitlist through the waitlist screen above
            </div>
    );
}
