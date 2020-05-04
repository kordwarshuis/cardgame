import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import d3Dsv from "d3-dsv";
import * as d3 from 'd3-dsv';

Vue.use(d3);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

console.log(d3);
var path = "../data-proxy.php";
d3.csv(path)
      .then(function (sourceData) {
        // init(sourceData);
        // sourceData
        console.log('sourceData: ', sourceData);
      })
      .catch(function (error) {
        console.log(error);
      });