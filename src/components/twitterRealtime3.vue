<template>
<div id="slide-menu-and-buttons-wrapper">
    <div class="slide-menu-wrapper">
        <div class="twitter-open-close-handle"></div>
        <div class="content container-fluid pt-0">
            <!-- BEGIN own content -->
            <div class="tweets-container row m-0 p-0">
                <h1 class="visuallyhidden">Tweets</h1>
                <!-- <button class="button-open-close-tweets-container"><span class="visuallyhidden">Open / close tweetstream</span></button> -->

                <!-- REALTIME TWEETS -->
                <div class="tweets-realtime col-md-12 m-0 p-0" style="padding-bottom: 10em !important;">
                    <nav class="navbar navbar-expand-md sticky-top p-0 " style="background: #1FA1F2;">
                        <div class="row m-0 p-0" style="width: 100%;">
                            <div class="col-md-12 m-0 p-0 mr-2 mt-1">
                                <div style="font-family: courier; font-weight: bold;font-size: 1.3em; color: #eee;" class="console"><span class="timestamp">-</span>: <span class="message">-</span></div>
                                <!-- <h2 class="header-tweets-realtime " style="display: inline;">Realtime</h2> -->
                            </div>

                            <div class="col-md-12 m-0 p-0 ">

                                <!-- START STOP -->
                                <TwitterRealTimeStartStopToggle class="align-middle inline mr-2" style="width: 20px; height: 20px;transform: translateY(-0.1em);" />

                                <!-- CONFIGURATION -->
                                <button type="button" class="tweet-stream-configuration btn btn-outline-dark align-middle inline ml-2" style="border: none;" data-toggle="modal" data-target="#tweetStreamConfigurationModal">
                                    <span class="visuallyhidden">Tweetstream configuration</span>
                                    <img style="width: 20px;" src="@/assets/img/icons/ui/configuration.svg" alt="" />
                                </button>

                                <!-- ALL TWEETS -->
                                <!-- <div class="form-check ml-0 m-0 " style="display: inline;">
                                    <input type="checkbox" class="form-check-input mt-3" id="showAllTweets">
                                    <label style="color: #eee;" class="form-check-label align-middle inline" for="showAllTweets">all tweets</label>
                                </div> -->

                                <!-- CLEAR -->
                                <button class="btn btn-sm btn-outline-light ml-2 clear-tweet-stream-button">Clear</button>

                                <!-- INFO -->
                                <button type="button" class="tweet-stream-info btn btn-outline-dark align-middle inline ml-2" style="border: none;" data-toggle="modal" data-target="#tweetStreamInfoModal">
                                    <span class="visuallyhidden">Tweetstream info</span>
                                    <img style="width: 20px;" src="@/assets/img/icons/ui/question.svg" alt="" />
                                </button>

                                <!-- FILTER TWEETS -->
                                <div class="input-group input-group-sm mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="inputGroup-sizing-sm">Filter tweets</span>
                                    </div>
                                    <input type="text" class="form-control" id="filterTweets" value="Tip: stop stream first" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
                                </div>

                            </div>
                        </div>
                    </nav>

                    <div class="row m-0 p-0">
                        <div class=" col-md-12 m-0 p-0">
                            <div class="tweets row m-0 p-0"></div>
                        </div>
                    </div>
                </div>

                <!-- SELECTED TWEETS -->
                <div class="tweets-selected col-md-12 m-0 p-0" style="overflow: scroll;">
                    <nav class="navbar navbar-expand-md sticky-top pt-0 pb-0 pl-2 pr-2 " style="background: #005B81;">
                        <div class="row m-0 p-0" style="width: 100%;">
                            <div class="col-xs-6 m-0 p-0 mr-2">
                                <h2 class="ml-1 mt-2 header-tweets-selected">Bookmarked <button style="transform: translateY(-0.2em);" class="m-0 tweets-selected-open-close-button"><span class="visuallyhidden">open / close selected tweets panel</span></button></h2>
                            </div>

                            <div class="col-xs-6 m-0 p-0 mt-1 ">
                                <button class="btn btn-sm btn-outline-light ml-3 float-right inline clear-selected-tweets-button">Clear</button>
                            </div>
                        </div>
                    </nav>

                    <div class="row m-0 ml-2 mr-2 p-0">
                        <div class="col-md-12 m-0 p-0">
                            <div class="tweets row m-0 p-0"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- END own content -->
        </div>

        <input type="checkbox" id="open-button" />
        <label class="menu-icon" for="open-button">
            <span></span>
            <span class="visuallyhidden">Open/Close Menu</span>
        </label>

    </div>

</div>
</template>

