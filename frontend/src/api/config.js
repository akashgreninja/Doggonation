import axios, { AxiosInstance } from "axios";
//KARTHIK AND AKASH NOTE AUTH IS NOT AT ALL DONE IN THIS FILE
export const createApiConfig = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:3003',

    }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }})
    return instance

}