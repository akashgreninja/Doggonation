import {createApiConfig} from './config'
import { REPORT} from './routes';

const apiConfig = createApiConfig();

export const report = (post_id) => {
    const check={
      post_id:post_id
    }
    return apiConfig.post(REPORT,check);
  };