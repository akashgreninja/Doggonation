import { createApiConfig } from "./config";
import { CREATE_ORDER, GET_KEY,SEND_DATABASE } from "./routes";

const apiConfig = createApiConfig();

export const createOrder = (header) => {
  return apiConfig.post(CREATE_ORDER, header);
};

export const getKey = () => {
  return apiConfig.get(GET_KEY);
};

export const SendPaymentToDatabase = (razorpay_payment_id,razorpay_order_id,razorpay_signature,amount) => {
  const check={
    razorpayPaymentId:razorpay_payment_id,
    razorpayOrderId:razorpay_order_id,
    razorpaySignature:razorpay_signature,
    amount:amount


  }
  return apiConfig.post(SEND_DATABASE,check);

}