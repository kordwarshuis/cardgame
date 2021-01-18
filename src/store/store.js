import Vue from "vue";
import Vuex from "vuex";
import router from '../router/router';
import axios from "axios";
import * as d3 from "d3-dsv";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameId: "",
    gameTitle: "",
    gameTitle2: "",
    gameSubTitle: "",
    cssClassCardOverviewState: "",
    cssClassCardIntroState: "",
    cssClassCardFullState: "popup md-modal md-effect-1",
    theJSON: null,
    categories: [], // [{name: xxx, numberOfItems: xxx}],
    allKeys: [],
    activeCategory: "All",
    currentCard: {},
    numberofCards: 0,
    allCardsInChosenCategory: [],
    dataFetched: false,
    topScorer: "",
    linkifyOptions: {
      className: 'linkified',
      format: function (value, type) {
        var longerThan = 20;
        if (type === 'url' && value.length > longerThan) {
          // https://stackoverflow.com/a/41942787
          value = value.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
          value = value.slice(0, longerThan) + '…';
        }
        return value;
      }
    },
    prospectHandles: [],
    tweetedCards: []
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
    setTopScorer(state, topScorer) {
      state.topScorer = topScorer;
    },
    setGameId(state, id) {
      this.state.gameId = id;
    },
    setGameTitle(state, name) {
      this.state.gameTitle = name;
    },
    setGameTitle2(state, name) {
      this.state.gameTitle2 = name;
    },
    setGameSubTitle(state, name) {
      this.state.gameSubTitle = name;
    },
    hideModal(state) {
      //TODO: is this the way to change a store value? Seems not.
      this.state.cssClassCardFullState = "";

      if (localStorage.getItem("soundOn") === "true") whoosh2.play();

      // document.querySelector(".videoWrapper").innerHTML = "";
      // console.log('document.querySelector(".videoWrapper"): ', document.querySelector(".youtube"));

      //TODO: to stop video playing and avoind that scroll position is not top. Doesnt work
      // document.querySelector(".modal-content .videoWrapper").innerHTML = "";
      if (youtubePlayer) youtubePlayer.stopVideo();

      // stop html video when closing modal. Simply stop all video:
      document.querySelectorAll('video').forEach(function(vid) {
        vid.pause();
      });
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

      // returns object with all entries of one misconception
      var currentCard = this.getters.getCard(uniqueIdFromUrl);
      this.commit("changeCard", currentCard);
    },
    showItemsInSelectedCategory(state, categoryName) {
      if (document.querySelector('.cards')) {
        var allCardsInChosenCategory = [];

        // gives error, why?
        // if (localStorage.getItem("soundOn") === "true") whoosh2.play();

        // set active category name (TODO: refactor so undefined check is not necesary. Instead the string “All” should be set on the first <a>)
        if (categoryName === undefined) {
          this.state.activeCategory = "All";

          // After clicking on a category in a card, a subselection shows. To go back, click on ‘All’. This is only visible when selection is active. This is achieved via CSS. 
          document.querySelector('.cards').classList.remove('selection');
        } else {
          this.state.activeCategory = categoryName;
          document.querySelector('.cards').classList.add('selection');
        }

        // first make the selected menu item stand out:
        // this.commit("setActiveMenuItem", categoryName);

        //TODO: this is unnecessary complicated
        function makeArray(a, b) {
          a.push({
            "id": b["Unique URL"],
            "misconception": b.Misconception,
            "category": b.Category,
            "misconceptionElaborate": b["Misconception Elaborate"],
            "Youtube Video Id": b["Youtube Video Id"],
            "Number of tweets": b["Number of tweets"],
            // ,
            // "numberOfItems": 
          });
        }

        // category === undefined runs when function is called without argument, which happens on the ajax callback. Should be the first, and not after the "||"
        // here we create the info for the cards per category page
        if (this.state.theJSON) {
          if (categoryName === undefined) {
            for (let i = 0; i < this.state.theJSON.length; i++) {
              makeArray(allCardsInChosenCategory, this.state.theJSON[i]);
            }
          } else {
            for (let i = 0; i < this.state.theJSON.length; i++) {
              if (this.state.theJSON[i].Category === categoryName) {
                makeArray(allCardsInChosenCategory, this.state.theJSON[i]);
              }
            }
          }
        }

        // copy the final array to the store
        this.state.allCardsInChosenCategory = allCardsInChosenCategory;
        //TODO: duplicate code, see addVisitedToCards()
        // setTimeout(function () {
        //   var allCards = document.querySelectorAll(".grid__item");
        //   // loop all cards and add .visited if in localStorage visited
        //   for (let i = 0; i < allCards.length; i++) {
        //     if (localStorage.getItem("visited") && localStorage.getItem("visited").indexOf(allCards[i].dataset.id) > -1) {
        //       allCards[i].classList.add("visited");
        //     }
        //   }
        // }, 1000);

        // TODO: needs more work
        if (categoryName === undefined) {
          // set URL
          // router.push("/");
        }
        if (categoryName !== undefined) {
          // set URL
          router.push("/category/" + categoryName);
        }
      }
    },
    showToast(state, a) {
      // https://stackoverflow.com/a/57448058
      this._vm.$toast.info(a);
    },
    // TODO: does not work as expected, check
    // setActiveMenuItem(item) {
    //   var selector = ".nav";
    //   var allMenuItems = document.querySelectorAll(".nav a");

    //   // first remove class .active from all elements
    //   for (let i = 0; i < allMenuItems.length; i++) {
    //     allMenuItems[i].classList.remove("active");
    //   }

    //   for (let i = 0; i < this.state.categories.length; i++) {
    //     if (item === undefined) {
    //       document.querySelector(selector + " a[data-category='All']").classList.add("active");
    //     } else
    //     if (this.state.activeCategory === this.state.categories[i].name) {
    //       document.querySelector(selector + " a[data-category='" + this.state.categories[i].name + "']").classList.add("active");
    //     }
    //   }
    // }

    setTweetedCards(state, tweetedCards) {
      state.tweetedCards = tweetedCards;
    }
  },
  actions: {
    setProspectHandles() {
      return axios.get(process.env.VUE_APP_PROSPECT_SOCIAL_MEDIA_HANDLES_CSV)
        .then(response => {
          this.state.prospectHandles = d3.csvParse(response.data);
        });
    },
  },
  modules: {}
});