import {auth} from "@/auth";
import React from "react";
import {FileUpload} from "@/components/file-upload";


export default async function Page() {
    let session = await auth();
    let user = session?.user?.email;

    return (
        <section>
            <h1 className="text-3xl font-bold mb-20">Summarize Document</h1>
            <div>
                {user ?
                    <FileUpload/> : <div></div>}
            </div>
        </section>
    );
}
