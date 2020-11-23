<template>
<div class="cards">
    <div class="row">
        <!-- TITLE AND SUBTITLE -->
        <div class="col-8">
            <h1 class="mb-0">
                <ICountUp :delay="ICountUpDelay" :endVal="$store.state.numberofCards" :options="ICountUpOptions" />
                <span class="game-title-1">
                    {{this.$store.state.gameTitle}}
                </span>
                <span class="game-title-2">
                    {{this.$store.state.gameTitle2}}
                </span>
            </h1>
        </div>

        <!-- FILTER -->
        <div class="col-4 text-right">
            <div class="btn-group">
                <button type="button" class="btn btn-primary dropdown-toggle button-categories mt-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter
                </button>
                <div style="z-index: 1021;" class="dropdown-menu dropdown-menu-right dropdown-menu-categories">
                    <ul class="nav nav-pills pt-0 mx-auto justify-content-center">
                        <!-- All = All categories at once -->
                        <li class="nav-item ">
                            <a class="nav-link p-1 All" @click="showAllCategories" data-category="All">All</a>
                        </li>

                        <!-- Every category in a menu item -->
                        <li class="nav-item" :class="category.name" v-for="category in $store.state.categories" :key="category.name">
                            <a class="nav-link p-1" @click="$store.commit('showItemsInSelectedCategory',category.name)" :data-category="category.name">
                                {{ category.name }}
                                ({{ category.numberOfItems }})
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-md-12">
            <p class="mt-0">{{this.$store.state.gameSubTitle}}
                <template v-if="appId === 'btc'">
                    <GameInstructionsCarousel />
                </template>
            </p>

        </div>
    </div>

    <!-- <h1 class="pt-5">{{this.$store.state.topScorer}} Poster of the week</h1> -->

    <!-- CATEGORY NAME AND COPY BUTTON WHEN IN CATEGORY -->
    <div v-if="(this.$store.state.activeCategory !== 'All')">
        <h3 class="text-center">
            {{this.$store.state.activeCategory}} <button class="copyURLtoClipboard copyURLtoClipboard5 " style="height: 1em;vertical-align: top;" title="Copy Link">Copy Link</button>
        </h3>
    </div>

    <div v-else>
        <!-- <h3 v-if="(this.$store.state.gameId === 'btc')" class="game-instructions text-center">
            <span>1</span> Find A Tweet <span>2</span> Find A Card <span>3</span> Reply With Card
        </h3> -->
    </div>

    <!-- THE CARDS -->
    <div class="card-columns">
        <div v-if="this.$store.state.gameId === 'btc'" class="card  mb-4 p-0" style="background: transparent;">
            <div class="card-body p-0 justify-content-center align-items-center d-flex">
                <video class="p-1" style="max-width: 55%;max-height: 100%;border-radius: 10px;" src="@/assets/video/instructions.mp4" muted autoplay controls playsinline></video>
            </div>
            <div class="card-footer" style="min-height: 3em;background: #1D2448; text-align: left;">
            </div>
        </div>

        <div v-for="item in $store.state.allCardsInChosenCategory" :key="item.prejudice" class="card mb-4 p-0">
            <div class="card-body p-0 align-items-center d-flex">
                <a :data-id="item['id']" :key="item.prejudice" @click="showCardIntro" class="p-1">
                    <h2 class=""><span class="quote">“</span>{{ item.prejudice }}<span class="quote">”</span></h2>
                </a>
            </div>
            <div class="card-footer" style="min-height: 3em;background: #1D2448; text-align: left;">
                <a @click="$store.commit('showItemsInSelectedCategory',item.category)" class="category" :class="item.category" style="text-transform: uppercase;color: #eee;text-align: left;display: inline-block;font-size: 1em; padding: 0.2em; margin: 0.5em 0 ;">{{ item.category }}</a>

                <!-- Show all cards: -->
                <a style="color: #eee;" class="p-1 category-all-shown-in-cards" @click="showAllCategories" data-category="All">All</a>

                <!-- check allCardsInChosenCategory in store for what is in array, this should be made easier -->
                <button :data-prejudice="item.prejudice" :data-url="item.id" class="copyURLtoClipboard copyURLtoClipboard4 float-right" title="Copy Link">Copy Link</button>

                <!-- Sharingbutton Twitter -->
                <a class="resp-sharing-button__link float-right mr-2" :href="'https://twitter.com/intent/tweet/?text=' + item.prejudice + '&amp;url=' + windowLocationOrigin + publicPath + 'card/' + item.id" target="_blank" rel="noopener" aria-label=""><span class="visuallyhidden">Post on Twitter</span>
                    <img src="../assets/img/icons/social-media-buttons/twitter.svg" alt="twitter logo" />
                </a>

                <!-- Sharingbutton LinkedIn -->
                <a class="resp-sharing-button__link float-right mr-2" :href="'https://www.linkedin.com/shareArticle?mini=true&amp;url=' + windowLocationOrigin + publicPath + 'card/' + item.id + '&amp;title=' + item.prejudice + '&amp;summary=' + item.prejudice + '&amp;source=' + windowLocationOrigin + publicPath + 'card/' + item.id" target="_blank" rel="noopener" aria-label=""><span class="visuallyhidden">Post on LinkedIn</span>
                    <img src="../assets/img/icons/social-media-buttons/linked-in.svg" alt="linkedin logo" />
                </a>
            </div>
        </div>
    </div>

    <NewsTicker />
    <!-- <SoundToggle /> -->
    <!-- </transition> -->

