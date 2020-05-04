import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import D3 from "d3-dsv";


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  d3,
  render: h => h(App)
}).$mount("#app");

console.log(d3);