import {createApiConfig} from './config'
import { ALL_POSTS_URL } from './routes';

const apiConfig = createApiConfig();

export const getallposts = (user_id) => {
  const check={
    user_id:user_id
  }
    return apiConfig.post(ALL_POSTS_URL,check);
  };