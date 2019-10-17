import axios from "axios";

export default {
  async getSnippets({ commit }, context = {}) {
    commit("snippetsRequest");
    const res = await axios.post("/snippets", context).catch(err => {
      commit("snippetsError", err);
      throw err;
    });
    const snippets = res.data.data.snippets;
    commit("snippetsSuccess", snippets);
    return null;
  }
};
