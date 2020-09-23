<template>
<div class="tweets-container">
    <div style="" id="tweets">
        <!-- example tweet -->
        <div class="tweet col-md-12">
            <div class="card mb-4 box-shadow">
                <div class="card-body">
                    <div class="card-text"><span class="tweetNumber">#-1</span>
                        <p><a class='go-to-tweet' target="_blank" rel="noopener" href="https://twitter.com/DragonShadowLV/status/1305951637127618560">Go to tweet and reply with card</a> Why has <a href="http://twitter.com/search?q=#Bitcoin" title="Search tag: Bitcoin" target="_blank">#Bitcoin</a> inventor Satoshi Nakamoto remained anonymous? (via <a href="http://twitter.com/function(e,t){return new E.fn.init(e,t)}" title="Follow decryptmedia" target="_blank">@decryptmedia</a>) <a href="https://t.co/ntUilFO033" target="_blank">https://t.co/ntUilFO033</a> <a href="http://twitter.com/search?q=#crypto" title="Search tag: crypto" target="_blank">#crypto</a></p><img class="img-fluid float-left w-25 mr-3" src="https://pbs.twimg.com/profile_images/616454622501187588/LjvscJJa_normal.jpg" alt="">
                        <p>Name: Berkley R. Bruce<br>Verified: false<br>Keyword: anonymous</p>
                        <p>Followers: 6397 | </p>
                    </div>
                    <div class="d-flex justify-content-between align-items-center"><small class="text-muted"> <span class="tweetTimeStamp">🕐 21:28:45</span></small><button type="button" class="btn btn-primary">Select</button></div>
                </div>
            </div>
        </div>
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
            source: process.env.VUE_APP_REALTIME_TWITTER_JSON
        });
        this.copyTweet();
    },
    methods: {
        copyTweet() {
            // alert("Hi Isabel en Henk, onderin verschijnen tweets, als je er overheen muist of op mobiel op tikt komen ze omhoog, als je er op klikt komt de tweet links te staan, nu heb je hem gesaved en kan je een kaart gaan zoeke en kopieeren.")
            var tweetCopyContainer = document.createElement("div");
            tweetCopyContainer.classList.add("tweetCopyContainer", "tweets");
            document.querySelector("body").appendChild(tweetCopyContainer);

            document.addEventListener("click", function (event) {
                if (event.target.matches(".tweets-container .tweet .card-body button")) {
                    tweetCopyContainer.innerHTML = "";
                    var tweet = document.createElement("div");
                    tweet.classList.add("tweet", "col-md-12");
                    var card = document.createElement("div");
                    card.classList.add("card", "mb-4", "box-shadow");

                    // tweetCopyContainer.appendChild(card);
                    tweetCopyContainer.appendChild(tweet);

                    tweet.appendChild(card);
                    var toBeAdded = event.target.closest(".card-body");

                    card.appendChild(toBeAdded);
                    card.querySelector("button").remove();
                    tweetCopyContainer.querySelector(".card-body").insertAdjacentHTML("afterbegin", "<div class='alert alert-info' role='alert'>First find a card, copy and come back to this tweet.</div><button class='open-and-close-tweet'><span class='visuallyhidden'>Open and close</span></button>");

                    if (document.querySelector('.open-and-close-tweet') !== undefined) {
                        console.log("hio");
                        document.querySelector('.open-and-close-tweet').addEventListener('click', function () {
                            document.querySelector('.tweetCopyContainer').classList.toggle('tweetCopyContainerVisible');
                        }, false);

                    }

                    setTimeout(function () {
                        tweetCopyContainer.classList.add('tweetCopyContainerVisible');
                    }, 500);
                    setTimeout(function () {
                        tweetCopyContainer.classList.remove('tweetCopyContainerVisible');
                    }, 1000);

                    // store.commit("showToast", "Select an appropriate card and go to the card at the left.");
                }
                // if (event.target.matches(".close")) {
                //     // Run your code to close a modal
                // }
            }, false);

            // tweets.forEach(function () {
            //     this.ad
            //     console.log("woopie");
            // })

            document.querySelector('.tweets-container').addEventListener('click', function () {
                document.querySelector('.tweets-container').classList.toggle('tweets-container-visible');
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
.tweets-container {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 30px;
    width: 100%;
    margin: 0;
    overflow: scroll;
    font-size: 0.6em;
    color: #000;
    transition: all 0.6s ease-in-out;
}

// .tweets-container:hover,
.tweets-container-visible {
    height: 300px;
    transition: all 0.3s ease-in-out;
}

#tweets {
    width: 100000000000000000000px;
}

.tweet {
    max-width: 300px !important; // overrule bootstrap
    min-height: 400px;
    float: left;
    display: block;
}

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

.tweetCopyContainer {
    // border: 3px solid red;
    position: fixed;
    top: 10px;
    left: -286px;
    // left: -200px;
    width: 300px;
    height: 400px;
    margin: 0;
    font-size: 0.7em;
    color: #222;
    transition: all 0.9s ease-in-out;
}

.tweetCopyContainer .card {
    padding: 1em 1em 0 0;
    background-color: #c6defa;
    border-top-right-radius: 0px;
}

// .tweetCopyContainer:hover,
.tweetCopyContainerVisible {
    left: -1.5em;
    transition: all 0.3s ease-in-out;
}

.go-to-tweet {
    display: none;
}

.tweetCopyContainer .go-to-tweet {
    display: block;
    border: 1px solid #222;
    border-radius: 7px;
    padding: 0.3em;
    background: gainsboro;
    display: block;
    margin-bottom: 1em;
}

.tweetCopyContainer .go-to-tweet:hover {
    background: rgb(197, 194, 194);
}

.open-and-close-tweet {
    position: absolute;
    top: -4px;
    right: -38px;
    width: 35px;
    height: 35px;
    background-image: url(../assets/img/twitter/Twitter_Logo_Blue.svg);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: #c6defa;
}

.open-and-close-tweet:focus {
    outline: 0;
}

.open-and-close-tweet:hover {
    background-color: #c6defa;
}
</style>
