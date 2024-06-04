import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/header";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Summarizer",
    description: "Summarizer app for local documents",
};

export default async function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { currentUser } = await getAuthenticatedAppForUser();

    return (
        <html lang="en" className="dark">
            <body className={inter.className}>
                <Header initialUser={currentUser?.toJSON()} />
                <main className="flex flex-col items-center justify-center min-h-screen py-12 space-y-2 px-4">
                    {children}
                </main>
            </body>
        </html>
    );
}
