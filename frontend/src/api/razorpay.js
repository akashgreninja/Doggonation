import { createApiConfig } from "./config";
import { CREATE_ORDER, GET_KEY } from "./routes";

const apiConfig = createApiConfig();

export const createOrder = (header) => {
  return apiConfig.post(CREATE_ORDER, header);
};

export const getKey = () => {
  return apiConfig.get(GET_KEY);
};
