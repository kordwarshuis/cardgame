import Vue from 'vue';
import VueConfig from "../vue.config";
import App from './App.vue';
import router from './router/router';
import VueGtag from 'vue-gtag';
// import VueAnalytics from 'vue-ua';
import store from './store/store';
import * as d3 from 'd3-dsv';
import {
  Howl,
  Howler
} from 'howler';
// import _ from 'lodash';
// import interact from 'interactjs';
// import './assets/js/menu_sideslide';
// import bootstrap from 'bootstrap';

//https://github.com/rakk7/vue-bootstrap-toasts
import VueBootstrapToasts from 'vue-bootstrap-toasts';
import linkify from 'vue-linkify';
// import animated from 'animate.css';

Vue.use(d3);
Vue.config.productionTip = false;
Vue.use(VueBootstrapToasts);
Vue.use(Howl, Howler);
Vue.directive('linkified', linkify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

Vue.use(VueGtag, {
  config: {
    id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
    params: {
      send_page_view: true
    }
  },
  bootstrap: true,
  pageTrackerTemplate(to) {
    return {
      page_title: to.path,
      page_path: to.path
    };
  }
}, router);


// https://www.digitalocean.com/community/tutorials/vuejs-google-analytics
// https://github.com/ScreamZ/vue-analytics
// Vue.use(VueAnalytics, {
//   // [Required] The name of your app as specified in Google Analytics.
//   appName: 'Card game',
//   // [Required] The version of your app.
//   appVersion: '0',
//   // [Required] Your Google Analytics tracking ID.
//   trackingId: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
//   // If you're using vue-router, pass the router instance here.
//   vueRouter: router,
//   trackPage: true
// });


// set which game
document.querySelector('body').classList.add(process.env.VUE_APP_ID);
store.commit('setGameId', process.env.VUE_APP_ID);
store.commit('setGameTitle', process.env.VUE_APP_TITLE);
store.commit('setGameTitle2', process.env.VUE_APP_TITLE_2);
store.commit('setGameSubTitle', process.env.VUE_APP_SUBTITLE);

// copy URL into clipboard via click on button
// Note: here it is not: "this.$store.commit" but "store.commit" (https://stackoverflow.com/q/51348936)
new ClipboardJS('.copyURLtoClipboard1', {
  text: function () {
    store.commit('showToast', language.shareMessage);
    if (localStorage.getItem('soundOn') === 'true') go.play();
    document.querySelector('body').classList.add('person1');
    setTimeout(function () {
      document.querySelector('body').classList.remove('person1');
    }, 1500);
    // return "“" + store.state.currentCard["Misconception"] + "”\n" + store.state.currentCard["Short Answer"] + " 👉 " + window.location.href;
    return "“" + store.state.currentCard["Misconception"] + "”\n" + " 👉 " + window.location.href;
  }
});
new ClipboardJS('.copyURLtoClipboard2', {
  text: function () {
    store.commit('showToast', language.shareMessage);
    if (localStorage.getItem('soundOn') === 'true') go.play();
    document.querySelector('body').classList.add('person1');
    setTimeout(function () {
      document.querySelector('body').classList.remove('person1');
    }, 1500);
    // return "“" + store.state.currentCard["Misconception"] + "”\n" + store.state.currentCard["Short Answer"] + " 👉 " + window.location.href;
    return "“" + store.state.currentCard["Misconception"] + "”\n" + " 👉 " + window.location.href;
  }
});
new ClipboardJS('.copyURLtoClipboard3', {
  text: function () {
    store.commit("showToast", language.shareMessage);
    if (localStorage.getItem("soundOn") === "true") go.play();
    document.querySelector("body").classList.add("person1");
    setTimeout(function () {
      document.querySelector("body").classList.remove("person1");
    }, 1500);
    // return "“" + store.state.currentCard["Misconception"] + "”\n" + store.state.currentCard["Short Answer"] + " 👉 " + window.location.href;
    return "“" + store.state.currentCard["Misconception"] + "”\n" + " 👉 " + window.location.href;
  }
});

var clipboardOverviewScreen = new ClipboardJS('.copyURLtoClipboard4', {
  text: function (trigger) {
    //https://stackoverflow.com/a/6941624
    return "“" + trigger.dataset.misconception + "”\n" + " 👉 " + window.location.protocol + "//" + window.location.host + VueConfig.publicPath + "card/" + trigger.dataset.url;
  }
});

clipboardOverviewScreen.on('success', function (e) {
  store.commit("showToast", language.shareMessage);
  if (localStorage.getItem("soundOn") === "true") go.play();
  document.querySelector("body").classList.add("person1");
  setTimeout(function () {
    document.querySelector("body").classList.remove("person1");
  }, 1500);
});


var clipboardCategory = new ClipboardJS('.copyURLtoClipboard5', {
  text: function (trigger) {
    return window.location.href;
  }
});

clipboardCategory.on('success', function (e) {
  store.commit("showToast", language.shareMessage);
  if (localStorage.getItem("soundOn") === "true") go.play();
  document.querySelector("body").classList.add("person1");
  setTimeout(function () {
    document.querySelector("body").classList.remove("person1");
  }, 1500);
});

// copies all URLs of bookmarked tweets to clipboard
var clipboardBookmarkedURLs = new ClipboardJS('.copyBookmarkedURLsToClipboard', {
  text: function (trigger) {
    var urls = [];
    var anchors = document.querySelectorAll('.tweets-selected .tweets .tweet .go-to-tweet');
    var regex = /,/gi;
    anchors.forEach(function (a) {
      urls.push(a.getAttribute('href'));
    });
    urls = urls.toString();
    urls = urls.replace(regex, '\n');
    return urls;
  }
});

clipboardBookmarkedURLs.on('success', function (e) {
  store.commit("showToast", language.shareMessage);
  if (localStorage.getItem("soundOn") === "true") go.play();
  document.querySelector("body").classList.add("person1");
  setTimeout(function () {
    document.querySelector("body").classList.remove("person1");
  }, 1500);
});

// copies all URLs of bookmarked tweets to email
var clipboardBookmarkedURLsToEmail = new ClipboardJS('.copyBookmarkedURLsToEmail', {
  text: function (trigger) {
    var urls = [];
    var anchors = document.querySelectorAll('.tweets-selected .tweets .tweet .go-to-tweet');
    var regex = /,/gi;
    anchors.forEach(function (a) {
      urls.push(a.getAttribute('href'));
    });
    urls = urls.toString();
    urls = urls.replace(regex, '\r\n\r\n');
    // https://stackoverflow.com/a/10220953
    urls = encodeURIComponent(urls);
    window.open('mailto:?subject=Bookmarked%20Tweets%20Blockchain%20Bird&body=' + urls);
    return urls;

  }
});

clipboardBookmarkedURLsToEmail.on('success', function (e) {
  store.commit("showToast", language.shareMessage);
  if (localStorage.getItem("soundOn") === "true") go.play();
  document.querySelector("body").classList.add("person1");
  setTimeout(function () {
    document.querySelector("body").classList.remove("person1");
  }, 1500);
});



var clipboardSearchResults = new ClipboardJS('.copyURLtoClipboard6', {
  text: function (trigger) {
    return window.location.protocol + "//" + window.location.host + VueConfig.publicPath + trigger.dataset.url;
  }
});

clipboardSearchResults.on('success', function (e) {
  store.commit("showToast", language.shareMessage);
  if (localStorage.getItem("soundOn") === "true") go.play();
  document.querySelector("body").classList.add("person1");
  setTimeout(function () {
    document.querySelector("body").classList.remove("person1");
  }, 1500);
});