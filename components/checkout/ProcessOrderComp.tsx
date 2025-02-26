"use client"
import { Button } from "@heroui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"

export default function ProcessOrderComp() {

    const router = useRouter()

    const handleRedirect = () => {
        router.push("/profile/enrollments")
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-xl p-10 max-w-md w-full"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 10 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                >
                    <CheckCircle className="w-12 h-12 text-green-500" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-center text-gray-800 mb-4"
                >
                    Payment Successful!
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center text-gray-600 mb-8"
                >
                    Thank you for your purchase. Your order has been processed successfully.
                </motion.p>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex justify-center">
                    <Button className="w-full" color="primary"onPress={handleRedirect}>Go to profile <ArrowRight size={20}/></Button>
                </motion.div>
            </motion.div>
        </div>
    )
}