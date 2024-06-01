"use server";
import { auth } from "@/auth";
import React from "react";
import { FileUpload } from "@/components/file-upload";
import { getUser } from "@/lib/mongo";

export default async function Page() {
    let session = await auth();
    let userEmail = session?.user?.email ?? "";
    let accessToken = session?.accessToken;

    // add this below
    let response = await fetch("http://localhost:8000/api/protected", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    let data = await response.json();

    let user = await getUser(userEmail);

    return (
        <section>
            <h1 className="text-3xl font-bold mb-10 text-center">
                Summarize Document
            </h1>
            <div>{user ? <FileUpload /> : <div>No user found.</div>}</div>
        </section>
    );
}
