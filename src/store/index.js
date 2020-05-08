import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modalState: "popup md-modal md-effect-1",
    theJSON: null,
    categories: [],
    activeCategory: "All",
    // currentTitle: "–––",
    currentPrejudice: {}
  },
  getters: {
    getPrejudice: (state) => (id) => {
      for (let i = 0; i < state.theJSON.length; i++) {
        if (state.theJSON[i]["Unique URL"] === id) {
          return state.theJSON[i];
        }
      }
    },
  },
  mutations: {
    // changeTitle: (state, title) => {
    //   state.currentTitle = title;
    // },
    // changeTitle (state, newTitle) {
    //   state.currentTitle = newTitle;
    // },
    changePrejudice (state, newPrejudice) {
      state.currentPrejudice = newPrejudice;
    }
  },
  actions: {},
  modules: {}
});