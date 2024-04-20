"use server";
import {auth} from "@/auth";
import React from "react";
import {FileUpload} from "@/components/file-upload";
import {getUsersCollection} from "@/lib/mongo";


export default async function Page() {
    let session = await auth();
    let user = session?.user?.email;

    let users = await getUsersCollection();
    console.log(users);

    return (
        <section>
            <h1 className="text-3xl font-bold mb-10 text-center">Summarize Document</h1>
            <div>
                {user ?
                    <FileUpload/> : <div></div>
                }
            </div>
        </section>
    );
}
