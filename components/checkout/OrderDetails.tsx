"use client"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import PlaceOrderBtn from "./PlaceOrderBtn";
import { CreditCard } from "lucide-react";

export default function OrderDetailsComp({ email, price, courseName, orderUniqueId }: { email: string, price: string, courseName: string, orderUniqueId: string }) {

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl w-full h-80 flex items-center flex-col justify-center space-y-3">
                <div className="flex justify-center flex-col items-center w-full">
                    <div className="mb-2">
                        <h2 className="text-3xl font-bold flex items-center text-blue-500">
                            <CreditCard size={35} className="mr-2"/>  Your checkout details
                        </h2>
                    </div>
                    <Table hideHeader aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>Field name</TableColumn>
                            <TableColumn>Field value</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1" className="border shadow-md">
                                <TableCell className="text-black">Course name:</TableCell>
                                <TableCell className="text-black font-semibold">{courseName}</TableCell>
                            </TableRow>
                            <TableRow key="2" className="border shadow-md">
                                <TableCell className="text-black">Email:</TableCell>
                                <TableCell className="text-black font-semibold">{email}</TableCell>
                            </TableRow>
                            <TableRow key="3" className="border shadow-md">
                                <TableCell className="text-black">Price:</TableCell>
                                <TableCell className="text-black font-semibold">INR {price}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
                <div>
                    <PlaceOrderBtn
                        price={price}
                        product={courseName}
                        email={email}
                        orderUniqueId={orderUniqueId}
                    />
                </div>
            </div>


        </div>
    )
}