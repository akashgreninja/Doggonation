import {createApiConfig} from './config'
import { GET_USER_DETAILS } from './routes';

const apiConfig = createApiConfig();

export const Getuser= (id) => {
    const check={
        id:id
    }
  
    return apiConfig.post(GET_USER_DETAILS,check);
  };