import { createApiConfig } from "./config";
import { EXPLORE } from "./routes";

const apiConfig = createApiConfig();

export const getExplorePosts = () => {
  return apiConfig.post(EXPLORE);
};
