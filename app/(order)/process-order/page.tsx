import React from 'react'
import { processOrder } from '../../actions/payment/action'

const ProcessOrder = async () => {

    const order = await processOrder()

    return (
        <div>
                <p>
                    {order.message}
                </p>

        </div>
    )
}

export default ProcessOrder