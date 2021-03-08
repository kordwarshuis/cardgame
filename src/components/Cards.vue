<template>
<div class="cards pl-sm-5 pr-sm-5">
    <!-- margins should be set to 0: -->
    <div class="row m-0">
        <!-- TITLE AND SUBTITLE -->
        <div class="col-8">
            <h1 class="mb-0 title">
                <ICountUp :delay="ICountUpDelay" :endVal="$store.state.numberofCards" :options="ICountUpOptions" />
                <span class="game-title-1"> {{this.$store.state.gameTitle}}</span>
                <span class="game-title-2">{{this.$store.state.gameTitle2}}</span>
            </h1>
        </div>

        <!-- FILTER -->
        <div class="col-4 text-right">
            <div class="btn-group">
                <button type="button" class="btn btn-primary dropdown-toggle button-categories mt-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Filter
                </button>
                <div style="z-index: 1021;" class="dropdown-menu dropdown-menu-right dropdown-menu-categories">
                    <ul class="nav nav-pills pt-0 mx-auto ">
                        <!-- All = All categories at once -->
                        <li class="nav-item ">
                            <a class="nav-link p-1 All" @click="showAllCategories" data-category="All">All</a>
                        </li>

                        <!-- Every category in a menu item -->
                        <li class="nav-item" :class="category.name" v-for="category in $store.state.categories" :key="category.name">
                            <a class="nav-link p-1" @click="$store.commit('showItemsInSelectedCategory',category.name)" :data-category="category.name">
                                {{ category.name }}
                                <!-- ({{ category.numberOfItems }}) -->
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-md-12">
            <p class="mt-0 subtitle">{{this.$store.state.gameSubTitle}}
                <template v-if="realtimeTweets === 'true'">
                    <GameInstructionsCarousel />
                </template>
            </p>

        </div>
    </div>

    <!-- <h1 class="pt-5">{{this.$store.state.topScorer}} Poster of the week</h1> -->

    <!-- CATEGORY NAME AND COPY BUTTON WHEN IN CATEGORY -->
    <div v-if="(this.$store.state.activeCategory !== 'All')">
        <h3 class="text-center">
            {{this.$store.state.activeCategory}} <button class="copyURLtoClipboard copyURLtoClipboardCardFromAddressBar " style="height: 1em;vertical-align: top;" title="Copy Link">Copy Link</button>
        </h3>
    </div>

    <!-- HOMEPAGE-ILLUSTRATIONS -->
    <div v-if="homepageIllustrationsCarousel !== ''" class="row m-0">
        <div class="col-md-12 p-0">
            <div class="card mb-4 p-0 text-center" style="background: transparent;">
                <div style="z-index: 0;" id="illustrations-caroussel" class="card-body p-0 justify-content-center align-items-center d-flex carousel slide carousel-fade" data-ride="carousel">
                    <div class="carousel-inner">
                        <div data-interval="5000" v-for="(img, index) in homepageIllustrations" :key="img" class="carousel-item" :class="{ 'active': index === 0 }">
                            <a :data-id="homepageIllustrationsUniqueUrl[index]">
                                <img @click="showCardIntro" style="cursor: pointer;width: 100%; max-width: 50em; border-radius: 10px;" :src="img" alt="">
                            </a>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#illustrations-caroussel" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#illustrations-caroussel" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="card-footer">
                </div>
            </div>
        </div>
    </div>

    <div class="card-columns mb-5">
        <!-- HOMEPAGEVIDEO -->
        <div v-if="homepageVideo === 'true'" class="card mb-4 p-0">
            <div class="card-body p-0 justify-content-center align-items-center d-flex">
                <div class="video-wrapper">
                    <video id="video-homepage" :src="homepageVideoPathToVideo" :poster="homepageVideoPathToPoster" muted controls playsinline preload="none"></video>
                </div>
            </div>
            <div class="card-footer">
            </div>
        </div>

        <!-- THE CARDS -->
        <div v-for="(item, index) in setAllCards" :key="item.misconception" class="card mb-4 p-0" :id="'card' + index">
            <div class="card-body p-0 align-items-center d-flex">
                <a :data-id="item['id']" :key="item.misconception" @click="showCardIntro" class="p-1">
                    <h2 class="">
                        <!-- <span class="quote">“</span> -->
                        {{ item.misconception }}
                        <!-- <span class="quote">”</span> -->
                    </h2>
                </a>
                <p v-if='realtimeTweets === "true"' class="times-tweeted" :title="'This card has been tweeted ' + item['Number of tweets'] + ' times'"><img class="twitter-logo" src="../assets/img/icons/social-media-buttons/twitter.svg" alt="twitter logo" />{{item['Number of tweets']}}</p>
            </div>
            <div class="card-footer">
                <a @click="$store.commit('showItemsInSelectedCategory',item.category)" class="category" :class="item.category" style="color: $card-footer-link-color; text-align: left;display: inline-block;font-size: 1em; padding: 0.2em 0.4em; margin: 0.5em 0 ;">{{ item.category }}</a>

                <!-- Show all cards: -->
                <a style="color: $card-footer-link-color;" class="p-1 category-all-shown-in-cards" @click="showAllCategories" data-category="All">All</a>

                <!-- check allCardsInChosenCategory in store for what is in array, this should be made easier -->
                <button :data-misconception="item.misconception" :data-url="item.id" class="copyURLtoClipboard copyURLtoClipboardCardOverview float-right" title="Copy Link">Copy Link</button>

                <!-- Sharingbutton Twitter -->
                <a class="resp-sharing-button__link float-right mr-2" :href="'https://twitter.com/intent/tweet/?text=' + item.misconception + '&amp;url=' + windowLocationOrigin + publicPath + 'card/' + item.id" target="_blank" rel="noopener" aria-label=""><span class="visuallyhidden">Post on Twitter</span>
                    <img src="../assets/img/icons/social-media-buttons/twitter.svg" alt="twitter logo" />
                </a>

                <!-- Sharingbutton LinkedIn -->
                <a class="resp-sharing-button__link float-right mr-2" :href="'https://www.linkedin.com/shareArticle?mini=true&amp;url=' + windowLocationOrigin + publicPath + 'card/' + item.id + '&amp;title=' + item.misconception + '&amp;summary=' + item.misconception + '&amp;source=' + windowLocationOrigin + publicPath + 'card/' + item.id" target="_blank" rel="noopener" aria-label=""><span class="visuallyhidden">Post on LinkedIn</span>
                    <img src="../assets/img/icons/social-media-buttons/linked-in.svg" alt="linkedin logo" />
                </a>
            </div>
        </div>
        <button class="btn btn-primary cards-show-all display-none" @click="showAllCards">{{showAllCardsButtonText}}</button>
    </div>
    <button @click="startTourBis" class="btn  btn-light btn-sm tour-start-bis mb-5">Start tour</button>
