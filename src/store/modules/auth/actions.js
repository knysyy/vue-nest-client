import axios from "axios";

export default {
  async login({ commit, dispatch }, user) {
    commit("authRequest");
    const res = await axios.post("/auth/login", user).catch(err => {
      localStorage.removeItem("access_token");
      commit("authError", err);
      throw err;
    });
    const token = res.data.data.token;
    setAccessToken(token);
    dispatch("getUser");
    commit("authSuccess", token);
    return null;
  },
  async signup({ commit, dispatch }, user) {
    commit("authRequest");
    const res = await axios.post("/auth/signup", user).catch(err => {
      localStorage.removeItem("access_token");
      commit("authError", err);
      throw err;
    });
    const token = res.data.data.token;
    setAccessToken(token);
    dispatch("getUser");
    commit("authSuccess", token);
    return null;
  },
  async logout({ commit }) {
    await axios.get("/auth/logout").catch(err => {
      commit("authError", err);
      throw err;
    });
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
    commit("logout");
    return null;
  },
  async editUser({ commit }, user) {
    const res = await axios.post("/user", user).catch(err => {
      throw err;
    });
    const newUser = res.data.data;
    commit("setUser", newUser);
  },
  async getUser({ commit }) {
    const res = await axios.get("/user").catch(err => {
      throw err;
    });
    const user = res.data.data;
    commit("setUser", user);
  }
};

const setAccessToken = token => {
  localStorage.setItem("access_token", token);
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};
