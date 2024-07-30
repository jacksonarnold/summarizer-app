"use client";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";
import { RemoteRunnable } from "@langchain/core/runnables/remote";
import { IterableReadableStream } from "@/node_modules/@langchain/core/dist/utils/stream";
import { AIMessageChunk } from "@langchain/core/messages";
import { FileIcon, UploadIcon, XIcon } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";

export function FileUpload() {
    const [document, setDocument] = useState<File | null>(null)
    const [summary, setSummary] = useState<string[]>([])
    const [isLoadingSummary, setIsLoadingSummary] = useState(false)
    const [isLoadingStream, setIsLoadingStream] = useState(false)


    function convertPdfToBase64() {
        return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
            if (document == null) {
                reject('No file uploaded');
                return;
            }

            // Using FileReader to convert the uploaded file to base64
            const reader = new FileReader();

            reader.readAsDataURL(document);

            reader.onloadend = function () {
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

    function setDocumentUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;
        console.log(e.target.files);

        const file = e.target.files[0];

        setDocument(file);
    }

    async function tellJoke() {

        let chain = new RemoteRunnable({
            url: `http://localhost:8000/tell-joke/`
        })

        let input = {
            "topic": "Football"
        };

        const response: any = await chain.invoke(input);
        setSummary([response]);
        setIsLoadingSummary(false);
    }

    async function generateSummary() {
        setIsLoadingSummary(true);
        let fileData = await convertPdfToBase64();
        setSummary([]);

        const chain = new RemoteRunnable({
            url: `http://localhost:8000/pdf_qa/`,
        });

        let input = {
            "pdf_source": fileData,
            "query": "What are the main skills listed in the provided resume?"
        }

        const response: any = await chain.invoke(input);
        setSummary([response.content]);
        setIsLoadingSummary(false);
    }


    async function streamSummary() {
        setIsLoadingStream(true);
        let fileData = await convertPdfToBase64();
        setSummary([]);

        const chain = new RemoteRunnable({
            url: `http://localhost:8000/pdf_qa/`,
        });

        let input = {
            "pdf_source": fileData,
            "query": "Where did this candidate work last (location and company) according to the provided resume?"
        }

        const logStream: IterableReadableStream<AIMessageChunk>
            = await chain.stream(input) as IterableReadableStream<AIMessageChunk>;

        for await (const chunk of logStream) {
            try {
                setSummary((prev) => [...prev, chunk.content.toString()]);
            }
            catch (e: any) {
                console.warn('Stream Error: ', e);
            }
        }

        setIsLoadingStream(false);
    }


    return (
        <div className="flex flex-col items-center justify-center bg-background">
            <div className="w-full max-w-2xl p-6 bg-card rounded-lg shadow-lg">
                <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-bold mb-4 text-center">
                        Summarize PDF
                    </h1>
                    <LogoutButton />
                </div>

                <div className="mb-6">
                    <label htmlFor="document" className="block mb-2 text-muted-foreground">
                        Upload a document:
                    </label>
                    <div className="flex items-center justify-center w-full">
                        {document ? (
                            <div
                                className="flex items-center justify-between w-full bg-muted/20 rounded-lg p-4">
                                <div className="flex items-center gap-4">
                                    <FileIcon className="w-6 h-6 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium text-muted-foreground">{document.name}</p>
                                        <p className="text-xs text-muted-foreground">{(document.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    onClick={() => setDocument(null)}
                                    className="text-muted-foreground hover:bg-muted/30"
                                >
                                    <XIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        ) : (
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/20 hover:bg-muted/30"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadIcon className="w-10 h-10 mb-3 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground">
                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">PDF (max. 10MB)</p>
                                </div>
                                <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                    onChange={setDocumentUpload}
                                />
                            </label>
                        )}
                    </div>
                </div>
                <div className="flex justify-between mb-6">
                    <Button
                        onClick={generateSummary}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-1 focus:ring-primary"
                        disabled={!document}
                    >
                        {isLoadingSummary ? <div className="w-5 h-5 text-primary-foreground" /> : "Generate Summary"}
                    </Button>
                    <Button
                        onClick={streamSummary}
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 focus:ring-1 focus:ring-secondary"
                        disabled={!document}
                    >
                        {isLoadingStream ? <div className="w-5 h-5 text-primary-foreground" /> : "Stream Summary"}
                    </Button>
                </div>
                {summary.length > 0 && (
                    <div className="bg-muted rounded-md p-4 text-muted-foreground">
                        <h2 className="text-lg font-bold mb-2">Summary:</h2>
                        <div className="prose">{summary}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
