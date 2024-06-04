"use server";
import React from "react";
import { FileUpload } from "@/components/file-upload";
import { getUser } from "@/lib/mongo";

export default async function Page() {
    // add this below
    // let response = await fetch("http://localhost:8000/test");
    // let data = await response.json();

    let user = await getUser("");

    return (
        <section>
            <h1 className="text-3xl font-bold mb-10 text-center">
                Summarize Document
            </h1>
            <div>{user ? <FileUpload /> : <div>No user found.</div>}</div>
        </section>
    );
}
