import {createApiConfig} from './config'
import { GET_TAGS } from './routes';

const apiConfig = createApiConfig();

export const gettags = (post_id) => {
    const check={
      post_id:post_id
    }
    return apiConfig.post(GET_TAGS,check);
  };