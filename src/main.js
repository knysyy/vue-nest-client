import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:3000/api";

const accessToken = localStorage.getItem("access_token");

if (accessToken) {
  axios.defaults.headers.common["Authorization"] = accessToken;
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
