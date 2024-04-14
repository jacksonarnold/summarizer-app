"use client";
import {Button} from "@nextui-org/button";
import React, {useRef} from "react";

export async function FileUpload() {
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        console.log(e.target.files);
    }

    function handleClick() {
        if (hiddenFileInput && hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    }

    return (
        <div className="flex-col items-center justify-center text-center">
            <div className=" space-y-2 mb-4">
                <span className="text-gray-500 md:mx-auto dark:text-gray-400">
                    Upload a file to generate a summary of its contents.
                </span>
            </div>
            <div className="mt-2">
                <input style={{display: 'none'}}
                       id="file_input" type="file"
                       ref={hiddenFileInput}
                />
                <Button onClick={handleClick}>Upload File</Button>
            </div>
            <Button className="mt-10" color="primary">
                Generate Summary
            </Button>
        </div>
    );
}
