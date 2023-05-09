import {createApiConfig} from './config'
import { LIKE_POST } from './routes';

const apiConfig = createApiConfig();

export const like_post = (post_id) => {
    const check={
      post_id:post_id
    }
    return apiConfig.post(LIKE_POST,check);
  };