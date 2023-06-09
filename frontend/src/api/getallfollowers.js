import { createApiConfig } from "./config";
import { GET_FOLLOWERS } from "./routes";
import { GET_FOLLOWING, NOT_FOLLOWING } from "./routes";

const apiConfig = createApiConfig();

export const Getallfollowersforuser = (user_id) => {
  const check = {
    user_id: user_id,
  };
  return apiConfig.post(GET_FOLLOWERS, check);
};
export const GetNumberOfFollowingForUser = (user_id) => {
  const check = {
    user_id: user_id,
    onlynumber: true,
  };
  return apiConfig.post(GET_FOLLOWERS, check);
};
export const GetNumberOfFollowersForUser = (user_id) => {
  const check = {
    user_id: user_id,
    onlynumber: true,
  };
  return apiConfig.post(GET_FOLLOWING, check);
};
export const GetAllNonFollowers = (user_id) => {
  const check = {
    user_id: user_id,
  };
  return apiConfig.post(NOT_FOLLOWING, check);
};
