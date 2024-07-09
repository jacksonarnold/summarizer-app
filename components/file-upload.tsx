"use client";
import {Button} from "@nextui-org/button";
import React, {useRef, useState} from "react";
import {RemoteRunnable} from "@langchain/core/runnables/remote";
import {IterableReadableStream} from "@/node_modules/@langchain/core/dist/utils/stream";
import {AIMessageChunk} from "@langchain/core/messages";

export function FileUpload() {
    const [data, setData] = useState<string[]>([]);
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>("");

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;
        console.log(e.target.files);

        const file = e.target.files[0];
        setFileName(file.name);
    }

    function handleClick() {
        if (hiddenFileInput && hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    }

    function convertPdfToBase64() {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            if (!hiddenFileInput.current || !hiddenFileInput.current.files
                || hiddenFileInput.current.files.length == 0) {
                reject('No file uploaded');
                return;
            }

            const uploadedFile: File = hiddenFileInput.current.files[0];

            // Using FileReader to convert the uploaded file to base64
            const reader = new FileReader();

            reader.readAsDataURL(uploadedFile);

            reader.onloadend = function() {
                if (reader.result) {
                    let base64String: string = reader.result.toString();
                    // Split the string and pick up the base64 data part
                    let encodedFile = base64String.split(',')[1];
                    resolve(encodedFile);
                }
                else {
                    reject('Error while reading file');
                }
            }
        });
    }

    async function uploadFile() {
        let fileData = await convertPdfToBase64();
        setData([]);

        const chain = new RemoteRunnable({
            url: `http://localhost:8000/retrieval_agent/`,
        });

        let input = {
            "pdf_source": fileData,
            "query": "What people are mentioned in the provided documents?"
        }

        const response: any = await chain.invoke(input);
        setData([response.answer]);
    }


    async function generateStream() {
        let fileData = await convertPdfToBase64();
        setData([]);

        const chain = new RemoteRunnable({
            url: `http://localhost:8000/pdf_qa/`,
        });

        let input = {
            "pdf_source": fileData,
            "query": "What people are mentioned in the provided documents?"
        }

        const logStream: IterableReadableStream<AIMessageChunk>
            = await chain.stream(input) as IterableReadableStream<AIMessageChunk>;

        for await (const chunk of logStream) {
            try {
                setData((prev) => [...prev, chunk.content.toString()]);
            }
            catch (e: any) {
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
            <div className="mt-10">
                <input className="hidden"
                       id="file_input" type="file"
                       ref={hiddenFileInput}
                       onChange={handleFileChange}
                />
                <div className="my-2">
                    <label>{fileName}</label>
                </div>
                <Button onClick={handleClick}>Upload File</Button>
            </div>
            <div>
                <Button onClick={uploadFile} className="mt-10" color="primary">
                    Generate Summary
                </Button>
            </div>
            <div>
                <Button onClick={generateStream} className="mt-10" color="secondary">
                    Generate Stream
                </Button>
            </div>
            <div className="mt-5 w-1/2 mx-auto">
                <p>{data.join('')}</p>
            </div>
        </div>
    );
}
