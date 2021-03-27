<template>
<div id="app" class="container-fluid pl-0 pr-0">
    <!-- true and false are strings not booleans -->
    <template v-if="realTimeTweets === 'true'">
        <TwitterRealTimeConfigModal />
    </template>
    <template v-if="realTimeTweets === 'true'">
        <TwitterRealTimeInfoModal />
    </template>
    <ShortcutKeysHelp />
    <MainMenu />
    <template v-if="tour !== ''">
        <Tour></Tour>
    </template>

    <Updater />
    <!-- <slideInMenu /> -->
    <template v-if="realTimeTweets === 'true'">
        <twitterRealtime />
    </template>
    <!-- <CryptoRadio /> -->
    <router-view />
    <Person1 />
    <Person2 />
    <!-- <Person3 /> -->

    <Toasts :show-progress="false" :time-out="2500"></Toasts>

    <footer class="footer mt-auto py-2">
        <div class="container-fluid text-center" v-html="footerContent"></div>
    </footer>
    <template v-if="newsticker === 'true'">
        <NewsTicker />
    </template>
</div>
</template>

<script>
import store from "./store/store";
import publicPath from "../vue.config";
import axios from "axios";
import * as d3 from "d3-dsv";
// import slideInMenu from "@/components/slideInMenu.vue";
import twitterRealtime from "@/components/twitterRealtime.vue";
import TwitterRealTimeConfigModal from "@/components/TwitterRealTimeConfigModal.vue";
import TwitterRealTimeInfoModal from "@/components/TwitterRealTimeInfoModal.vue";
import MainMenu from "@/components/MainMenu.vue";
// import CryptoRadio from "@/components/CryptoRadio.vue";
// import * as Hammer from "hammerjs";
import NewsTicker from "@/components/NewsTicker.vue";
import Person1 from "@/components/AnimatedCharacters/Person1.vue";
import Person2 from "@/components/AnimatedCharacters/Person2.vue";
import Tour from "@/components/Tour.vue";
import Updater from "@/components/Updater.vue";

