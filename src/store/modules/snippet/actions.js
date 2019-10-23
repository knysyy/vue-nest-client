import axios from "axios";

export default {
  async getSnippets({ commit }, context = {}) {
    commit("snippetsRequest");
    const res = await axios.post("/snippets/search", context).catch(err => {
      commit("snippetsError", err);
      throw err;
    });
    const snippets = res.data.data.snippets;
    commit("setSnippets", snippets);
    commit("snippetsSuccess");
    return null;
  },
  async createSnippet({ commit, dispatch }, context = {}) {
    commit("snippetsRequest");
    await axios.post("/snippets/create", context).catch(err => {
      commit("snippetsError", err);
      throw err;
    });
    commit("snippetsSuccess");
    dispatch("getSnippets");
    return null;
  },
  async updateSnippet({ commit }, context = {}) {
    commit("snippetsRequest");
    const res = await axios.post("/snippets/edit", context).catch(err => {
      commit("snippetsError", err);
      throw err;
    });
    const snippet = res.data.data;
    commit("setSnippet", snippet);
    commit("snippetsSuccess");
    return null;
  },
  async favoriteSnippet({ state, commit }, context = {}) {
    commit("snippetsRequest");
    await axios.post("/snippets/favorite", context).catch(err => {
      commit("snippetsError", err);
      throw err;
    });
    const snippets = state.snippets.map(snippet => {
      if (snippet.id === context.id) {
        snippet.favorite = context.favorite;
      }
      return snippet;
    });
    commit("setSnippets", snippets);
    commit("snippetsSuccess");
    return null;
  }
};
