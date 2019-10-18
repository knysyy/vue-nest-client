import axios from "axios";

export default {
  async getLanguages({ commit }, title) {
    commit("languagesRequest");
    const res = await axios
      .get("/languages", {
        params: {
          title
        }
      })
      .catch(err => {
        commit("languagesError", err);
        throw err;
      });
    const languages = res.data.data.languages;
    commit("languagesSuccess", languages);
    return null;
  }
};
