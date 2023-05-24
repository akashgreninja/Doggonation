import {createApiConfig} from './config'
import { SEARCH } from './routes';

const apiConfig = createApiConfig();

export const startsearch = (searchdata) => {
  const check={
    keywords:searchdata
  }
    return apiConfig.post(SEARCH,check);
  };