export default {
    components: {
        TwitterRealTimeConfigModal: () => import( /* webpackChunkName: "TwitterRealTimeConfigModal" */ './components/TwitterRealTimeConfigModal.vue'),
        TwitterRealTimeInfoModal: () => import( /* webpackChunkName: "TwitterRealTimeInfoModal" */ './components/TwitterRealTimeInfoModal.vue'),
        ShortcutKeysHelp: () => import( /* webpackChunkName: "ShortcutKeysHelp" */ './components/ShortcutKeysHelp.vue'),
        twitterRealtime: () => import( /* webpackChunkName: "Realtimetweets" */ './components/twitterRealtime.vue'),
        MainMenu,
        NewsTicker: () => import( /* webpackChunkName: "NewsTicker" */ './components/NewsTicker.vue'),
        Person1,
        Person2,
        Tour,
        Updater
        // slideInMenu,
        // CryptoRadio,
        // Hammer,
    },
    data: function () {
        return {
            realTimeTweets: process.env.VUE_APP_REALTIME_TWEETS,
            newsticker: process.env.VUE_APP_NEWSTICKER,
            footerContent: language.footerContent,
            tour: process.env.VUE_APP_TOUR_FILE
        }
    },
    mounted() {
        this.fetchData();
        // this.soundSetting();
        this.initSound();
        this.$store.dispatch("setProspectHandles");
        this.showKeybindingsModal();
        this.playVictory();
    },
    methods: {
        fetchData() {
            var that = this;
            var allRequests = [];

            // only fetch data
            if (this.$store.state.dataFetched === false) {

                let one = process.env.VUE_APP_CARDS_CONTENT + '?timestamp=' + new Date().getTime();
                let two = process.env.VUE_APP_CARDGAME_SCORES + '?timestamp=' + new Date().getTime();

                const requestOne = axios.get(one);
                allRequests.push(requestOne);

                let requestTwo;

                if (process.env.VUE_APP_CARDGAME_SCORES !== "") {
                    requestTwo = axios.get(two);
                } else {
                    requestTwo = ""; //empty string makes that the two requests go through even though the scores are empty
                }
                allRequests.push(requestTwo);

                // https://www.storyblok.com/tp/how-to-send-multiple-requests-using-axios
                return axios.all(allRequests).then(axios.spread((...responses) => {
                    const responseOne = responses[0]
                    const responseTwo = responses[1]

                    // use/access the results 

                    // the scores data
                    var tweetedCards = [];
                    var tweetedCardsFlat = [];

                    // only if there is something to do:
                    if (process.env.VUE_APP_CARDGAME_SCORES !== "") {
                        responseTwo.data.scores.forEach(function (entry) {
                            tweetedCards.push(entry.cardURLs);
                        })

                        // make the array flat, https://stackoverflow.com/a/10865042/9749918
                        var tweetedCardsFlat = [].concat.apply([], tweetedCards);

                        // how to change values in source array: the https://stackoverflow.com/a/12482991/9749918
                        tweetedCardsFlat.forEach(function (part, index, theArray) {

                            // remove parts of the strings
                            // remove domain name, https://stackoverflow.com/a/2599721/9749918
                            theArray[index] = theArray[index].replace(/https?:\/\/[^\/]+/i, "");

                            // remove subdirs:
                            var replace = publicPath.publicPath;
                            var re = new RegExp(replace, "i");
                            theArray[index] = theArray[index].replace(re, "");
                            var replace = publicPath.publicPath.slice(0, -1); // does not always work on local server, where the app is in the root, and remote it is not necessarily the case.

                            var re = new RegExp(replace, "i");
                            theArray[index] = theArray[index].replace(re, "");
                        });

                        // only keep URLS with 'card' in them
                        tweetedCardsFlat = tweetedCardsFlat.filter(function (e) {
                            return e.indexOf('card') > -1
                        });

                        // remove the string 'card/'
                        tweetedCardsFlat.forEach(function (part, index, theArray) {
                            var replace = "card/";
                            var re = new RegExp(replace, "i");
                            theArray[index] = theArray[index].replace(re, "");
                        });
                        // console.log('tweetedCardsFlat: ', tweetedCardsFlat);

                        // save in $store how many times has each card been tweeted
                        (function () {
                            //https://stackoverflow.com/a/5668029/9749918
                            var counts = {};
                            for (var i = 0; i < tweetedCardsFlat.length; i++) {
                                var num = tweetedCardsFlat[i];
                                counts[num] = counts[num] ? counts[num] + 1 : 1;
                            }
                            that.$store.commit("setTweetedCards", counts);
                        }());
                    }

                    // the cards data
                    var responseData = d3.csvParse(responseOne.data);
                    var responseDataTemp = [];

                    // Temporary solution: remove some columns (google sheet) / keys TODO: check if this is still necessary
                    responseData.forEach(function (v) {
                        delete v.Illustration
                    });

                    // prepare data

                    // select the stack
                    // "stack" is a column in the Google Sheet content source. It defines where a card belongs to. It works like this: if the string contains an "1", it belongs to STACK 1, if a "2" it's STACK 2, "12" means it belongs to both.
                    // TODO: move this to main.js

                    var stack = Number(process.env.VUE_APP_STACK);

                    // select only the items that are in the selected stack
                    // avoid working on a changing array by using a temp array
                    for (let i = 0; i < responseData.length; i++) {
                        if (responseData[i].Stack.indexOf(stack) > -1) {
                            responseDataTemp.push(responseData[i]);
                        }
                    }
                    // just to be sure that it's empty…:
                    responseData = [];
                    responseData.length = 0;
                    // …and fill array again:
                    responseData = responseDataTemp;
                    // and empty the temp just to be sure, probably not necessary:
                    responseDataTemp = [];
                    responseDataTemp.length = 0;
                    // now we only have items that are in the given stack

                    this.$store.state.numberofCards = responseData.length;

                    // cleaning
                    for (let i = 0; i < responseData.length; i++) {
                        for (var k in responseData[i]) {
                            if (responseData[i].hasOwnProperty(k)) {
                                // console.log("Key is " + k + ", value is: " + dataLayer1[i][k]);
                                // the csv source from google introduces \' so we remove the backslash:
                                responseData[i][k] = responseData[i][k].replace(/\\'/g, "‘");
                                //experimental:
                                responseData[i][k] = responseData[i][k].replace(/'/g, "‘");
                                // responseData[i][k] = responseData[i][k].replace(/(\n\n)/gm, "</p><p>");
                                responseData[i][k] = responseData[i][k].trim();
                                // console.log('responseData[i][k]: ', responseData[i][k]);
                            }
                        }
                    }

                    // split strings into arrays
                    for (let i = 0; i < responseData.length; i++) {
                        // format quiz data
                        responseData[i]["Quiz"] = this.prepareQuiz(responseData[i]["Quiz"]);

                        // split string on \n\n, so we can make paragraphs later, or separate links for example
                        responseData[i]["Misconception Elaborate"] = this.splitString(responseData[i]["Misconception Elaborate"], "\n\n");

                        responseData[i]["Short Answer"] = this.splitString(responseData[i]["Short Answer"], "\n\n");

                        responseData[i]["Long Answer"] = this.splitString(responseData[i]["Long Answer"], "\n\n");

                        responseData[i]["Youtube Video Description"] = this.splitString(responseData[i]["Youtube Video Description"], "\n\n");

                        // split string on ','
                        responseData[i]["Related"] = this.splitString(responseData[i]["Related"], ",");

                        // trim spaces (for example when source is: word1, word2) TODO: do this for everything
                        if (responseData[i]["Related"] !== undefined) {
                            for (let k = 0; k < responseData[i]["Related"].length; k++) {
                                responseData[i]["Related"][k] = responseData[i]["Related"][k].trim();
                            }
                        }
                    }

                    // save data to store, probably not necessary, can be done via data and props
                    // console.log('responseData: ', responseData);
                    this.$store.state.theJSON = responseData;

                    this.$store.state.theJSON.forEach(function (part, index, theArray) {
                        if (that.$store.state.tweetedCards[theArray[index]['Unique URL']] === undefined) {
                            theArray[index]['Number of tweets'] = 0;
                        } else {
                            theArray[index]['Number of tweets'] = that.$store.state.tweetedCards[theArray[index]['Unique URL']];
                        }
                    })

                    this.createCategoriesArray(this.$store.state.theJSON);

                    // create array with all columns / keys
                    for (var k in responseData[0]) {
                        if (responseData[0].hasOwnProperty(k)) {
                            this.$store.state.allKeys.push(k);
                        }
                    }

                    // create an overview of all cards. All items are generated if no argument is given, elsewhere we create an overview based on category chosen
                    this.$store.commit("showItemsInSelectedCategory");

                    this.$store.state.dataFetched = true;

                    // deal with URL. We now have an overview of all the cards. Should we show a card intro? Or a category?

                    // if there is a specific url / card param, the do following:
                    if (this.$route.params.card !== "" && this.$route.params.card !== undefined) {
                        this.$store.commit("showCardIntroFromURL", this.$route.params.card);
                    }
                    // if there is a specific url / category param, the do following:
                    if (this.$route.params.category !== "" && this.$route.params.category !== undefined) {
                        this.$store.commit("showItemsInSelectedCategory", this.$route.params.category);
                    }

                })).catch(errors => {
                    // react on errors.
                    console.log("something goes wrong fetching the data");
                })
            }
        },
        prepareQuiz(quiz) {
            var temp = [];

            function splitString(string, splitter) {
                if (string !== "") {
                    // https://stackoverflow.com/a/5963202
                    return string.split(splitter);
                }
            }

            if (quiz !== "") {
                // split quiz, make array
                quiz = splitString(quiz, "|");
                //put question in first item, first string item is always question
                temp[0] = {
                    "question": quiz[0]
                }

                // put answers in second item
                temp[1] = {
                    "answers": []
                };
                for (let i = 1; i < quiz.length - 1; i++) {
                    let isQuizItemAnswerRight = false;

                    if (quiz[i].charAt(0) === "+") {
                        isQuizItemAnswerRight = true;
                        quiz[i] = quiz[i].substr(1);
                    }

                    temp[1].answers.push([quiz[i], isQuizItemAnswerRight]);
                }
                // put explanation in third item, last string item is always answer
                temp[2] = {
                    "explanation": quiz[quiz.length - 1]
                };

                quiz = [];
                quiz = temp;
                return quiz;
            }
        },
        splitString(string, splitter) {
            if (string !== "") {
                return string.split(splitter);
            }
        },
        createCategoriesArray(theJSON) {
            // temporary store category names in array
            var categoriesArray = [];

            // https://stackoverflow.com/a/14438954
            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }

            // create array with all categories (to create a menu with all categories):
            for (var i = 0; i < theJSON.length; i++) {
                categoriesArray.push(theJSON[i].Category);
            }

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            // var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
            // remove duplicate entries
            categoriesArray = categoriesArray.filter(onlyUnique);

            // now we have an array with categories. Now create final array in the store containing object with name, and number of items in that category:
            for (let i = 0; i < categoriesArray.length; i++) {
                var counter = 0;
                for (let j = 0; j < theJSON.length; j++) {
                    if (theJSON[j].Category === categoriesArray[i]) {
                        //TODO: number of items in category is sometimes wrong
                        counter++;
                    }
                }

                this.$store.state.categories.push({
                    "name": categoriesArray[i],
                    "numberOfItems": counter
                });
            }
        },
        //TODO: change 'of' to 'off'
        // soundSetting() {
        //     // radio buttons for sound on off:
        //     var soundButton = document.querySelectorAll('input[name = "soundOnOf"]');
        //     var i;

        //     // set radio buttons with localstorage value, if any:
        //     if (localStorage.getItem("soundOnOf") !== null) {
        //         var val = localStorage.getItem("soundOnOf"); // local storage value
        //         for (i = 0; i < soundButton.length; i++) {
        //             if (soundButton[i].value === val) {
        //                 soundButton[i].checked = true; // marking the required radio as checked
        //             }
        //         }
        //     }

        //     // set soud variable based on radio buttons setting:
        //     for (i = 0; i < soundButton.length; i++) {
        //         if (soundButton[i].checked === true) {
        //             if (soundButton[i].value === "on") {
        //                 sound = true;
        //             } else {
        //                 sound = false;
        //             }
        //         }
        //     }

        //     // dealing with radio buttons user interactions:
        //     var prev = null; // not used here
        //     for (i = 0; i < soundButton.length; i++) {
        //         soundButton[i].addEventListener('change', function () {
        //             // (prev) ? console.log(prev.value): null;
        //             if (this !== prev) {
        //                 prev = this;
        //             }

        //             localStorage.setItem("soundOnOf", this.value);
        //             if (this.value === "on") {
        //                 sound = true;
        //             } else {
        //                 sound = false;
        //             }
        //         });
        //     }
        // },
        initSound() {
            var button = document.querySelector("#activateSound");

            // see index.html for declaration of vars
            alert = new Howl({
                src: [require("./assets/audio/330050__paulmorek__beep-03-single.mp4")]
            });
            go = new Howl({
                volume: 0.5,
                src: [require("./assets/audio/394477__gameloops__gamepack1-main-horrible-finish.mp4")]
            });
            whoosh2 = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/399934__waveplay__short-click-snap-perc.mp4")]
            });
            whistle = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/110390__soundscalpel-com__cartoon-siren-whistle-001.mp4")]
            });
            typewriter = new Howl({
                volume: 0.6,
                loop: true,
                src: [require("./assets/audio/331656__trollarch2__keyboard-typing.mp4")]
            });
            quizCorrectAnswer = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/29543__bennychico11__wink.mp4")]
            });
            quizWrongAnswer = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/348477__jalastram__gui-sound-effects-044.mp4")]
            });
            victory = new Howl({
                volume: 0.5,
                src: [require("./assets/audio/470083__sheyvan__music-orchestral-victory-fanfare.mp4")]
            });
            // document.querySelectorAll("a").forEach(item => item.addEventListener('click', function () {
            //     click.play()
            // }, false));
            // document.querySelectorAll("button").forEach(item => item.addEventListener('click', function () {
            //     click.play()
            // }, false));
        },
        showKeybindingsModal() {
            Mousetrap.bind(['?'], function () {
                $('#shortcutKeysHelp').modal();
                return false;
            });
        },
        playVictory() {
            Mousetrap.bind(['b t c', 'B T C'], function () {
                if (localStorage.getItem("soundOn") === "true") victory.play();
                return false;
            });
        }
    }
}
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";
// @import "~bootstrap/scss/functions";
// @import "~bootstrap/scss/variables";
// @import "~bootstrap/scss/mixins/_breakpoints";

