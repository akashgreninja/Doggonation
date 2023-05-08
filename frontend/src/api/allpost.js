import {createApiConfig} from './config'
import { ALL_POSTS_URL } from './routes';

const apiConfig = createApiConfig();

export const getallposts = () => {
  
    return apiConfig.get(ALL_POSTS_URL);
  };