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
        <section>
            <h1 className="text-3xl font-bold mb-4 text-center">
                Summarize Document
            </h1>
            <div>{user ? <FileUpload /> :
                <div>This product is still in testing.
                    Add your name to the waitlist through the waitlist screen above
                </div>}
            </div>
        </section>
    );
}
