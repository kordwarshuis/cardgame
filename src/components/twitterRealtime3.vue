<template>
<div id="slide-menu-and-buttons-wrapper">
    <div class="slide-menu-wrapper">
        <div class="content">
            <!-- BEGIN own content -->
            <div class="tweets-container">
                <h1 class="visuallyhidden">Tweets</h1>
                <!-- <button class="button-open-close-tweets-container"><span class="visuallyhidden">Open / close tweetstream</span></button> -->
                <div class="tweets-realtime">
                    <h2 class="ml-3 header-tweets-realtime">Realtime tweets</h2>
                    <div class="tweets">
                        <!-- example tweet -->
                        <div class="tweet col-md-12">
                            <div class="card mb-4 box-shadow">
                                <div class="card-body">
                                    <div class="card-text"><span class="tweetNumber">#-1</span>
                                        <p><a class='go-to-tweet' target="_blank" rel="noopener" href="https://twitter.com/DragonShadowLV/status/1305951637127618560">Go to tweet and reply with card</a> Why has <a href="http://twitter.com/search?q=#Bitcoin" title="Search tag: Bitcoin" target="_blank">#Bitcoin</a> inventor Satoshi Nakamoto remained anonymous? (via <a href="http://twitter.com/function(e,t){return new E.fn.init(e,t)}" title="Follow decryptmedia" target="_blank">@decryptmedia</a>) <a href="https://t.co/ntUilFO033" target="_blank">https://t.co/ntUilFO033</a> <a href="http://twitter.com/search?q=#crypto" title="Search tag: crypto" target="_blank">#crypto</a></p><img class="img-fluid float-left w-25 mr-3" src="https://pbs.twimg.com/profile_images/616454622501187588/LjvscJJa_normal.jpg" alt="">
                                        <p>Name: Berkley R. Bruce<br>Verified: false<br>Keyword: anonymous</p>
                                        <p>Followers: 6397 | </p>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center"><small class="text-muted"> <span class="tweetTimeStamp">🕐 21:28:45</span></small><button type="button" class="btn btn-primary select-tweet">Select</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tweets-selected pt-3">
                    <h2 class="ml-3 header-tweets-selected">Selected tweet</h2>
                    <div class="tweets">
                        <p>No tweet selected yet.</p>
                    </div>
                </div>
            </div>
            <!-- END own content -->
        </div>
        <input type="checkbox" id="open-button" />
        <label class="menu-icon animate__animated" for="open-button">
            <span></span>
            <span class="visuallyhidden">Open/Close Menu</span>
        </label>
    </div>

</div>
</template>

<script>
import store from "../store/store";
import {
    realTimeTweets
} from "@/assets/js/realTimeTweets.js";
import {
    disableBodyScrollMixin
} from "./mixins/disableBodyScroll";

