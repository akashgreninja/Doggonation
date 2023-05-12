import {createApiConfig} from './config'
import { TRANSLATE } from './routes';

const apiConfig = createApiConfig();

export const translate = (searchdata) => {
  const check={
    text:searchdata
  }
    return apiConfig.post(TRANSLATE,check);
  };