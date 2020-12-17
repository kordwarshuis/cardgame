import store from "../../store/store";
import {
    fixJSON
} from "./fixJSON";
import {
    realTimeTweets
} from "@/assets/js/realTimeTweets.js";

export var getJSON = (function () {
    var fetchTweetsLoop;
    var fetchTweetsLoopHandpicked;
    var handpicked1;
    var handpicked2;
    var handpicked3;
    var handpicked4;
    var handpicked5;
    var handpicked6;

    // console showing messages to user
    var konsole;
    var tweets;
    document.addEventListener("DOMContentLoaded", function (event) {
        konsole = document.querySelector('.console .message');
        tweets = document.querySelector(".tweets-realtime .tweets");
    });

    function start(source) {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        console.log("start");
        
        if (document.querySelector('.tweet-stream-info-in-stream')) {
            document.querySelector('.tweet-stream-info-in-stream').classList.add('hidden');
        }

        var resp;
        var refreshInterval = 10000;

        function fetchData(source, handpicked) {
            // console.log('handpicked: ', handpicked);
            var connectionSymbol = document.querySelector('.menu-icon');
            fetch(source)
                // 1 json
                // .then(response => response.json())

                // 2 text
                .then(response => response.text())

                .then(data => {
                    connectionSymbol.classList.remove('disconnected');
                    // 1: we need what is insides statuses
                    // resp = data.statuses;

                    // 2
                    resp = data;


                    // 1
                    // resp = JSON.stringify(resp);

                    // 2
                    // nothing, is already string

                    // regex can only operate on string
                    resp = resp.replace(/,\:/g, ':');
                    resp = resp.replace(/\:,/g, ':');
                    resp = resp.replace(/",,/g, '",');
                    resp = resp.replace(/,,"/g, ',"');
                    resp = resp.replace(/\[,"/g, '[');
                    resp = resp.replace(/,\]"/g, ']');
                    // console.log('resp 2: ', resp);

                    // 1
                    resp = fixJSON(resp); // fixJSON also converts to object, resp is now an object

                    // 2: if we do not use fixJSON, we need to parse it, fixJSON also parses
                    // resp = JSON.parse(resp);


                    // we need what is insides statuses
                    resp = resp.statuses;

                    // if the json is taken from the handpicked source, then give each array element a property named handpickedTweet
                    if (handpicked === true) {
                        resp.forEach(element => {
                            element.handpickedTweet = true;
                        });
                    } else {
                        resp.forEach(element => {
                            element.handpickedTweet = false;
                        });
                    }

                    // console.log('resp 3: ', resp);
                    realTimeTweets.start(resp);
                })
                .catch(error => {
                    connectionSymbol.classList.add('disconnected');
                    console.log('error: ', error);
                    konsole.innerHTML = 'No tweets or invalid data.';
                    // handle the error
                });
        }

        fetchData(process.env.VUE_APP_REALTIME_TWITTER_QUIKSTART_JSON, true);


        // simple way of showing some handpicked tweets
        handpicked1 = setTimeout(function () {
            fetchData(process.env.VUE_APP_REALTIME_TWITTER_QUIKSTART_JSON, true);
        }, 0);
        handpicked2 = setTimeout(function () {
            fetchData(process.env.VUE_APP_REALTIME_TWITTER_QUIKSTART_JSON, true);
        }, 60000);
        handpicked3 = setTimeout(function () {
            fetchData(process.env.VUE_APP_REALTIME_TWITTER_QUIKSTART_JSON, true);
        }, 180000);
        // handpicked4 = setTimeout(function () {
        //     fetchData(process.env.VUE_APP_REALTIME_TWITTER_QUIKSTART_JSON, true);
        // }, 45000);
        // handpicked5 = setTimeout(function () {
        //     fetchData(process.env.VUE_APP_REALTIME_TWITTER_QUIKSTART_JSON, true);
        // }, 80000);
        // handpicked6 = setTimeout(function () {
        //     fetchData(process.env.VUE_APP_REALTIME_TWITTER_QUIKSTART_JSON, true);
        // }, 190000);
        // fetchTweetsLoopHandpicked = setInterval(function () {
        //     console.log('Fetch handpicked tweets');
        //     konsole.innerHTML = 'Fetch handpicked tweets.';
        //     fetchData(process.env.VUE_APP_REALTIME_TWITTER_QUIKSTART_JSON, true);
        // }, 580000);


        fetchData(process.env.VUE_APP_REALTIME_TWITTER_JSON, false);
        fetchTweetsLoop = setInterval(function () {
            console.log('Fetch new tweets.');
            konsole.innerHTML = 'Fetch new tweets.'
            fetchData(process.env.VUE_APP_REALTIME_TWITTER_JSON, false);
        }, refreshInterval);
    }

    function stop() {
        document.querySelector('.tweet-stream-info-in-stream').classList.remove('hidden');
        console.log("stop");

        clearTimeout(handpicked1);
        clearTimeout(handpicked2);
        clearTimeout(handpicked3);
        // clearTimeout(handpicked4);
        // clearTimeout(handpicked5);
        // clearTimeout(handpicked6);

        clearInterval(fetchTweetsLoop);
        console.log('fetchTweetsLoop: ', fetchTweetsLoop);
        clearInterval(fetchTweetsLoopHandpicked);
        console.log('fetchTweetsLoopHandpicked: ', fetchTweetsLoopHandpicked);
    }

    return {
        start: start,
        stop: stop
    };
}());