import React from 'react'
import { processOrder } from '../../actions/payment/action'
import { Skeleton } from '@heroui/skeleton'

const ProcessOrder = async () => {

    const order = await processOrder()

    return (
        <div>
            <Skeleton>
                <p>
                    {order.message}
                </p>
            </Skeleton>

        </div>
    )
}

export default ProcessOrder