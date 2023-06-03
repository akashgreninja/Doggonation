import {createApiConfig} from './config'
import { FOLLOW_USER } from './routes';

const apiConfig = createApiConfig();

export const follow = (user_id,followed_id) => {
    const check={
      user_id:user_id,
      followed_id:followed_id
    }
    return apiConfig.post(FOLLOW_USER,check);
  };