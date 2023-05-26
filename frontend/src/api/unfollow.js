import {createApiConfig} from './config'
import { UNFOLLOW_USER } from './routes';

const apiConfig = createApiConfig();

export const unfollow = (user_id,followed_id) => {
    const check={
        user_id:user_id,
        followed_id:followed_id
    }
    return apiConfig.post(UNFOLLOW_USER,check);
  };