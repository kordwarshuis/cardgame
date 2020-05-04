import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import d3Dsv from "2d3-dsv";

Vue.use(d3Dsv);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// console.log(d3);