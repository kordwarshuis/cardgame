import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cssClassCardOverviewState: "",
    cssClassCardIntroState: "",
    cssClassCardFullState: "popup md-modal md-effect-1",
    theJSON: null,
    categories: [], // [{name: xxx, numberOfItems: xxx}]
    activeCategory: "All",
    currentCard: {},
    allCardsInChosenCategory: [],
    dataFetched: false,
  },
  getters: {
    getCard: (state) => (id) => {
      for (let i = 0; i < state.theJSON.length; i++) {
        if (state.theJSON[i]["Unique URL"] === id) {
          return state.theJSON[i];
        }
      }
    },
  },
  mutations: {
    hideModal(state) {
      //TODO: is this the way to change a store value? Seems not.
      this.state.cssClassCardFullState = "";
      // console.log("bizar");
      // document.querySelector(".videoWrapper").innerHTML = "";
      // console.log('document.querySelector(".videoWrapper"): ', document.querySelector(".youtube"));

      //TODO: to stop video playing and avoind that scroll position is not top. Doesnt work
      // document.querySelector(".modal-content").innerHTML = "";
    },
    changeCard(state, newCard) {
      state.currentCard = newCard;
    },
    changeCssClassCardIntroState(state, newCardIntroState) {
      state.cssClassCardIntroState = newCardIntroState;
    },
    changeCssClassCardOverviewState(state, newCardOverviewPageState) {
      state.cssClassCardOverviewState = newCardOverviewPageState;
    },
    showCardIntroFromURL(state, uniqueIdFromUrl) {
      // deal with CSS
      this.commit("changeCssClassCardIntroState", "open");
      this.commit("changeCssClassCardOverviewState", "overlay-fullscreen-open");

      // returns object with all entries of one prejudice
      var currentCard = this.getters.getCard(uniqueIdFromUrl);
      this.commit("changeCard", currentCard);
    },
    showItemsInSelectedCategory(state, category) {
      var allCardsInChosenCategory = [];

      // set active category name (TODO: refactor so undefined check is not necesary. Instead the string “All” should be set on the first <a>)
      if (category === undefined) {
        this.state.activeCategory = "All";
      } else {
        this.state.activeCategory = category.name;
      }

      // first make the selected menu item stand out:
      this.commit("setActiveMenuItem", category);

      function makeArray(a, b) {
        a.push({
          "id": b["Unique URL"],
          "prejudice": b.Prejudice,
          "category": b.Cat,
          "prejudiceElaborate": b["Prejudice Elaborate"]
          // ,
          // "numberOfItems": 
        });
      }

      // category === undefined runs when function is called without argument, which happens on the ajax callback. Should be the first, and not after the "||"
      // here we create the info for the cards per category page
      if (category === undefined) {
        for (let i = 0; i < this.state.theJSON.length; i++) {
          makeArray(allCardsInChosenCategory, this.state.theJSON[i]);
        }
      } else {
        for (let i = 0; i < this.state.theJSON.length; i++) {
          if (this.state.theJSON[i].Cat === category.name) {
            makeArray(allCardsInChosenCategory, this.state.theJSON[i]);
          }
        }
      }

      // copy the final array to the store
      this.state.allCardsInChosenCategory = allCardsInChosenCategory;

      setTimeout(codrops, 1);

      if (category !== undefined) {
        Notifier.config.default_timeout = "2000";
        Notifier.info("You are now viewing all cards in category \"" + this.state.activeCategory + "\"");
      }
    },
    setActiveMenuItem(item) {
      var allMenuItems = document.querySelectorAll(".categoryLinks a");

      // first remove class .active from all elements
      for (let i = 0; i < allMenuItems.length; i++) {
        allMenuItems[i].classList.remove("active");
      }
      for (let i = 0; i < this.state.categories.length; i++) {
        if (item === undefined) {
          document.querySelector(".categoryLinks a[data-category='All']").classList.add("active");
        } else
        if (this.state.activeCategory === this.state.categories[i].name) {
          document.querySelector(".categoryLinks a[data-category='" + this.state.categories[i].name + "']").classList.add("active");
        }
      }
    }
  },
  actions: {},
  modules: {}
});