<script>
import store from "../store/store";
import TwitterRealTimeStartStopToggle from "@/components/TwitterRealTimeStartStopToggle.vue";
import {
    getJSON
} from "@/assets/js/getJSON.js";
import {
    realTimeTweets
} from "@/assets/js/realTimeTweets.js";
import {
    disableBodyScrollMixin
} from "./mixins/disableBodyScroll";
import moment from "moment";

export default {
    name: "twitterRealtime3",
    data() {
        return {};
    },
    mixins: [disableBodyScrollMixin],
    components: {
        TwitterRealTimeStartStopToggle
    },
    mounted() {
        getJSON.start();
        this.copyTweet();
        // this.startStopTweetStream();
        this.disableBodyScroll(".content"); //mixin
        // this.disableBodyScroll(".tweets-realtime"); //mixin
        // this.disableBodyScroll(".tweets-selected"); //mixin
        this.drawAttentionToTwitter();
        this.removeNewTweetsSign();
        // this.showAllTweets();
        this.toggleSelectedTweetsPanel();
        this.clearTweetStream();
        this.clearSelectedTweets();
        this.filterTweets();
        this.getBookmarkedTweetsFromLocalStorage();
        this.clock();
    },
    methods: {
        clock() {
            var clock = document.querySelector('.console .timestamp');

            setInterval(function () {
                clock.innerHTML = moment().format('h:mm:ss');
            }, 1000);
        },
        getBookmarkedTweetsFromLocalStorage() {
            var selectedTweets = document.querySelector('.tweets-selected .tweets');
            var val;
            if (localStorage.getItem("bookmarkedTweets") !== null) {
                val = localStorage.getItem("bookmarkedTweets");
                selectedTweets.insertAdjacentHTML("afterbegin", val);
            }
        },
        setBookmarkedTweetsToLocalStorage() {
            var selectedTweets = document.querySelector('.tweets-selected .tweets');
            localStorage.setItem("bookmarkedTweets", selectedTweets.innerHTML);
        },
        filterTweets() {
            // https://schier.co/blog/2014/12/08/wait-for-user-to-stop-typing-using-javascript.html
            var domTextInput = document.querySelector("#filterTweets");
            var domBody = document.querySelector("body");
            var tweets = document.querySelectorAll(".tweet");
            // Init a timeout variable to be used below
            var timeout = null;

            function showResults(searchString) {
                console.log('searchString: ', searchString);
                showAllEntries();

                if (searchString !== "") { // als er iets in het zoekveld staat
                    tweets = document.querySelectorAll(".tweet");
                    for (var i = 0; i < tweets.length; i++) {
                        // first hide all
                        tweets[i].classList.add("hideSearchResult");

                        // if searchstring is found then remove class that hides result
                        if (
                            tweets[i].innerHTML.toLowerCase().indexOf(searchString.toLowerCase()) > -1
                        ) {
                            tweets[i].classList.remove("hideSearchResult");
                        }
                    }
                } else { // when nothing in search field (anymore) all tweets should be shown again
                    showAllEntries();
                    domBody.classList.remove("condensedLayout");
                }
            }

            function showAllEntries() {
                for (var i = 0; i < tweets.length; i++) {
                    tweets[i].classList.remove("hideSearchResult");
                }
            }

            function undoSearchResults() {
                showAllEntries();
            }

            domTextInput.addEventListener("click", function () {
                undoSearchResults();
                this.value = "";
            }, false);

            // Listen for keystroke events
            domTextInput.addEventListener("keyup", function () {
                // textInput.onchange = function (e) {
                // Clear the timeout if it has already been set.
                // This will prevent the previous task from executing
                // if it has been less than <MILLISECONDS>
                clearTimeout(timeout);

                // Make a new timeout set to go off in 800ms
                timeout = setTimeout(function () {
                    showResults(domTextInput.value);
                }, 500);
            }, false);
        },
        clearTweetStream() {
            var button = document.querySelector('.clear-tweet-stream-button');
            var tweets = document.querySelector('.tweets-realtime .tweets');
            button.addEventListener('click', function () {
                tweets.innerHTML = "";
            }, false);
        },
        clearSelectedTweets() {
            var that = this;
            var button = document.querySelector('.clear-selected-tweets-button');
            var tweets = document.querySelector('.tweets-selected .tweets');
            button.addEventListener('click', function () {
                tweets.innerHTML = "";
                that.setBookmarkedTweetsToLocalStorage();
            }, false);
        },
        toggleSelectedTweetsPanel() {
            var panel = document.querySelector('.tweets-selected');
            var trigger = document.querySelector('.tweets-selected-open-close-button');

            trigger.addEventListener('click', function () {
                panel.classList.toggle('open');
            }, false);

        },
        showAllTweets() {
            document.querySelector('#showAllTweets').addEventListener('change', function () {
                var tweetStreamConfiguration = document.querySelector('.tweet-stream-configuration');
                realTimeTweets.toggleAllTweets();
                tweetStreamConfiguration.disabled = !tweetStreamConfiguration.disabled;
            }, false);
        },
        removeNewTweetsSign() {
            document.querySelector(".menu-icon").addEventListener('click', function () {
                this.classList.remove('new-tweets');
            }, false);
        },
        drawAttentionToTwitter() {
            var button = document.querySelector(".menu-icon");
            var effectInterval = 0 // to be used for clearing setInterval
            var interval = 3000;
            var animationLength = 2000; // waiting time before class is removed after adding (to start animation)
            function startEffect() {
                var type = "highlighter";
                button.classList.add(type);
                setTimeout(function () {
                    document.querySelector(".menu-icon").classList.remove(type);
                }, animationLength);
                interval += 9000; // simple way to increase intervals to avoid annoyed users
                clearInterval(effectInterval);
                effectInterval = setInterval(startEffect, interval);
            }

            effectInterval = setInterval(startEffect, interval);

            // stop the effect after the first time the realtime tweets button is clicked
            button.addEventListener("click", function () {
                clearInterval(effectInterval);
            }, false);
        },
        copyTweet() {
            var that = this;
            // var tweetCopyContainer = document.createElement("div");
            // tweetCopyContainer.classList.add("tweetCopyContainer", "tweets");
            // document.querySelector("body").appendChild(tweetCopyContainer);
            document.addEventListener("click", function (event) {
                if (event.target.matches(".tweets-container .tweet .card-body button.select-tweet")) {
                    console.log("bingo");
                    var selectedTweet = event.target.closest(".tweet");
                    // document.querySelector(".tweets-selected .tweets").innerHTML = "";
                    document.querySelector(".tweets-selected .tweets").insertAdjacentElement('afterbegin', selectedTweet);

                    that.setBookmarkedTweetsToLocalStorage();
                }
            }, false);
        },
    }
};

