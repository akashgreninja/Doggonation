// https://razorpay.com/docs/payments/payment-gateway/quick-integration/test-integration/

// on top is the link to the documentation of razorpay its easy to use and implement


import React, { useState } from "react";
import { SendPaymentToDatabase, createOrder, getKey } from "../../api/razorpay";
import './RazorpayButton.css';

const Razorpay = () => {
  const [orderAmount, setorderAmount] = useState(0);
  const [prob, setprob] = useState([]);
  const [orders, setorders] = useState([]);
  const handleChange = (e) => {
    setorderAmount(e.target.value);
  };

  const loadRazorpay = async () => {
    console.log("started");
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    console.log("step-1");
    script.onerror = () => {
      alert("Razopay SDK failed ");
    };
    script.onload = async () => {
      try {
        // setloading(true);
        console.log("trial-2");
        click_2();

        // console.log(data.body)
      } catch (err) {
        alert("checkera");
        // setloading(false);
      }
    };

    document.body.appendChild(script);
  };
  const click_2 = async (req, res) => {
    const legitamt=100
    const header = {
      amount: 100 +"00",
    };
    const { data } = await createOrder(header);

    console.log(data);
    setprob(data);
    console.log(prob);

    const check = await getKey();
    console.log(check.data);

    const options = {
      key: check.data.key,
      amount: prob.amount,
      currency: "INR",
      name: "example",
      desciption: "blah",
      order_id: prob.id,

      handler: async function (response) {
        console.log(response);
        try{
          const {data}=await SendPaymentToDatabase(
            response.razorpay_payment_id,
            response.razorpay_order_id,
            response.razorpay_signature,
            legitamt
          )
        }catch(err){
          console.log(err)
        }
     
        // console.log("hit")
        // const result=await axios.post(`${host}/pay-order`,{
        //     amount: orderAmount,
        //     razorpayPaymentId : response.razorpay_payment_id,
        //     razorpayOrderId: response.razorpay_order_id,
        //     razorpaySignature: response.razorpay_signature,
        // });
        // if(result.data.msg=="success"){
        //   alert(result.data.msg)
        //   console.log(result.data)
        // }else{
        //   alert(response.error.code);
        //   alert(response.error.description);
        //   alert(response.error.source);
        //   alert(response.error.step);
        //   alert(response.error.reason);
        //   alert(response.error.metadata.order_id);
        //   alert(response.error.metadata.payment_id);
        // }
        // const result = await fetch(`${host}/pay-order`, {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     amount: orderAmount,
        //     razorpayPaymentId : response.razorpay_payment_id,
        //     razorpayOrderId: response.razorpay_order_id,
        //     razorpaySignature: response.razorpay_signature,
        //   },
        //   body:JSON.stringify({amount: orderAmount,razorpayOrderId: response.razorpay_order_id,razorpaySignature: response.razorpay_signature,razorpayPaymentId:response.razorpay_payment_id})
        // });
        // const tetra=await result.json()
        // alert(tetra.msg)
        // fetchOrders();
      },

      prefill: {
        name: "",
        email: "",
        contact: "",
        branch: "",
      },
      notes: {
        address: "as",
      },
      theme: {
        color: "#3399cc",
      },
      allow_rotation: true,
      send_sms_hash: true,
    };
    // setloading(false);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div className="border-2 bg-white rounded-xl m-auto w-fit">
      <input
        type="number"
        placeholder="INR"
        value={orderAmount}
        className="pl-10 py-0.5 rounded-xl m-auto w-28 rounded-b-none "
        onChange={handleChange}
      />
      <button className="btn-donate m-auto" onClick={loadRazorpay}>Razorpay</button>
    </div>
  );
};

export default Razorpay;
