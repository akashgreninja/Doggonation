import React from "react"
import Razorpay from "../../components/Razorpay/Razorpay"


const Donation = () => {
    return(
        <div className="m-10">
            <h1 className='text-4xl font-bold my-10 text-center'>Help us out!</h1>
            <Razorpay/>
        </div>
    )
}

export default Donation;