</div>
</template>

<script>
import SoundToggle from "@/components/SoundToggle.vue";
import ICountUp from 'vue-countup-v2';
import publicPath from "../../vue.config";
import GameInstructionsCarousel from "./GameInstructionsCarousel.vue";
import store from "../store/store";
import axios from "axios";

export default {
    name: "Index",
    components: {
        SoundToggle,
        ICountUp,
        GameInstructionsCarousel
    },
    props: {
        msg: String,
        categories: Array
    },
    data() {
        return {
            // pickedItems: [],
            allCards: [],
            cardsInitiallyShown: 0,
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
            appId: process.env.VUE_APP_ID,
            realtimeTweets: process.env.VUE_APP_REALTIME_TWEETS, // if realtime tweets is on then scores page makes sense. Note: True is not a boolean but a string
            homepageVideo: process.env.VUE_APP_HOMEPAGE_VIDEO,
            homepageIllustrations: [],
            homepageIllustrationsUniqueUrl: [],
            homepageVideoPathToVideo: process.env.VUE_APP_HOMEPAGE_VIDEO_PATH_TO_VIDEO,
            homepageVideoPathToPoster: process.env.VUE_APP_HOMEPAGE_VIDEO_PATH_TO_POSTER_IMAGE,
            realtimeTweets: process.env.VUE_APP_REALTIME_TWEETS,
            homepageIllustrationsCarousel: process.env.VUE_APP_HOMEPAGE_ILLUSTRATIONS_CAROUSEL,
            showAllCardsButtonText: language.showAllCards
        }
    },
    mounted() {
        // delay in starting video
        setTimeout(function () {
            var videoHomepage = document.querySelector('#video-homepage');
            if (videoHomepage) {
                videoHomepage.play();
            }
        }, 7000);
        this.setCardsInitiallyShown();
        this.getIllustrations();
    },
    computed: {
        setAllCards() {
            this.createCardsShown();
            return this.allCards;
        }
    },
    methods: {
        startTourBis() {
            this.$tours['myTour'].start();
        },
        grabFilenameFromURL() {
            // the filename is the only source we have for creating the unique Url.
            this.homepageIllustrations.forEach((element, index) => {
                // strip the filename
                // remove everthing before the last slash and after the last dot
                this.homepageIllustrationsUniqueUrl[index] = element.substring(element.lastIndexOf("/") + 1, element.lastIndexOf("."));
                // remove everything after "-text"
                this.homepageIllustrationsUniqueUrl[index] = this.homepageIllustrationsUniqueUrl[index].substring(0, this.homepageIllustrationsUniqueUrl[index].lastIndexOf("-text"));
            });
        },
        getIllustrations() {
            let one = this.homepageIllustrationsCarousel;
            const requestOne = axios.get(one);

            // https://www.storyblok.com/tp/how-to-send-multiple-requests-using-axios
            return axios.all([requestOne]).then(axios.spread((...responses) => {
                var responseOne = responses[0];

                // only images with '-text' in the name
                function checker(value) {
                    var obligatory = ['-text'];
                    return obligatory.every(function (v) {
                        return value.indexOf(v) !== -1;
                    });
                }

                function shuffle(array) {
                    var currentIndex = array.length,
                        temporaryValue, randomIndex;

                    // While there remain elements to shuffle...
                    while (0 !== currentIndex) {

                        // Pick a remaining element...
                        randomIndex = Math.floor(Math.random() * currentIndex);
                        currentIndex -= 1;

                        // And swap it with the current element.
                        temporaryValue = array[currentIndex];
                        array[currentIndex] = array[randomIndex];
                        array[randomIndex] = temporaryValue;
                    }

                    return array;
                }

                responseOne = responseOne.data;
                responseOne = responseOne.filter(checker);
                responseOne = shuffle(responseOne);
                this.homepageIllustrations = responseOne;
                this.grabFilenameFromURL();
            })).catch(errors => {
                // react on errors.
                console.log('errors: ', errors);
                console.log("something goes wrong fetching the data");
            })

        },
        setCardsInitiallyShown() {
            if (process.env.VUE_APP_MAX_CARDS_HOMEPAGE !== "") {
                // set the number of cards to be shown
                this.cardsInitiallyShown = parseInt(process.env.VUE_APP_MAX_CARDS_HOMEPAGE, 10);
            } // else we do not set this
        },
        createCardsShown() {
            this.allCards = JSON.parse(JSON.stringify(this.$store.state.allCardsInChosenCategory));

            // if the number of cards to be shown is set then chop aray
            if (process.env.VUE_APP_MAX_CARDS_HOMEPAGE !== "") {
                this.allCards.splice(this.cardsInitiallyShown);
                // if number of cards to be shown is less than total then show “show all” button
                if (this.cardsInitiallyShown < this.$store.state.allCardsInChosenCategory.length) {
                    // show the button that shows all cards
                    this.buttonShowAllCards().show();
                }
            } // else leave array as is
        },
        buttonShowAllCards() {
            var button = document.querySelector('.cards-show-all');

            function showButton() {
                if (button) {
                    button.classList.remove('display-none');
                }
            }

            function hideButton() {
                if (button) {
                    button.classList.add('display-none');
                }
            }

            return {
                show: showButton,
                hide: hideButton
            }
        },
        showAllCards() {
            this.cardsInitiallyShown = this.$store.state.allCardsInChosenCategory.length;
            this.createCardsShown();
            this.buttonShowAllCards().hide();
        },
        showAllCategories() {
            this.$store.commit('showItemsInSelectedCategory');
            this.$router.push("/");
        },
        // addVisitedToCards() {
        //     //TODO: duplicate code, see addVisitedToCards()
        //     setTimeout(function () {
        //         var allCards = document.querySelectorAll(".card");
        //         // loop all cards and add .visited if in localStorage visited
        //         // for (let i = 0; i < allCards.length; i++) {
        //         //     if (localStorage.getItem("visited") && localStorage.getItem("visited").indexOf(allCards[i].dataset.id) > -1) {
        //         //         allCards[i].classList.add("visited");
        //         //     }
        //         // }
        //     }, 1000);
        // },
        // startElectricitySound(e) {
        //     if (e.target.closest("a").classList.contains("visited")) {
        //         if (localStorage.getItem("soundOn") === "true") {
        //             electricity.play();
        //             setTimeout(function () {
        //                 electricity.stop()
        //             }, 1000);
        //         }
        //     }
        // },
        // stopElectricitySound(e) {
        //     if (e.target.closest("a").classList.contains("visited")) {
        //         if (localStorage.getItem("soundOn") === "true") electricity.stop();
        //     }
        // },
        showCardIntro(event) {
            // event.target.closest(".card").classList.add("visited");
            // console.log('event.target.closest(".card"): ', event.target.closest(".card"));

            // // https://stackoverflow.com/a/7680123
            // // localStorage can only be string
            // function appendToLocalStorage(name, data) {
            //     var old = localStorage.getItem(name);

            //     // create if not existing
            //     if (old === null) old = "";

            //     // only add if it is not already in the string
            //     if (old.indexOf(data) === -1) localStorage.setItem(name, old + data + " ");
            //     console.log(localStorage.getItem("visited"));
            // }

            // // add current card url to visited in localStorage
            // appendToLocalStorage("visited", this.$store.state.currentCard["Unique URL"]);

            // this.addVisitedToCards();

            // deal with CSS to open and close
            this.$store.commit("changeCssClassCardIntroState", "open");
            this.$store.commit("changeCssClassCardOverviewState", "overlay-fullscreen-open");

            // returns object with all entries of one misconception
            var currentCard = this.$store.getters.getCard(event.target.closest("a").dataset.id);

            this.$store.commit("changeCard", currentCard);

            // set URl to the item that was clicked
            // catch error: https://stackoverflow.com/a/58747480
            // this.$router.push("/card/" + currentCard["Unique URL"]).catch(err => {});
            this.$router.push("/card/" + currentCard["Unique URL"]);

            if (localStorage.getItem("soundOn") === "true") whoosh2.play();
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

.display-none {
    display: none;
}

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
h1.title {
    color: $game-title;
    font-size: 20px;
}

h1 {
    font-weight: normal;
}

p.subtitle {
    color: $game-subtitle;

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
    color: $button-categories-color;
    background: $button-categories-background;
    border: none;
}

.button-categories:hover,
.button-categories:focus,
.button-categories:active {
    background: $button-categories-background-hover !important;
}

.dropdown-menu-categories {
    background: $button-categories-background;
    box-shadow: $shadow1;
    padding: 0.2em;
    font-size: 0.9em;
}

.dropdown-menu-categories a {
    font-family: poppinsbold;
    margin: 0.3em;
    cursor: pointer;
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
        background-repeat: repeat, no-repeat;
        background-size: 25px 25px, 100% 100%;
        background-position: center center, center center;
        text-align: center;
        border-radius: 10px;
        color: $card-overview-text;
        display: inline-block;
        width: 100%;

        h2 {
            line-height: 1.7;
            font-family: poppinsregular;
        }

        h2 {
            color: $card-overview-text;
            font-size: 1.1em;
            margin: 0.5em;
        }

        .card-footer {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 0 0.5em 0 0.5em;
            min-height: 3em;
            background: $card-footer-background;
            text-align: left;
        }

        .card-body {
            a {
                width: 100%;
            }

            min-height: 10em;
        }
    }

    // >.card:nth-child(n + #{$cards-initially-shown + 1}) {
    //     display: none;
    // }

    .category {
        border-radius: 4px;
        color: $category-color;
        background: $category-background;
        margin: 0.8em;
    }

}

.times-tweeted {
    font-size: 0.8em;
}

.twitter-logo {
    width: 12px;
}

.nav-item a {
    background: $category-menu-item-background;
    color: $category-menu-item-color;

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
.copyURLtoClipboardCardOverview {
    opacity: 0.5;
}

.resp-sharing-button__link:hover,
.copyURLtoClipboardCardOverview:hover {
    opacity: 1;
}

.video-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    transform: translateX(-50%) translateY(-50%);
}

.video-wrapper video {
    width: 100%;
    border-radius: 10px;
}
</style>
