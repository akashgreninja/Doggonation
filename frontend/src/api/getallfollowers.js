import { createApiConfig } from "./config";
import { GET_FOLLOWING } from "./routes";

const apiConfig = createApiConfig();

export const Getallfollowersforuser = (user_id) => {
  const check = {
    user_id: user_id,
  };
  return apiConfig.post(GET_FOLLOWING, check);
};