export default {
    name: "twitterRealtime3",
    data() {
        return {};
    },
    mixins: [disableBodyScrollMixin],
    components: {},
    mounted() {
        realTimeTweets.start({
            source: process.env.VUE_APP_REALTIME_TWITTER_JSON,
            tweetHook: ".tweets-realtime .tweets"
        });
        this.copyTweet();
        this.startStopTweetStream();
        this.disableBodyScroll(".content"); //mixin
        this.drawAttentionToTwitter();
    },
    methods: {
        drawAttentionToTwitter() {
            var button = document.querySelector(".menu-icon");
            var effectInterval = 0 // to be used for clearing setInterval
            var interval = 3000;
            var animationLength = 2000; // waiting time before class is removed after adding (to start animation)
            function startEffect() {
                var type = "animate__heartBeat";
                button.classList.add(type);
                setTimeout(function() {document.querySelector(".menu-icon").classList.remove(type);}, animationLength);
                interval += 5000;// simple way to increase intervals to avoid annoyed users
                clearInterval(effectInterval);
                effectInterval = setInterval(startEffect, interval);
            }

            effectInterval = setInterval(startEffect, interval);

            // stop the effect after the first time the realtime tweets button is clicked
            button.addEventListener("click", function(){
                clearInterval(effectInterval);
            }, false);
        },
        copyTweet() {
            // var tweetCopyContainer = document.createElement("div");
            // tweetCopyContainer.classList.add("tweetCopyContainer", "tweets");
            // document.querySelector("body").appendChild(tweetCopyContainer);

            document.addEventListener("click", function (event) {
                if (event.target.matches(".tweets-container .tweet .card-body button.select-tweet")) {
                    // tweetCopyContainer.innerHTML = "";
                    // var tweet = document.createElement("div");
                    // tweet.classList.add("tweet", "col-md-12");
                    // var card = document.createElement("div");
                    // card.classList.add("card", "mb-4", "box-shadow");

                    // tweetCopyContainer.appendChild(tweet);

                    // tweet.appendChild(card);
                    // var toBeAdded = event.target.closest(".card-body");

                    // card.appendChild(toBeAdded);
                    // card.querySelector("button").remove();
                    // tweetCopyContainer.querySelector(".card-body").insertAdjacentHTML("afterbegin", "<div class='alert alert-info' role='alert'>First find a card, copy and come back to this tweet.</div><button class='open-and-close-tweet'><span class='visuallyhidden'>Open and close</span></button>");

                    // if (document.querySelector('.open-and-close-tweet') !== undefined) {
                    //     console.log("hio");
                    //     document.querySelector('.open-and-close-tweet').addEventListener('click', function () {
                    //         document.querySelector('.tweetCopyContainer').classList.toggle('tweetCopyContainerVisible');
                    //     }, false);

                    // }

                    // setTimeout(function () {
                    //     tweetCopyContainer.classList.add('tweetCopyContainerVisible');
                    // }, 500);
                    // setTimeout(function () {
                    //     tweetCopyContainer.classList.remove('tweetCopyContainerVisible');
                    // }, 1000);

                    // // store.commit("showToast", "Select an appropriate card and go to the card at the left.");

                    console.log("bingo");
                    var selectedTweet = event.target.closest(".tweet");
                    document.querySelector(".tweets-selected .tweets").innerHTML = "";
                    document.querySelector(".tweets-selected .tweets").insertAdjacentElement('afterbegin', selectedTweet);
                    document.querySelector(".tweets-selected .tweets").querySelector(".extra-info").innerHTML = "";
                    document.querySelector(".tweets-selected .tweets").querySelector(".extra-info1").innerHTML = "";
                    document.querySelector(".tweets-selected .tweets").querySelector(".extra-info2").innerHTML = "";
                    document.querySelector(".tweets-selected .tweets").querySelector(".extra-info3").innerHTML = "";

                    // selectedTweet.style.position = "absolute";
                    // selectedTweet.style.left = "0";
                    // selectedTweet.style.bottom = "0";
                }
            }, false);

            // document.querySelector('.button-open-close-tweets-container').addEventListener('click', function () {
            //     document.querySelector('.tweets-container').classList.toggle('tweets-container-visible');
            //     document.querySelector('.button-open-close-tweets-container').classList.toggle('button-open-close-tweets-container-visible');
            // }, false);

        },
        // stop tweetstream when mouse over tweetstream, to avoid user confusion
        startStopTweetStream() {
            document.querySelector('.tweets-realtime').addEventListener('mouseenter', function () {
                realTimeTweets.stop();
            }, false);
            document.querySelector('.tweets-realtime').addEventListener('mouseleave', function () {
                realTimeTweets.start({
                    source: process.env.VUE_APP_REALTIME_TWITTER_JSON,
                    tweetHook: ".tweets-realtime .tweets"
                });
            }, false);
        }
    }
};

// TIP: open menu initially by adding this class to body: show-menu, and set isOpen = true;
function slideInMenu() {
    "use strict";
    var bodyEl = document.body,
        openbtn = document.getElementById("open-button"),
        isOpen = false, // see above
        clickableItems = document.querySelectorAll(".content a");

    function init() {
        initEvents();
    }

    function initEvents() {
        openbtn.addEventListener("click", toggleMenu);

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
    top: 3px;
    left: -120px;
    display: block;
    cursor: pointer;
    height: $hamburgerHeight;
    width: $hamburgerWidth;
    padding: $hamburgerPadding;
    z-index: $zIndex;
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
    background: #1da1f2;
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);
}

.header-tweets-realtime,
.header-tweets-selected {
    color: #eee;
    font-weight: bold;
}

.select-tweet {
    background: linear-gradient(to right, #5C34A7, #2376D6);

}

// .tweets-selected .select-tweet,
.tweets-selected img,
.tweets-selected .extra-info {
    display: none;
}
</style>
