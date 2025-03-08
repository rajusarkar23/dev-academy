import { fetchDetailsForOrder } from '@/app/actions/order/fetch-details-for-order/action';
import OrderDetailsComp from '@/components/checkout/OrderDetails'
import React from 'react'

const OrderDetails = async () => {

   const data = await fetchDetailsForOrder()

  return (
    <div>
      <OrderDetailsComp courseName={data.details.productTitle} email={data.details.studentEmail} price={data.details.price} orderUniqueId={data.details.orderUniqueId}/>
    </div>
  )
}

export default OrderDetails