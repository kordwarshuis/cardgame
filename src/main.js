import Vue from "vue";
// import axios from "axios";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import * as d3 from 'd3-dsv';
import './assets/js/TweenMax.min';
import './assets/js/menu_sideslide';
// import bootstrap from 'bootstrap';

Vue.use(d3);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

