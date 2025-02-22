import { fetchDetailsForOrder } from "@/app/actions/order/fetch-details-for-order/action"
import PlaceOrderBtn from "./PlaceOrderBtn";
import { CreditCard } from "lucide-react";

export default async function OrderDetailsComp() {
    const data = await fetchDetailsForOrder()
    console.log(data.details);
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl w-full h-80 flex items-center flex-col justify-center space-y-3">
                <div className="flex justify-center flex-col items-center">
                    <div className="mb-4">
                        <h2 className="text-3xl font-bold flex items-center gap-1 text-green-600"><CreditCard color="green" size={30}/>Order details</h2>
                    </div>
                    <div>
                        <div>
                            <p className="text-2xl text-center text-black">Course:- <span className="font-semibold text-2xl text-blue-950">{data.details.productTitle}</span></p>
                        </div>
                        <div>
                            <p className="text-2xl text-center text-black">Your email:- <span className="font-semibold text-2xl text-blue-950">{data.details.studentEmail}</span></p>
                        </div>
                        <div>
                            <p className="text-2xl text-center text-black">Course fees:- <span className="font-semibold text-2xl text-blue-950">INR {data.details.price}</span></p>
                        </div>
                    </div>
                </div>
                <div>
                    <PlaceOrderBtn
                        price={data.details.price}
                        product={data.details.productTitle}
                        email={data.details.studentEmail}
                        orderUniqueId={data.details.orderUniqueId}
                    />
                </div>
            </div>


        </div>
    )
}