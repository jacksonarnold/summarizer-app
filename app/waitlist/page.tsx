"use client";
import React, {useState} from "react";
import {Input} from "@nextui-org/react";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {CircleCheckIcon} from "lucide-react";
import {Button} from "@nextui-org/button";

export default function Page() {
    const [showConfirmation, setShowConfirmation] = useState(false)
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setShowConfirmation(true)
    }

    return (
        <div className="flex items-center justify-center bg-background">
            {showConfirmation ? (
                <Card className="max-w-md w-full p-6 sm:p-8">
                    <CardHeader className="flex-col text-center">
                        <p className="pb-3 font-extrabold text-xl">Thanks for joining the waitlist!</p>
                        <p className="text-sm">We'll be in touch with you soon about our launch</p>
                    </CardHeader>
                    <CardBody>
                        <div className="flex items-center justify-center">
                            <CircleCheckIcon className="h-12 w-12 text-green-500"/>
                        </div>
                    </CardBody>
                </Card>
            ) : (
                <Card className="max-w-md w-full p-6 sm:p-8">
                    <CardHeader className="flex-col text-center">
                        <p className="pb-3 font-extrabold text-xl">Join the waitlist!</p>
                        <p className="text-sm">Enter your name and email to be the first to know when we launch.</p>
                    </CardHeader>
                    <CardBody className="space-y-4">
                    <form>
                        <Input id="name" label="Name"/>
                        <Input id="email" label="Email" type="email" className="mt-4"/>
                        <Button onClick={handleSubmit} type="submit" className="w-full mt-4">
                            Join waitlist
                        </Button>
                    </form>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}
