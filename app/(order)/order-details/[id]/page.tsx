import { fetchDetailsForOrder } from '@/app/actions/order/fetch-details-for-order/action'
import OrderDetailsComp from '@/components/checkout/OrderDetails'
import React from 'react'

const OrderDetails = async () => {

await fetchDetailsForOrder()

  return (
    <div>
      <OrderDetailsComp />
    </div>
  )
}

export default OrderDetails