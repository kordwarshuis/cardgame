import Vue from "vue";
import VueRouter from "vue-router";
import publicPath from "../../vue.config";

import Home from "../views/Home.vue";

// import About from "../views/About.vue";
// import TwitterRealTime from "../views/TwitterRealTime.vue";
// import Scores from "../views/Scores.vue";


Vue.use(VueRouter);

const routes = [{
    path: "/",
    component: Home
  },
  {
    path: "/card/:card",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: About
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/scores",
    name: "Scores",
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/Scores.vue")
  },
  {
    path: "/twitter-real-time",
    name: "TwitterRealTime",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: TwitterRealTime    
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/TwitterRealTime.vue")
  }
];

const router = new VueRouter({
  base: publicPath.publicPath,
  // mode: 'hash', // back button not work, https://github.com/vuejs/vue-router/issues/853 ??
  mode: 'history', // it's work
  routes
});

export default router;