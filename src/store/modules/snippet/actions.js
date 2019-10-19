import axios from "axios";

export default {
  async getSnippets({ commit }, context = {}) {
    commit("snippetsRequest");
    const res = await axios.post("/snippets/search", context).catch(err => {
      commit("snippetsError", err);
      throw err;
    });
    const snippets = res.data.data.snippets;
    commit("snippetsSuccess", snippets);
    return null;
  },
  async createSnippet({ commit, dispatch }, context = {}) {
    commit("snippetsRequest");
    await axios.post("/snippets/create", context).catch(err => {
      commit("snippetsError", err);
      throw err;
    });
    dispatch("getSnippets");
    return null;
  }
};
