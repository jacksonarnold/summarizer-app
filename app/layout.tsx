import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "./providers";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Summarizer",
    description: "Summarizer app for local documents",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
        <body className={inter.className}>
        <Providers>
            <main className="flex flex-col items-center justify-center min-h-screen py-12 space-y-2 px-4">
                {children}
            </main>
        </Providers>
        </body>
        </html>
    );
}
