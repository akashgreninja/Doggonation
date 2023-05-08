import {createApiConfig} from './config'
import { ADD_COMMENT } from './routes';


const apiConfig = createApiConfig();

export const add_comment = (comment,post_id,user_id) => {
  const check={
    comment:comment,
    post_id:post_id,
    user_id:user_id,
    
  }
    return apiConfig.post(ADD_COMMENT,check);
  };