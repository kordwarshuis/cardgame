import Vue from "vue";
import publicPath from "../vue.config";
// import axios from "axios";
import App from "./App.vue";
import router from "./router/router";
import VueAnalytics from "vue-analytics";
import store from "./store/store";
import * as d3 from 'd3-dsv';
import './assets/js/TweenMax.min';
import {Howl, Howler} from 'howler';
// import './assets/js/menu_sideslide';
// import bootstrap from 'bootstrap';

//https://github.com/rakk7/vue-bootstrap-toasts
import VueBootstrapToasts from "vue-bootstrap-toasts";

Vue.use(d3);
Vue.config.productionTip = false;
Vue.use(VueBootstrapToasts);
Vue.use(Howl, Howler);

Vue.use(VueAnalytics, {
  id: "G-N8VG5BGPSH",
  router
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");


// copy URL into clipboard via click on button
// Note: here it is not: "this.$store.commit" but "store.commit" (https://stackoverflow.com/q/51348936)
var clipboard1 = new ClipboardJS('.copyURLtoClipboard1', {
  text: function () {
      // Notifier.config.default_timeout = "2000";
      // Notifier.info("You can now paste the link.");
      store.commit("showToast", "You can now paste the link.");
      if (sound) go.play();
      return window.location.href;
  }
});
var clipboard1 = new ClipboardJS('.copyURLtoClipboard2', {
  text: function () {
      // Notifier.config.default_timeout = "2000";
      // Notifier.info("You can now paste the link.");
      store.commit("showToast", "You can now paste the link.");
      if (sound) go.play();
      return window.location.href;
  }
});
var clipboard1 = new ClipboardJS('.copyURLtoClipboard3', {
  text: function () {
      // Notifier.config.default_timeout = "2000";
      // Notifier.info("You can now paste the link.");
      store.commit("showToast", "You can now paste the link.");
      if (sound) go.play();
      return window.location.href;
  }
});

// I keep this for reference although I am not sure what it is for
// clipboard1.on('success', textCopiedFeedback);
// clipboard2.on('success', textCopiedFeedback);
// document.querySelector(".copyURLtoClipboard3").addEventListener("click", textCopiedFeedback, false);
// clipboard3.on('success', textCopiedFeedback);
