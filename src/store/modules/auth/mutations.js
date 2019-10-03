import * as authStatuses from "./statuses";

export default {
  auth_request(state) {
    state.status = authStatuses.AUTH_LOADING;
    state.err = null;
  },
  auth_success(state, token, user) {
    state.status = authStatuses.AUTH_SUCCESS;
    state.token = token;
    state.user = user;
  },
  auth_error(state) {
    state.status = authStatuses.AUTH_ERROR;
  },
  logout(state, err) {
    state.status = authStatuses.AUTH_DEFAULT;
    state.token = null;
    state.user = {};
    state.error = err;
  }
};
