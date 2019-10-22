import axios from "axios";
import store from "../store";
import router from "../router";

axios.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    if (err.message === "Network Error") {
      throw err;
    }
    if (err.response.status === 401 && router.currentRoute.name !== "Login") {
      store.commit("auth/logout");
      await store.dispatch("app/openSnackBar", {
        text: "Please Login",
        color: "error"
      });
      await router.push({
        path: "/login",
        query: { redirect: router.currentRoute.fullPath }
      });
      throw err;
    }
    if (err.response.status === 400) {
      throw err;
    }
  }
);
axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3000/api";
const token = localStorage.getItem("access_token");

if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
