import React from 'react'
import { processOrder } from '../../actions/payment/action'
import ProcessOrderComp from '@/components/checkout/ProcessOrderComp';

const ProcessOrder = async () => {

    const order = await processOrder()

    return (
        <div>
            {
                order.success ? (  <ProcessOrderComp />) : (<p>Something went wrong.</p>)
            }
          
        </div>
    )
}

export default ProcessOrder