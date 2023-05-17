import {createApiConfig} from './config'
import { GET_COMMENT } from './routes';

const apiConfig = createApiConfig();

export const getallcomment = (post_id) => {
    const check={
      post_id:post_id 
    }
    return apiConfig.post(GET_COMMENT,check);
  };