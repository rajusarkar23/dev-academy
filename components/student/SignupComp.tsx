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
    name: string,
    password: string
}

export default function SignupComp() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const onsubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setError(false)
            setLoading(true)
            const res = await fetch("/api/student/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const response = await res.json();

            if (response.success === true) {
                setLoading(false)
                router.push("/auth/verify-otp")
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
        <div className="flex flex-col min-h-screen   justify-center items-center bg-blue-900/90">
            <form className="w-full flex flex-col items-center justify-center max-w-sm mx-auto space-y-4 bg-white/80 shadow-2xl rounded-lg h-[450px]" onSubmit={handleSubmit(onsubmit)}>
                <div>
                    <h2 className="text-center font-bold text-4xl text-black">Signup</h2>
                    <p className="font-bold text-gray-400 text-sm">Welcome, please signup first.</p>
                </div>
                <div className="w-full space-y-4 px-4">
                <div>
                        <Input label="Name" type="text" {...register("name", { required: "Enter your name." })} aria-invalid={errors.email ? "true" : "false"} />
                        {errors.name && <p role="alert" className="text-xs text-red-500 ml-1">{errors.name.message}</p>}
                    </div>
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
                        <p className="text-center font-semibold text-gray-600">Already have account? <Link href={"/auth/signin"} className="text-blue-600 underline">Signin</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}