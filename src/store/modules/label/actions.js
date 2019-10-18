import axios from "axios";

export default {
  async getLabels({ commit }, title) {
    commit("labelsRequest");
    const res = await axios
      .get("/labels", {
        params: {
          title
        }
      })
      .catch(err => {
        commit("labelsError", err);
        throw err;
      });
    const labels = res.data.data.labels;
    commit("labelsSuccess", labels);
    return null;
  }
};