// TIP: open menu initially by adding this class to body: show-menu, and set isOpen = true;
function slideInMenu() {
    "use strict";
    var bodyEl = document.body,
        openbtn = document.getElementById("open-button"),
        openbtn2 = document.querySelector(".twitter-open-close-handle"),
        isOpen = false, // see above
        clickableItems = document.querySelectorAll(".content a");

    function init() {
        initEvents();
    }

    function initEvents() {
        openbtn.addEventListener("click", toggleMenu);
        openbtn2.addEventListener("click", toggleMenu);

        if (isOpen === true) {
            document.querySelector("#open-button").setAttribute("checked", "checked");
        }

    }

    // after click on clickable item, menu should disappear:
    for (let i = 0; i < clickableItems.length; i++) {
        clickableItems[i].addEventListener(
            "click",
            toggleMenuFromClickableItem,
            false
        );
    }

    function toggleMenuFromClickableItem() {
        toggleMenu();

        // if the input isnt clicked but menu is toggled anyway, then we have to remove checked=true also
        openbtn.checked = false;
    }

    function toggleMenu() {
        if (isOpen) {
            bodyEl.classList.remove("show-menu");
        } else {
            bodyEl.classList.add("show-menu");
        }
        isOpen = !isOpen;
    }

    // setTimeout(toggleMenu, 500);

    init();
}

document.addEventListener("DOMContentLoaded", function () {
    slideInMenu();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/***********************/
/* BEGIN CONFIGURATION */
/***********************/

// for instructions on how to have menu opened onload see comment in slideInMenu.vue JS part

$zIndex: 1021; // bootstrap sticky menu is 1020
$hamburgerPadding: 6px;
$hamburgerWidth: 40px;
$hamburgerHeight: 40px;
$hamburgerLinesHeight: 3px;
$hamburgerPositionTop: 10px;
$hamburgerPositionLeft: 10px;
$hamburgerLinesColor: #2A3166;
$hamburgerBackgroundColor: #cae7df60;
// $hamburgerBoxShadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);
// $hamburgerBoxShadow: 0px 0px 1px 0px #000000;
$hamburgerBoxShadow: none;

// how wide should the menu be. 100% covers whole screen
$menuWidth: 300px;
// $menuWidth: 100%;

*,
*:before,
*:after {
    box-sizing: border-box;
}

#slide-menu-and-buttons-wrapper {
    color: #222;

}

.slide-menu-wrapper {
    background: #1da1f2;

    // width of the menu:

}

h2 {
    text-transform: none;
}

.content {
    padding: 1.5em 0.5em 2em;
    text-align: left;
    max-width: 40em;
    margin: 0 auto;
    // border: 5px solid red;
    // makes slide in menu vertical scrollable:
}

ul {
    // font-size: 0.9em;
    margin: 0;
    padding: 0;
}

li {
    border: 3px solid rgba(231, 57, 57, 0.329);
    display: inline-block;
    margin: 0.2em;
}

li a {
    padding: 0.5em;
    color: #333;
}

// li a:visited {
//     border: 3px solid green !important;
//     // color: red;
// }

/*********************/
/* Added styles */
/*********************/

/*********************/
/* END CONFIGURATION */
/*********************/

/* 
BASED ON: CODROPS
https://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/ 
*/

#slide-menu-and-buttons-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    z-index: $zIndex;
}

