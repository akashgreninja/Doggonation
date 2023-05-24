import {createApiConfig} from './config'
import { REPORT} from './routes';

const apiConfig = createApiConfig();

export const report = (reason,post_id) => {
    const check={
      reason:reason,
      post_id:post_id,
    }
    return apiConfig.post(REPORT,check);
  };