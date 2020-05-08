import Vue from "vue";
// import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import * as d3 from 'd3-dsv';
import './assets/css/main.scss';
import './assets/css/menu_sideslide.css';
import './assets/js/TweenMax.min';
import './assets/js/menu_sideslide';
// import './assets/js/GridLayoutMotionDemo';
// import bootstrap from 'bootstrap';

Vue.use(d3);
Vue.config.productionTip = false;

// const Methods = {
//   korkor() {
//     console.log("korkor");
//   }
// };

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

