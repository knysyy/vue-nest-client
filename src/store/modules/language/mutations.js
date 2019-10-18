import * as languagesStatuses from "./statuses";

export default {
  languagesRequest(state) {
    state.status = languagesStatuses.LANGUAGE_LOADING;
    state.err = null;
  },
  languagesSuccess(state, languages) {
    state.status = languagesStatuses.LANGUAGE_SUCCESS;
    state.languages = languages;
  },
  languagesError(state, err) {
    state.status = languagesStatuses.LANGUAGE_ERROR;
    state.error = err;
  }
};
