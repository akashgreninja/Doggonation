import axios, { AxiosInstance } from "axios";
export const createApiConfig = () => {
  const instance = axios.create(
    {
      baseURL: "http://localhost:3003",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return instance;
};
