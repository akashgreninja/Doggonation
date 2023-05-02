import {createApiConfig} from './config'
import { ADD_POST } from './routes';


const apiConfig = createApiConfig();

export const add_post = (pic_url,location,caption,user_id,tags) => {
  const check={
    pic_url:pic_url,
    location:location,
    caption:caption,
    user_id:user_id,
    tags:tags
  }
    return apiConfig.post(ADD_POST,check);
  };