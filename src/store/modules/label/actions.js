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
        commit("labelsError", err.message);
        throw err;
      });
    const labels = res.data.data.labels;
    commit("setLabels", labels);
    commit("labelsSuccess");
    return null;
  },
  async createLabel({ state, commit }, title) {
    commit("labelsRequest");
    const res = await axios
      .post("/labels/create", {
        title
      })
      .catch(err => {
        commit("labelsError", err.message);
        throw err;
      });
    const label = res.data.data;
    const labels = state.labels;
    labels.push(label);
    commit("setLabels", labels);
    commit("labelsSuccess");
    return label;
  },
  async deleteLabel({ commit, dispatch }, labelId) {
    commit("labelsRequest");
    await axios.get(`/labels/delete/${labelId}`).catch(err => {
      commit("labelsError", err.message);
      throw err;
    });
    dispatch("getLabels");
    return null;
  }
};
