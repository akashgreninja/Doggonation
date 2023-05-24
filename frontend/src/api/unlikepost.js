import {createApiConfig} from './config'
import { REMOVE_LIKE_POST } from './routes';

const apiConfig = createApiConfig();

export const remove_like_post = (post_id) => {
    const check={
      post_id:post_id
    }
    return apiConfig.post(REMOVE_LIKE_POST,check);
  };