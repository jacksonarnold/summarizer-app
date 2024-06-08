"use client";
import {Button} from "@nextui-org/button";
import React, {useRef, useState} from "react";
import {RemoteRunnable} from "@langchain/core/runnables/remote";
import {IterableReadableStream} from "@/node_modules/@langchain/core/dist/utils/stream";

export function FileUpload() {
    const [data, setData] = useState<string[]>([]);
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

    async function streamResponse() {
        setData([]);
        const chain = new RemoteRunnable({
            url: `http://localhost:8000/test-chain/`,
        });

        const logStream: IterableReadableStream<any> = await chain.stream({
            "topic": "football"
        });

        for await (const chunk of logStream) {
            try {
                setData((prev) => [...prev, chunk]);
            } catch (e: any) {
                console.warn('Stream Error: ', e);
            }
        }
    }


    return (
        <div className="flex-col items-center justify-center text-center">
            <div className="space-y-2 mb-4">
                <span className="text-gray-500 md:mx-auto dark:text-gray-400">
                    Upload a file to generate a summary of its contents.
                </span>
            </div>
            <div className="mt-2">
                <input className="hidden"
                       id="file_input" type="file"
                       ref={hiddenFileInput}
                />
                <Button onClick={handleClick}>Upload File</Button>
            </div>
            <Button onClick={streamResponse} className="mt-10" color="primary">
                Generate Summary
            </Button>
            <div className="mt-5 w-1/2 mx-auto">
                <p>{data.join('')}</p>
            </div>
        </div>
    );
}
