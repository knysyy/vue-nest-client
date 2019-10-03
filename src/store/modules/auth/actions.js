import axios from "axios";

export default {
  async login({ commit }, user) {
    commit("auth_request");
    const res = await axios.post("/auth/login", user).catch(err => {
      localStorage.removeItem("access_token");
      commit("auth_error", err);
    });
    const token = res.data.data.token;
    localStorage.setItem("access_token", token);
    commit("auth_success", token, user);
    return null;
  },
  async signup({ commit }, user) {
    commit("auth_request");
    const res = await axios("/auth/signup", user).catch(err => {
      localStorage.removeItem("access_token");
      commit("auth_error", err);
    });
    const token = res.data.data.token;
    localStorage.setItem("access_token", token);
    axios.defaults.headers.common["Authorization"] = token;
    commit("auth_success", token, user);
    return null;
  },
  async logout({ commit }) {
    await axios.get("/auth/logout").catch(err => {
      commit("auth_error", err);
    });
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
    commit("logout");
    return null;
  }
};