/*! Generated by Font Squirrel (https://www.fontsquirrel.com) on October 9, 2020 */
@font-face {
    font-family: 'poppinsbold';
    src: url('./assets/fonts/poppins/bold/poppins-bold-webfont.woff2') format('woff2'),
        url('./assets/fonts/poppins/bold/poppins-bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

/*! Generated by Font Squirrel (https://www.fontsquirrel.com) on October 9, 2020 */
@font-face {
    font-family: 'poppinsmedium';
    src: url('./assets/fonts/poppins/medium/poppins-medium-webfont.woff2') format('woff2'),
        url('./assets/fonts/poppins/medium/poppins-medium-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

/*! Generated by Font Squirrel (https://www.fontsquirrel.com) on October 9, 2020 */
@font-face {
    font-family: 'poppinsregular';
    src: url('./assets/fonts/poppins/regular/poppins-regular-webfont.woff2') format('woff2'),
        url('./assets/fonts/poppins/regular/poppins-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

html {
    // https://css-tricks.com/almanac/properties/s/scroll-behavior/
    scroll-behavior: smooth;
}

body {
    font-family: poppinsregular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 0.9rem;
    min-height: 100%;
    color: $body-color;
    background-color: $body-background;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    body {
        background-image: $body-background-image;
        background-repeat: no-repeat;
        background-position: left bottom;
        background-attachment: fixed;
        background-size: 40%;
    }
}

h1,
h2,
h3,
h4,
h5,
h6 {
    text-transform: uppercase;
    font-family: poppinsbold;
}

p {
    font-size: 1.2em;
}

/*accessibility*/
.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.preview-open {
    overflow: hidden;
}

a {
    text-decoration: none;
    color: $basic3;
    outline: none;
}

a.light {
    color: #ccc;
    text-decoration: underline;
}

a:hover,
a:focus {
    color: $basic3;
    outline: none;
}

.cards a:focus {
    outline: none !important;
}

.cards a:focus h2,
a:focus {
    outline: 3px solid $basic1;
}

.nav a:focus {
    background: #666;
    outline: none;
}

.hidden {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
    pointer-events: none;
}

.border {
    border: 1px solid $borders !important;
}

// https://codepen.io/joeyhoer/pen/BmqIx
hr {
    border: 1px dashed #A3A8B7;
    width: 50%;
}

.menu hr {
    margin: 0.35em auto;
    background-image: radial-gradient(closest-side, $basic2, 100%);
}

.menu hr:after {
    background-color: $basic2;
    border: 4px solid $basic2;
    box-shadow: $shadow2;
}

/* het sluiten van de eerste popup: */
.overlay__close,
/* het sluiten van de tweede popup: */
button {
    border: none;
    color: $basic3;
    display: inline-block;
    padding: 0.5em;
    margin: 0.3em;
    transition: background 0.3s ease-in-out;
    cursor: pointer;
}

a.overlay__close:not(.overlay__close-cross):hover,
.copyURLtoClipboard:hover {
    transform: rotate(360deg);
    transition: transform 0.3s;
}

.copyURLtoClipboard:hover {
    background-size: contain;
}

.copyURLtoClipboard {
    background: transparent url(./assets/img/icons/flat/copy.svg) no-repeat center;
    background-size: contain;
    // padding: 3em 1.2em 3em 2em;
    // padding: 1.5em 0.6em 1.5em 1em;
    // padding: 0.7em;
    // margin-bottom: 1em;

    line-height: 0.7;
    width: 1.5em;
    padding: 0 !important;
    margin: 0 !important;
    z-index: auto;
    transition: transform 0.3s;
    color: transparent;
}

.modal-content .modalbox-iconbackground.related {
    text-align: center;
    display: block;
    width: 100%;
}

.modal-content .related a {
    margin: 0 0.3em 0.5em;
}

.copyURLtoClipboard.showWhatToDo {
    border-style: dashed;
    cursor: default;
    background: transparent;
    // display: block !important;
}

.copyURLtoClipboard.showWhatToDo:focus {
    outline: 0;
}

/* het sluiten van de eerste popup: */
.overlay__close:hover,
/* het sluiten van de tweede popup: */
// button:hover,
/* alle links in de tweede popup: */
// .modal-content a:hover,
/* het menu met alle categorieen */
/* het sluiten van de eerste popup: */
.overlay__close:hover {
    background-color: transparent;
    transition: background 0.3s ease-in-out;
}

/* de button voor het kopieren van tekst */
.kopieertekst {
    border: 3px solid #fff;
    background: #685D79;
    color: #222;
}

.kopieertekst:hover,
.kopieertekst:focus {
    border: 3px solid #fff;
    background: #5e5074;
}

#socialMediaTekst {
    /* background: #685D79 !important; */
    border: 3px solid #2196F3;
    color: #ccc;
    line-height: 1.6;
    font-weight: normal;
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
    min-height: 2em;
}

.card-video {
    width: 6em;
    float: left;
    margin-right: 1em;
    // display: inline-block;
}

.card-img {
    width: 10em;
    float: left;
    margin-right: 1em;
    // display: inline-block;
}

.toast-container {
    max-width: 100%;
    min-width: 250px !important;
}

.toast-header {
    background: $linear-gradient1;
}

.toast-container>div>div {
    color: $toast-content-color;
    background-color: $toast-content-background;
    box-shadow: $shadow1;
}

// the information icon is confusing since it is not clickable
.toast-icon {
    background-image: none !important;
}

// realtime tweets
.card {
    border-radius: 10px;
}

.tweet .close {
    position: absolute;
    right: 0px;
    top: 0px;
}

.tweet-stream-messages .close {
    position: absolute;
    right: -2px;
    top: -2px;
}

.tweet {
    display: none;
}

.tweet.displayBlokTweet {
    display: block;
}

.tweet-stream-info-in-stream {
    color: #111;
    font-size: 2em;
    text-align: center;
}

.tweet-stream-info-in-stream.hidden {
    display: none;
}

.tweet-stream-messages {
    background: linear-gradient(to right, #5C34A7, #2376D6);
    border-radius: 10px;
    color: $basic1;
    padding: 1em;
    width: 100%;
    margin: 0 0 1em;
    text-align: center;
}

.tweet-stream-messages h2 {
    font-size: 1.5em;
    margin-bottom: 0;
}

.tweet-stream-messages ul {
    margin-bottom: 0;
    list-style-type: none;
    padding-left: 0;
}

// .select-tweet,
.go-to-tweet {
    background: linear-gradient(to right, #5C34A7, #2376D6);
}

.tweets-selected .select-tweet {
    display: none;
}

.tweets-realtime .tweet-instruction {
    display: none;
}

.card.handpicked {
    background-color: rgb(250, 239, 202) !important;
}

.handpickedTweetIndication {
    position: absolute;
    top: 10px;
    right: 10px;
}

footer {
    background: $page-footer-background;
    color: $page-footer-color;
    width: 100%;
    box-shadow: $shadow1;
}

.tweet small {
    font-size: 1.1em;
}

.handpicked-tweet-text small {
    background: rgb(247, 229, 130);
}

.realtime-tweet-text small {
    background: rgb(247, 229, 130);
}

.oldTweet {
    background: rgb(250, 239, 202);
}

// SEARCH
.hideSearchResult {
    margin: 0 !important;
    display: none !important;
    visibility: hidden;
    height: 0;
    line-height: 0;
    padding: 0;
}

.search-results-container>a {
    text-decoration: none;
}

.search-results-container em {
    background: rgba(240, 224, 131, 0.904);
    color: #222;
    font-style: normal;
    padding-left: 0.3em;
    padding-right: 0.3em;
    border-radius: 10px;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    footer {
        position: fixed;
        bottom: 0;
        left: 0;
    }
}

// TODO: make this selection les complicated
.cards,
.search-results-container,
.masonry-with-columns {

    a {
        color: $basic1;
    }

    .category.Architecture,
    .nav-item.Architecture a {
        background: #148868;
    }

    .category.Crime,
    .nav-item.Crime a {
        background: #7C2929;
    }

    .category.Use,
    .nav-item.Use a {
        background: #3E2D2D;
    }

    .category.Environment,
    .nav-item.Environment a {
        background: #7B610E;
    }

    .category.Media,
    .nav-item.Media a {
        background: #5D3D50;
    }

    .category.Beliefs,
    .nav-item.Beliefs a {
        background: #6C297C;
    }

    .category.Skills,
    .nav-item.Skills a {
        background: #535353;
    }

    .category.Control,
    .nav-item.Control a {
        background: #294F7C;
    }

    .category.Existential,
    .nav-item.Existential a {
        background: #1B7B76;
    }

    .category.Legal,
    .nav-item.Legal a {
        background: #40672C;
    }

    .category.Price,
    .nav-item.Price a {
        background: #3D515D;
    }

    .category.Society,
    .nav-item.Society a {
        background: #061545;
    }

    .category.Supply,
    .nav-item.Supply a {
        background: #063333;
    }
}

// QUIZ
.nummering,
.nummering2 {
    font-size: 1em;
    line-height: 0.5em;
    margin-bottom: 3em;
    text-align: center;
}

.nummering span,
.nummering2 span {
    border-radius: 50%;
    /* = 15%, almost gives us viewport width unit (15vw) */
    text-align: center;
    /* this way we should have 1px gap between circles */
    /* margin: 35px .5px; */
    margin: 1em auto 0.5em;
    // background: $numbering-background;
    // color: $numbering-text;

    display: block;
    /* circle to the middle, so that... [1] */

    /* to use viewport based units we can safely override the old units in this way */
    /* padding-bottom: 0vw;
    font-size: 5vw;
    line-height: 7vw;
    width: 7vw;
    height: 7vw; */

    padding-bottom: 0;
    font-size: 2em;
    line-height: 2em;
    width: 2em;
    height: 2em;
}

.nummering+h3 {
    text-align: center;
}

// END QUIZ

// ABOUT PAGE
.about {

    h1,
    h2,
    h3 {
        font-size: 1.2rem;
    }

    p {
        font-size: 0.98em;
    }

    a {
        color: $basic1;
    }

    .card {
        border: $card-intro-border;
        background: transparent;
        border-radius: 15px;
    }

}

// END ABOUT PAGE

// QUIZ
@import "./assets/css/quiz/korQuiz.02.css";
@import "./assets/css/quiz/instelbareStaafdiagrammen.02.css";
@import "./assets/css/quiz/staafDiagrammen.01.scss";
@import "./assets/css/quiz/multiplechoice.01.css";
@import "./assets/css/quiz/skin7.01.scss";
// END QUIZ

// SCORES
.allTweetsOfUser {
    font-size: 0.7em;
    color: #555;
    // background: rgb(191, 207, 241);
}

.allTweetsOfUser a {
    color: $basic1;
}

#app>section>div>div>div>div.col-lg-12.col-md-12.col-sm-12.m-0.p-0.pr-1>div>div.card-body>table>tr>td>div>div>p>img {
    width: 20px !important;
}

// END SCORES

// CONFETTI
#confetti-canvas {
    z-index: 1021;
}

/*
 *  BEGIN NEWS TICKER
 */
.news-ticker-container {
    position: fixed;
    bottom: 0;
    right: 0;
    /*om te overrulen, als je hem buiten de div plaatst, zodat het een section > div is*/
    // left: auto;
    /*om te overrulen, als je hem buiten de div plaatst, zodat het een section > div is*/
    padding: 0;
    /*om te overrulen, als je hem buiten de div plaatst, zodat het een section > div is*/
    margin: 0;
    height: auto !important;
    transform: translateX(100%);
    /* default speed, override via inline style, depending on text length */
    animation-duration: 25s;
    animation-timing-function: linear;
    animation-iteration-count: 30;
    pointer-events: none;
    visibility: visible;
    opacity: 1;
}

/*main .present .news-ticker-container, */
/*alleen als slide actief is, loopt de animatie*/
.news-ticker-container {
    /*deze is voor als ie niet binnen de main staat en dus altijd te zien is*/
    animation-name: news-ticker;
}

.news-ticker-container p {
    white-space: nowrap;
    margin: 0 1em;
}

.news-ticker-container p span {
    background: linear-gradient(to right, #5C34A7, #2376D6);
    color: $basic1;
    padding: 0 2em;
    // display: block;

}

.news-ticker-container img {
    vertical-align: baseline;
}

@keyframes news-ticker {
    0% {
        right: 0;
        transform: translate3d(100%, 0, 0);
    }

    100% {
        right: 100%;
        transform: translate3d(0, 0, 0);
    }
}

.news-ticker-container p {
    line-height: 1;
}

@media only screen and (max-width: 961px) {
    .news-ticker p {
        line-height: 1;
    }
}

/*
 *  END NEWS TICKER
 */

/*
 *  BEGIN ATTENTION SEEKER TWEETS IN TWEATSTREAM
 */

.tweets-realtime .tweet:nth-child(-n+5) {
    transition: background-color 0.7s ease-in-out;
}

.tweets-realtime .tweet.attention-seeker:nth-child(-n+5) {
    background: #1EA1F1;
    transition: background-color 0.3s ease-in-out;
}

/*
 *  END ATTENTION SEEKER TWEETS IN TWEATSTREAM
 */
</style>
