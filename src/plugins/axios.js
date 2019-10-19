import axios from "axios";
import store from "../store";
import router from "../router";

axios.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    if (err.response.status === 401) {
      store.commit("auth/logout");
      store.commit("app/setSnackBarText", "Please Login");
      store.commit("app/setSnackBarColor", "error");
      store.commit("app/setSnackBar", true);
      await router.push("/login");
    }
  }
);
axios.defaults.baseURL = "/api";
const token = localStorage.getItem("access_token");

if (token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}
