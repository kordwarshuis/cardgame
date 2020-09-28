<template>
<div class="tweets-container">
    <button class="button-open-close-tweets-container"><span class="visuallyhidden">Open / close tweetstream</span></button>
    <div class="tweets-realtime">
        <h3 class="header-tweets-realtime">Realtime tweets</h3>
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
    <div class="tweets-selected">
        <h3 class="header-tweets-selected">Selected tweets</h3>
        <div class="tweets"></div>
    </div>
</div>
</template>

<script>
import store from "../store/store";
import {
    realTimeTweets
} from "@/assets/js/realTimeTweets.js";

export default {
    name: "TwitterRealTime2",
    mounted() {
        realTimeTweets.start({
            source: process.env.VUE_APP_REALTIME_TWITTER_JSON,
            tweetHook: ".tweets-realtime .tweets"
        });
        this.copyTweet();
    },
    methods: {
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

                    document.querySelector(".tweets-selected .tweets").insertAdjacentElement('afterbegin', selectedTweet);

                    // selectedTweet.style.position = "absolute";
                    // selectedTweet.style.left = "0";
                    // selectedTweet.style.bottom = "0";
                }
            }, false);

            document.querySelector('.button-open-close-tweets-container').addEventListener('click', function () {
                document.querySelector('.tweets-container').classList.toggle('tweets-container-visible');
                document.querySelector('.button-open-close-tweets-container').classList.toggle('button-open-close-tweets-container-visible');
            }, false);

            // document.querySelector('body').addEventListener('click', function () {
            //     document.querySelector('.tweets-container').classList.remove('tweets-container-visible');
            // }, false);

        }
    }
}
</script>

<style lang="scss">
/* // scoped does not work here */
// @import "~bootstrap/dist/css/bootstrap.min.css";

// all tweets, realtime and selected
.tweets-container {
    background: rgb(3, 52, 99);
    box-shadow: 0px 0px 20px 10px rgba(0, 0, 0, 1);
    position: fixed;
    left: 0;
    bottom: 0;
    height: 60px;
    width: 100%;
    margin: 0;
    padding: 10px 0 0 50px;
    font-size: 0.6em;
    color: #000;
    transition: all 0.6s ease-in-out;
}

.tweets-container-visible {
    height: 80%;
    transition: all 0.3s ease-in-out;
}

.tweets-container {
    .button-open-close-tweets-container {
        position: fixed;
        bottom: 10px;
        left: 0;
        // transform: translateX(-100%);
        width: 40px;
        height: 40px;
        background: rgba(34, 34, 34, 0.575) url("../assets/img/icons/flat/dots-menu.svg") center center no-repeat;
        background-size: 15px;
        padding: 0;
        transition: all 0.6s ease-in-out;
        z-index: 1;
    }

    .button-open-close-tweets-container:focus {
        outline: none;
    }

    .button-open-close-tweets-container-visible {
        bottom: 73%;
        transition: all 0.3s ease-in-out;
    }

    // .header-tweets-realtime,
    // .header-tweets-selected {
    //     color: #eee;
    //     display: block;
    // }

    .tweets-selected {
        display: block;
        margin-top: 1.5em;
        height: 50%;

        button.select-tweet {
            display: none;
        }

        .go-to-tweet {
            background: rgb(131, 205, 240);
            padding: 0.5em;
            margin: 1.5em;
            border: 1px solid #222;
        }

    }

    .tweets-realtime {
        // border: 3px solid green;
        display: block;
        height: 50%;

        .go-to-tweet {
            display: none;
        }

    }

    .tweets-selected,
    .tweets-realtime {
        border-top: 1px solid #eee;
        // overflow-y: hidden;
        overflow-y: scroll;
        overflow-x: scroll;

    }

    .header-tweets-realtime,
    .header-tweets-selected {
        color: #eee;
        font-size: 2em;
    }

    .tweets {
        // border: 3px solid yellow;
        width: 100000000000000000000px;
    }

}

// .tweets-realtime {}

.tweet {
    max-width: 400px !important; // overrule bootstrap
    // min-height: 400px;
    // max-height: 60%;
    height: 100%;

    float: left;
    display: block;
    // border: 3px solid purple;
}

// .tweets-selected .tweet {
// float: right;
// }

.card {
    min-height: 270px;
    // background-image: url(../assets/img/twitter/Twitter_Logo_Blue.svg);
    // background-repeat: no-repeat;
    // background-position: top right;
    // background-size: 30px;

}

.tweets-container .card {
    background-image: url(../assets/img/twitter/Twitter_Logo_Blue.svg);
    background-repeat: no-repeat;
    background-position: top right;
    background-size: 30px;
}

.tweetNumber {
    position: absolute;
    top: -0.1em;
    left: 0em;
    font-size: 2em;
    color: #222;
}

// .tweetCopyContainer {
//     // border: 3px solid red;
//     position: fixed;
//     top: 10px;
//     left: -286px;
//     // left: -200px;
//     width: 300px;
//     height: 400px;
//     margin: 0;
//     font-size: 0.7em;
//     color: #222;
//     transition: all 0.9s ease-in-out;
// }

// .tweetCopyContainer .card {
//     padding: 1em 1em 0 0;
//     background-color: #c6defa;
//     border-top-right-radius: 0px;
// }

// .tweetCopyContainerVisible {
//     left: -1.5em;
//     transition: all 0.3s ease-in-out;
// }

// .go-to-tweet {
//     display: none;
// }

// .tweetCopyContainer .go-to-tweet {
//     display: block;
//     border: 1px solid #222;
//     border-radius: 7px;
//     padding: 0.3em;
//     background: gainsboro;
//     display: block;
//     margin-bottom: 1em;
// }

// .tweetCopyContainer .go-to-tweet:hover {
//     background: rgb(197, 194, 194);
// }

// .open-and-close-tweet {
//     position: absolute;
//     top: -4px;
//     right: -38px;
//     width: 35px;
//     height: 35px;
//     background-image: url(../assets/img/twitter/Twitter_Logo_Blue.svg);
//     border-top-right-radius: 10px;
//     border-bottom-right-radius: 10px;
//     background-color: #c6defa;
// }

// .open-and-close-tweet:focus {
//     outline: 0;
// }

// .open-and-close-tweet:hover {
//     background-color: #c6defa;
// }
</style>
