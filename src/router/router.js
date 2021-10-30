import Vue from "vue";
import VueRouter from "vue-router";
import publicPath from "../../vue.config";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    component: Home
  },
  {
    path: "/card/:card",
    name: "/card/:card",
    component: Home
  },
  {
    path: "/category/:category",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue")
  },
  {
    path: "/scores",
    name: "Scores",
    component: () =>
      import("../views/Scores.vue")
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: () =>
      import("../views/MaxiQuiz.vue")
  },
  // {
  //   path: "/twitter-real-time",
  //   name: "TwitterRealTime",
  //   component: () =>
  //     import("../views/TwitterRealTime.vue")
  // }
];

const router = new VueRouter({
  base: publicPath.publicPath,
  // mode: 'hash', // back button not work, https://github.com/vuejs/vue-router/issues/853 ??
  mode: 'history',
  routes,
  scrollBehavior() { //https://stackoverflow.com/a/57212309, TODO: https://router.vuejs.org/guide/advanced/scroll-behavior.html#async-scrolling
    var a = document.querySelector(".modal-content");
    var b = document.querySelector(".overlay-fullscreen .card-body");
    var c = document.querySelectorAll("body");

    // setTimeout(function(){document.getElementById('app').scrollIntoView();}, 3000);
    document.getElementById("app").scrollIntoView();

    if (a) {
      a.scrollIntoView();
    }
    if (b) {// if in card detail, then …
      c.scrollIntoView();//… go to really top of page
    }
  }
});

export default router;