.slide-menu-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    max-width: 500px;
    margin: 0 !important;
    padding: 0 !important;
    transform: translate3d(100%, 0, 0);
    transition: transform 0.4s;
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);
}

.content {
    height: 100%;
    overflow: scroll;
    font-size: 0.8em;
}

// .menu-button {
//     position: fixed;
//     top: 10px;
//     left: 5px;
//     z-index: $zIndex;
// }

.menu-button:hover {
    opacity: 0.6;
}

/* Shown menu */
.show-menu .slide-menu-wrapper {
    transform: translate3d(0, 0, 0);
    transition: transform 0.4s;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}

.show-menu .content::before {
    opacity: 1;
    transition: opacity 0.4s;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transform: translate3d(0, 0, 0);
}

/* HAMBURGER */
// https://codepen.io/perjor/pen/yOzZPj
#open-button {
    display: none;
}

.menu-icon {
    background: url(../assets/img/twitter/Twitter_Logo_Blue.svg);
    box-shadow: $hamburgerBoxShadow;
    position: fixed;
    top: 5px;
    left: -140px;
    display: block;
    cursor: pointer;
    height: $hamburgerHeight;
    width: $hamburgerWidth;
    padding: $hamburgerPadding;
    z-index: $zIndex;
    border-radius: 50%;
}

.menu-icon.new-tweets:after {
    content: ".";
    position: absolute;
    top: 5px;
    right: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: red;
}

.menu-icon:before {
    content: "";
    position: absolute;
    top: 3px;
    left: 0;
    border-radius: 50%;
}

.menu-icon.disconnected:before {
    background: url(../assets/img/icons/ui/no-entry.svg) no-repeat;
    background-size: contain;
    width: 12px;
    height: 12px;
}

.show-menu .menu-icon {
    background: url(../assets/img/twitter/Twitter_Logo_WhiteOnBlue.svg);

    left: auto;
    right: 0;
}

.tweets-realtime {
    padding-bottom: 150%;
}

.tweets-selected {
    position: fixed;
    bottom: 0;
    left: 0;
    background: #005B81;
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);
    height: 95%;
    transform: translate3d(0, 85%, 0);
    transition: transform 0.4s;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    z-index: 1021; // one higher than the bootstrap nav
}

.tweets-selected.open {
    transform: translate3d(0, 0, 0);
    transition: transform 0.4s;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);

}

.tweets-selected-open-close-button {
    background: url(../assets/img/icons/jv-creative/tweets-selected-open.svg) no-repeat center;
    width: 30px;
    height: 30px;
}

.open .tweets-selected-open-close-button {
    background: url(../assets/img/icons/jv-creative/tweets-selected-close.svg) no-repeat center !important;
    width: 30px;
    height: 30px;
}

.header-tweets-realtime,
.header-tweets-selected {
    color: #eee;
    font-family: poppinsbold;
    font-size: 2em;
}

.select-tweet {
    background: linear-gradient(to right, #5C34A7, #2376D6);

}

// .tweets-selected .select-tweet,
.tweets-selected img,
.tweets-selected .extra-info {
    display: none;
}

// https://codepen.io/etreacy/pen/ZJYoRV
.highlighter {
    animation-name: highlighter;
    animation-duration: 3s;
    animation-fill-mode: forwards;
    // animation-timing-function: cubic-bezier(0.1, 0.7, 1.0, 0.1);
    animation-timing-function: ease-in-out;
}

.twitter-open-close-handle {
    position: absolute;
    top: 50%;
    transform: translateY(calc(-76px*0.8));
    left: calc(-36px*0.8);
    background: url(../assets/img/icons/jv-creative/twitter-open-close-handle.svg) no-repeat;
    background-size: contain;
    width: calc(36px*0.8);
    height: calc(76px*0.8);
    cursor: pointer;
    display: none;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .twitter-open-close-handle {
        display: block;
    }
}

#filterTweets {
    font-size: 18px;
}

@keyframes highlighter {
    0% {
        background-color: transparent;
    }

    10% {
        background-color: #be4a06;
    }

    100% {
        background-color: transparent;
    }
}
</style>
