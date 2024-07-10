"use server";
import React from "react";
import {Input} from "@nextui-org/react";

export default async function Page() {

    return (
        <section>
            <h1 className="text-3xl font-bold mb-4 text-center">
                Waitlist
            </h1>
            <div>
                <Input type="email" label="Email" className="mb-2" size="lg"/>
                <Input type="text" label="First Name" className="mb-2 max-w-lg"/>
                <Input type="text" label="Last Name" className="mb-2 max-w-lg"/>
            </div>
        </section>
    );
}
