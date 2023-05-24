import {createApiConfig} from './config'
import { ALL_POSTS_URL,GET_USER_POSTS } from './routes';

const apiConfig = createApiConfig();

export const getallposts = (user_id) => {
  const check={
    user_id:user_id
  }
    return apiConfig.post(ALL_POSTS_URL,check);
  };
export const getuserposts = (user_id) => {
  const check={
    user_id:user_id
  }
    return apiConfig.post(GET_USER_POSTS,check);
  };