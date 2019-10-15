import * as authStatuses from "./statuses";

export default {
  authRequest(state) {
    state.status = authStatuses.AUTH_LOADING;
    state.err = null;
  },
  authSuccess(state, token) {
    state.status = authStatuses.AUTH_SUCCESS;
    state.token = token;
  },
  authError(state, err) {
    state.status = authStatuses.AUTH_ERROR;
    state.error = err;
  },
  logout(state) {
    state.status = authStatuses.AUTH_DEFAULT;
    state.token = null;
    state.user = {};
  },
  setUser(state, user) {
    state.user = user;
  }
};
