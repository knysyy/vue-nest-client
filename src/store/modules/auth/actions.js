import axios from "axios";

export default {
  async login({ commit }, user) {
    commit("auth_request");
    const res = await axios.post("/auth/login", user).catch(err => {
      localStorage.removeItem("access_token");
      commit("auth_error", err);
      throw err;
    });
    const token = res.data.data.token;
    setAccessToken(token);
    commit("auth_success", token, user);
    return null;
  },
  async signup({ commit }, user) {
    commit("auth_request");
    const res = await axios("/auth/signup", user).catch(err => {
      localStorage.removeItem("access_token");
      commit("auth_error", err);
      throw err;
    });
    const token = res.data.data.token;
    setAccessToken(token);
    commit("auth_success", token, user);
    return null;
  },
  async logout({ commit }) {
    await axios.get("/auth/logout").catch(err => {
      commit("auth_error", err);
      throw err;
    });
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
    commit("logout");
    return null;
  }
};

const setAccessToken = token => {
  localStorage.setItem("access_token", token);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};
