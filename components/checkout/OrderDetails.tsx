import { fetchDetailsForOrder } from "@/app/actions/order/fetch-details-for-order/action"
import PlaceOrderBtn from "./PlaceOrderBtn";

export default async function OrderDetailsComp() {
    const data = await fetchDetailsForOrder()
    console.log(data.details);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 mx-auto w-full">
            <div className="border border-gray-700 mx-auto max-w-2xl w-full flex flex-col justify-center items-center h-96 bg-black/20 rounded-lg space-y-4">
                <div className="flex justify-center flex-col items-center">
                    <div>
                        <h2 className="text-3xl font-semibold">Order details</h2>
                    </div>
                    <div>
                        <div>
                            <p className="text-2xl text-center">Course: <span className="font-semibold text-2xl text-blue-300/80">{data.details.productTitle}</span></p>
                        </div>
                        <div>
                            <p className="text-2xl text-center">Confirmation will be sent to: <span className="font-semibold text-2xl text-blue-300/80">{data.details.studentEmail}</span></p>
                        </div>
                        <div>
                            <p className="text-2xl text-center">Course fees: <span className="font-semibold text-2xl text-blue-300/80">{data.details.price}</span></p>
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