</div>
</template>

<script>
// import NewsTicker from "@/components/NewsTicker.vue";
// import Search from "@/components/Search.vue";
import SoundToggle from "@/components/SoundToggle.vue";
import ICountUp from 'vue-countup-v2';
// import BitcoinAnimation from "@/components/BitcoinAnimation.vue";
import publicPath from "../../vue.config";
import GameInstructionsCarousel from "./GameInstructionsCarousel.vue";

export default {
    name: "Index",
    components: {
        // Search,
        // NewsTicker,
        SoundToggle,
        ICountUp,
        GameInstructionsCarousel
        // ,BitcoinAnimation
        // VueFuse
    },
    props: {
        msg: String,
        categories: Array
    },
    data() {
        return {
            // pickedItems: [],
            ICountUpDelay: 2000, //msec
            ICountUpOptions: {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                duration: 4 //sec
            },
            publicPath: publicPath.publicPath,
            windowLocationOrigin: window.location.origin,
            appId: process.env.VUE_APP_ID
        }
    },
    mounted() {
        this.addVisitedToCards();
        // this.selectPickedItems();
    },
    methods: {
        // selectPickedItems() {
        //     console.log("lapm");
        //     console.log(this.$store.state.allCardsInChosenCategory);
        //     for (let i = 0; i < this.$store.state.allCardsInChosenCategory.length; i++) {
        //         console.log($store.state.allCardsInChosenCategory[i]);

        //     }

        // },
        showAllCategories() {
            this.$store.commit('showItemsInSelectedCategory');
            this.$router.push("/");
        },
        addVisitedToCards() {
            //TODO: duplicate code, see addVisitedToCards()
            setTimeout(function () {
                var allCards = document.querySelectorAll(".grid__item");
                // loop all cards and add .visited if in localStorage visited
                for (let i = 0; i < allCards.length; i++) {
                    if (localStorage.getItem("visited") && localStorage.getItem("visited").indexOf(allCards[i].dataset.id) > -1) {
                        allCards[i].classList.add("visited");
                    }
                }
            }, 1000);
        },
        startElectricitySound(e) {
            if (e.target.closest("a").classList.contains("visited")) {
                if (localStorage.getItem("soundOn") === "true") {
                    electricity.play();
                    setTimeout(function () {
                        electricity.stop()
                    }, 1000);
                }
            }
        },
        // stopElectricitySound(e) {
        //     if (e.target.closest("a").classList.contains("visited")) {
        //         if (localStorage.getItem("soundOn") === "true") electricity.stop();
        //     }
        // },
        showCardIntro(event) {
            // console.log('this.$store.state.currentCard["Youtube Video Id"]: ', this.$store.state.currentCard["Youtube Video Id"]);
            // event.target.closest("a").classList.add("visited");

            // https://stackoverflow.com/a/7680123
            // localStorage can only be string
            function appendToLocalStorage(name, data) {
                var old = localStorage.getItem(name);

                // create if not existing
                if (old === null) old = "";

                // only add if it is not already in the string
                if (old.indexOf(data) === -1) localStorage.setItem(name, old + data + " ");
            }

            // deal with CSS to open and close
            this.$store.commit("changeCssClassCardIntroState", "open");
            this.$store.commit("changeCssClassCardOverviewState", "overlay-fullscreen-open");

            // returns object with all entries of one prejudice
            var currentCard = this.$store.getters.getCard(event.target.closest("a").dataset.id);

            this.$store.commit("changeCard", currentCard);

            // set URl to the item that was clicked
            // catch error: https://stackoverflow.com/a/58747480
            // this.$router.push("/card/" + currentCard["Unique URL"]).catch(err => {});
            this.$router.push("/card/" + currentCard["Unique URL"]);

            if (localStorage.getItem("soundOn") === "true") whoosh2.play();

            // add current card url to visited in localStorage
            appendToLocalStorage("visited", this.$store.state.currentCard["Unique URL"]);

            this.addVisitedToCards();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
// https://www.dev-tips-and-tricks.com/use-bootstrap-4-media-query-mixins
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/_breakpoints";

.cards {
    padding-top: 30px;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .cards {
        padding-top: 50px;
    }
}

// https://css-tricks.com/how-do-you-do-max-font-size-in-css/
h1 {
    font-size: 20px;
}

h1 {
    font-weight: normal;
}

.game-title-1 {
    font-family: poppinsbold;
}

.game-title-2 {
    font-family: poppinsregular;
}

.game-instructions {
    text-transform: none;
    font-size: 1.1em;
    margin-bottom: 2em;
}

.button-categories {
    background: #5965F9;
    border: none;
}

.dropdown-menu-categories {
    background: #5965FA;
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 1);
    padding: 0.2em;
    font-size: 0.9em;
}

.dropdown-menu-categories a {
    font-family: poppinsbold;
    border: 1px solid #333;
    margin: 0.3em;
    cursor: pointer;
}

.dropdown-menu-categories a:hover {
    background: #323A66;
    color: #eee;
}

@media screen and (min-width: 320px) {
    h1 {
        font-size: calc(20px + 6 * ((100vw - 320px) / 680));
    }
}

@media screen and (min-width: 1000px) {
    h1 {
        font-size: 40px;
    }
}

// https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/
.card-columns {
    @include media-breakpoint-only(lg) {
        column-count: 4;
    }

    @include media-breakpoint-only(xl) {
        column-count: 5;
    }

    >.card {
        border: none;
        cursor: pointer;
        background-image: url(../assets/img/icons/flat/bitcoin.svg), linear-gradient(#272f52, #3a4275);
        background-repeat: repeat, no-repeat;
        background-size: 25px 25px, 100% 100%;
        background-position: center center, center center;
        text-align: center;
        font-variant: small-caps;
        border-radius: 10px;
        color: $_text1;
        display: inline-block;
        width: 100%;

        h2,
        h3 {
            color: $_text1;
            font-size: 1.1em;
            margin: 0.5em;
        }

        .card-footer {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 0 0.5em 0 0.5em;

        }
        .card-body {
            min-height: 10em;
        }
    }

    .category {
        border-radius: 4px;
        background: #1D807D;
        margin: 0.8em;
    }

}

.nav-item a {
    color: #eee;
}

.nav-item a.All {
    background: #eee;
    color: #111;
}

// Show All button only if in selection
.category-all-shown-in-cards {
    display: none;
}

div.cards.selection .category-all-shown-in-cards {
    display: inline;
}

.resp-sharing-button__link img {
    width: 20px;
    margin-top: 0.8em;
}

.resp-sharing-button__link,
.copyURLtoClipboard4 {
    opacity: 0.5;
}

.resp-sharing-button__link:hover,
.copyURLtoClipboard4:hover {
    opacity: 1;
}
</style>
