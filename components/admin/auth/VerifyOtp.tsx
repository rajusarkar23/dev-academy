"use client"
import { Button } from "@heroui/button";
import { InputOtp } from "@heroui/input-otp";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function VerifyOtpComp() {
    const [value, setValue] = useState("")
    const router = useRouter()

    const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const res = await fetch("/api/admin/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ otp: value })
            })

            const response = await res.json()

            if (response.success === true) {
                router.push("/admin/dashboard")
            } else {
                console.log(response);

            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-blue-900/90">
            <form className="w-full max-w-sm bg-white/80 shadow-lg flex flex-col justify-center items-center rounded-lg h-64 space-y-2" onSubmit={onsubmit}>
                <div>
                    <div className="space-y-2">
                        <h2 className="text-center text-3xl font-bold text-black">Verify OTP</h2>
                        <p className="text-sm text-gray-600 font-semibold">Enter the OTP you have received on your email.</p>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <InputOtp
                        isRequired
                        length={6}
                        errorMessage={"Enter your 6 charcter OTP."}
                        size="lg"
                        name="otp"
                        value={value}
                        onValueChange={setValue}
                        color="primary"
                    />
                </div>

                <div>
                    <Button color="primary" className="font-bold" type="submit">Verify</Button>
                </div>
            </form>
        </div>
    )
}