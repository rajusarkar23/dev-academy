import React from 'react'
import { processOrder } from '../actions/payment/action'

const ProcessOrder = async () => {

    const order = await processOrder()

  return (
    <div>{order.message}</div>
  )
}

export default ProcessOrder