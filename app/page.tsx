"use server";
import { auth } from "@/auth";
import React from "react";
import { FileUpload } from "@/components/file-upload";
import { getUser } from "@/lib/mongo";
import { RemoteRunnable } from "@langchain/core/runnables/remote";

export default async function Page() {
    let session = await auth();
    let userEmail = session?.user?.email ?? "";

    const chain = new RemoteRunnable({
        url: `http://localhost:8000/openai/`,
    });

    const result = await chain.invoke({
        "text": "Your text here",
        "messages": ["Message 1", "Message 2"]
    });

    console.log('Results: ', result);

    // add this below
    let response = await fetch("http://localhost:8000/api/test");
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
