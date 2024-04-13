"use server";
import {Button} from "@nextui-org/button";
import React from "react";

export async function FileUpload() {
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        console.log(e.target.files);
    }

    function handleClick() {
        console.log("clicked");
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-center space-y-2 mb-4">
                <p className="text-gray-500 md:mx-auto dark:text-gray-400">
                    Upload a file to generate a summary of its contents.
                </p>
            </div>
            <div className="flex items-center justify-center mt-2 ml-5">
                <input type="file" id="file" />
            </div>
            <Button className="mt-10" color="primary" >
                Generate Summary
            </Button>
        </div>
    );
}
