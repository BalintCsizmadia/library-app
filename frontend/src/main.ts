import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import VueAxios from "vue-axios";

const axiosConfig = {
  baseURL: process.env.VUE_APP_SERVER_URL
};
const axiosInst = axios.create(axiosConfig);

Vue.use(VueAxios, axiosInst);

Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount("#app");
