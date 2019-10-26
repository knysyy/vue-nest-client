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
  snippetsSuccess(state) {
    state.status = snippetsStatuses.SNIPPET_SUCCESS;
  },
  snippetsError(state, err) {
    state.status = snippetsStatuses.SNIPPET_ERROR;
    state.error = err;
  },
  setSnippets(state, snippets) {
    state.snippets = snippets;
  },
  setSnippet(state, newSnippet) {
    const snippets = state.snippets;
    state.snippets = snippets.map(snippet => {
      if (snippet.id === newSnippet) {
        return newSnippet;
      }
      return snippet;
    });
  },
  deleteSnippet(state, snippetId) {
    const snippets = state.snippets;
    state.snippets = snippets.filter(snippet => {
      return snippet.id !== snippetId;
    });
  }
};
