"use client"
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import { useState } from "react";

export default function PlaceOrderBtn({ product, price }: { product: string, price: string }) {

    const [loading, setLoading] = useState(false)

    const handlePayment = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    price,
                    product,
                    successUrl: `${window.location.origin}/process-order`,
                    cancelUrl: `${window.location.origin}/cancel`
                })
            })


            const data = await res.json()

            console.log(data);

            if (data.url) {
                window.location.href = data.url
            } else {
                console.log("Failed to create session", data);

            }
            setLoading(false)

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div>
            {
                loading ? (<Button isDisabled className="w-full" color="primary"><Spinner color="white" /></Button>) : (<Button
                    onPress={handlePayment}
                    className="w-full" color="primary">
                    Buy
                </Button>)
            }
        </div>
    )
}