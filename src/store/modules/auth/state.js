import * as authStatuses from "./statuses";

export default {
  status: authStatuses.AUTH_DEFAULT,
  token: localStorage.getItem("access_token") || null,
  user: {},
  error: null
};
