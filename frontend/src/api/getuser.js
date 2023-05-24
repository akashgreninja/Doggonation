import {createApiConfig} from './config'
import { GET_USER_DETAILS,FOLLOW_USER } from './routes';

const apiConfig = createApiConfig();

export const Getuser= (id) => {
    const check={
        id:id
    }
  
    return apiConfig.post(GET_USER_DETAILS,check);
  };
export const Followuser= (id) => {
    const check={
        id:id
    }
  
    return apiConfig.post(GET_USER_DETAILS,check);
  };