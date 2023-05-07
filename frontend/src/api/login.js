import { createApiConfig } from "./config";
import { LOGIN_URL } from "./routes";

const apiConfig = createApiConfig();
export const Login = (email,password) => {
  const send = {
    email: email,
    password: password,
  };
  return apiConfig.post(LOGIN_URL, send);
};
