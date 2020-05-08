import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalState: "popup md-modal md-effect-1",
    theJSON: null,
    categories: [],
    activeCategory: "All",
    currentTitle: "–––"
  },
  getters: {},
  mutations: {
    // changeTitle: (state, title) => {
    //   state.currentTitle = title;
    // },
    changeTitle (state, newTitle) {
      state.currentTitle = newTitle;
    }
  },
  actions: {},
  modules: {}
});