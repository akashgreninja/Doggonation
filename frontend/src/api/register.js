import { createApiConfig } from "./config";
import { SIGNUP_URL} from "./routes";

const apiConfig = createApiConfig();
export const Register=(name,email,password,dob,gender,profile_pic)=>{
    const send={
        name:name,
        email:email,
        password:password,
        dob:dob,
        
        gender:gender,
        profile_pic:profile_pic,
    }
    return apiConfig.post(SIGNUP_URL,send)
}