import { set, toggle } from "@/utils/vuex";
import * as snippetsStatuses from "./statuses";

export default {
  setSearchDialog: set("searchDialog"),
  toggleSearchDialog: toggle("searchDialog"),
  setAddDialog: set("addDialog"),
  toggleAddDialog: toggle("addDialog"),
  snippetsRequest(state) {
    state.status = snippetsStatuses.SNIPPET_LOADING;
    state.err = null;
  },
  snippetsSuccess(state, snippets) {
    state.status = snippetsStatuses.SNIPPET_SUCCESS;
    state.snippets = snippets;
  },
  snippetsError(state, err) {
    state.status = snippetsStatuses.SNIPPET_ERROR;
    state.error = err;
  }
};
