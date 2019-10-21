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
  },
  async createLabel({ state, commit, dispatch }, title) {
    commit("labelsRequest");
    const res = await axios
      .post("/labels/create", {
        title
      })
      .catch(err => {
        commit("labelsError", err);
        throw err;
      });
    const label = res.data.data;
    const labels = state.labels;
    labels.push(label);
    dispatch("labelsSuccess", labels);
    return label;
  },
  async deleteLabel({ commit, dispatch }, labelId) {
    commit("labelsRequest");
    await axios.get(`/labels/delete/${labelId}`).catch(err => {
      commit("labelsError", err);
      throw err;
    });
    dispatch("getLabels");
    return null;
  }
};
