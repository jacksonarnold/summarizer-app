"use server";
import React from "react";
import { FileUpload } from "@/components/file-upload";
import { getUser } from "@/lib/mongo";
import {initializeApp} from "firebase/app";
import {getAuth, getIdToken} from "firebase/auth";
import {firebaseConfig} from "@/lib/firebase/config";

export default async function Page() {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    await auth.authStateReady();

    if (auth.currentUser) {
        let authToken = await getIdToken(auth.currentUser);

        // add this below
        const headers = new Headers();
        headers.append("Authorization", "Bearer " + authToken);
        let response = await fetch("http://localhost:8000/test", {
                headers: headers
            }
        );

        let data = await response.json();
    }

    // let user = await getUser("");
    let user = "";
    return (
        <section>
            <h1 className="text-3xl font-bold mb-10 text-center">
                Summarize Document
            </h1>
            <div>{user ? <FileUpload /> : <div>No user found.</div>}</div>
        </section>
    );
}
