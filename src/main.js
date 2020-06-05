import Vue from "vue";
// import axios from "axios";
import App from "./App.vue";
import router from "./router/router";
import VueAnalytics from "vue-analytics";
import store from "./store/store";
import * as d3 from 'd3-dsv';
import './assets/js/TweenMax.min';
// import './assets/js/menu_sideslide';
// import bootstrap from 'bootstrap';

//https://github.com/rakk7/vue-bootstrap-toasts
// import VueBootstrapToasts from "vue-bootstrap-toasts";

Vue.use(d3);
Vue.config.productionTip = false;
// Vue.use(VueBootstrapToasts);
Vue.use(VueAnalytics, {
  id: "G-N8VG5BGPSH",
  router
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

