import { createApiConfig } from "./config";
import { MSG } from "./routes";

const apiConfig = createApiConfig();
export const msg = (room_id) => {
  const send = {
    room: room_id
  };
  return apiConfig.post(MSG, send);
};
