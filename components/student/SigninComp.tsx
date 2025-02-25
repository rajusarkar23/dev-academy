"use client"

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Spinner } from "@heroui/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    email: string,
    password: string
}


export default function SigninComp() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const onsubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setError(false)
            setLoading(true)
            const res = await fetch("/api/student/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const response = await res.json();

            if (response.success === true) {
                setLoading(false)
                router.push("/profile")
            } else {
                setLoading(false)
                setError(true)
                setErrorMessage(response.message)
            }

        } catch (error) {
            console.log(error);

        }
    }

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-blue-900/90">
            <form className="max-w-sm w-full h-96 mx-auto bg-white/80 shadow-2xl rounded-lg flex flex-col justify-center items-center space-y-4 px-4" onSubmit={handleSubmit(onsubmit)}>
                <div className="flex flex-col justify-center items-center">
                    <h2 className="text-4xl font-bold text-black">Signin</h2>
                    <p className="text-gray-400 font-bold">to access your account</p>
                </div>
                <div className="w-full space-y-4 px-4">
                    <div>
                        <Input label="Email" type="email" {...register("email", { required: "Enter your email id." })} aria-invalid={errors.email ? "true" : "false"} />
                        {errors.email && <p role="alert" className="text-xs text-red-500 ml-1">{errors.email.message}</p>}
                    </div>
                    <div>
                        <Input label="Password" type="password" {...register("password", { required: "Enter password, more than 6 character.", minLength: 6 })} aria-invalid={errors.password ? "true" : "false"} />
                        {errors.password && <p role="alert" className="text-xs text-red-500 ml-1">{errors.password.message}</p>}
                    </div>
                    <div className="flex flex-col justify-center">
                        {
                            loading ? (<Button isDisabled color="primary"><Spinner color="default" /></Button>) : (<Button type="submit" className="w-full font-bold" variant="solid" color="primary">Signup</Button>)
                        }
                        {error && <p className="text-center mt-2 text-red-500 font-bold">{errorMessage}</p>}
                    </div>
                    <div>
                        <p className="text-center font-semibold text-gray-600">Do not have account? <Link href={"/auth/signup"} className="text-blue-600 underline">Signup</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}