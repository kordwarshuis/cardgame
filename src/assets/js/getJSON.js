import store from "../../store/store";
import {
    fixJSON
} from "./fixJSON";
import {
    realTimeTweets
} from "@/assets/js/realTimeTweets.js";

export var getJSON = (function () {
    var fetchTweetsLoop;
    var fetchTweetsLoop2;
    var handpicked1;
    var handpicked2;
    var handpicked3;
    var handpicked4;
    var handpicked5;
    var handpicked6;

    // console showing messages to user
    var konsole;
    var tweets
    document.addEventListener("DOMContentLoaded", function (event) {
        konsole = document.querySelector('.console .message');
        tweets = document.querySelector(".tweets-realtime .tweets");
        console.log('tweets: ', tweets);
    });

    function start(source) {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        console.log("start");
        store.commit("showToast", "Tweet stream is running.");
        document.addEventListener('DOMContentLoaded', function () {
            tweets.insertAdjacentHTML("afterbegin", "<h2 class='tweet-stream-info'>Tweet stream is running.</h2>");
        });

        // show message only on smaller screens where tweet stream does not open initially
        if (mediaQuery.matches) {
            setTimeout(function () {
                store.commit("showToast", "Open Tweet panel to see tweet stream");
            }, 6000);
        }
        setTimeout(function () {
            store.commit("showToast", "Depending on your chosen settings it may take a while before realtime tweets show.");
        }, 12000);

        setTimeout(function () {
            store.commit("showToast", "Depending on your chosen settings it may take a while before realtime tweets show.");
        }, 180000);

        var resp;
        var refreshInterval = 10000;

        function fetchData(source, curated) {
            // console.log('curated: ', curated);
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

                    // if the json is taken from the curated source, then give each array element a property named curatedTweet
                    if (curated === true) {
                        resp.forEach(element => {
                            element.curatedTweet = true;
                        });
                    } else {
                        resp.forEach(element => {
                            element.curatedTweet = false;
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

        fetchData("https://blockchainbird.com/t/twitter-phirehose/tweets-quickstart-cors.php", true);


        // simple way of showing some handpicked tweets
        handpicked1 = setTimeout(function () {
            fetchData("https://blockchainbird.com/t/twitter-phirehose/tweets-quickstart-cors.php", true);
        }, 6000);
        handpicked2 = setTimeout(function () {
            fetchData("https://blockchainbird.com/t/twitter-phirehose/tweets-quickstart-cors.php", true);
        }, 12000);
        handpicked3 = setTimeout(function () {
            fetchData("https://blockchainbird.com/t/twitter-phirehose/tweets-quickstart-cors.php", true);
        }, 25000);
        handpicked4 = setTimeout(function () {
            fetchData("https://blockchainbird.com/t/twitter-phirehose/tweets-quickstart-cors.php", true);
        }, 45000);
        handpicked5 = setTimeout(function () {
            fetchData("https://blockchainbird.com/t/twitter-phirehose/tweets-quickstart-cors.php", true);
        }, 80000);
        handpicked6 = setTimeout(function () {
            fetchData("https://blockchainbird.com/t/twitter-phirehose/tweets-quickstart-cors.php", true);
        }, 190000);
        fetchTweetsLoop2 = setInterval(function () {
            console.log('Fetch curated tweets');
            konsole.innerHTML = 'Fetch handpicked tweets.';
            fetchData("https://blockchainbird.com/t/twitter-phirehose/tweets-quickstart-cors.php", true);
        }, 580000);


        fetchData(process.env.VUE_APP_REALTIME_TWITTER_JSON, false);
        fetchTweetsLoop = setInterval(function () {
            console.log('Fetch new tweets.');
            konsole.innerHTML = 'Fetch new tweets.'
            fetchData(process.env.VUE_APP_REALTIME_TWITTER_JSON, false);
        }, refreshInterval);
    }

    function stop() {
        store.commit("showToast", "Tweet stream is paused.");

        // document.addEventListener('DOMContentLoaded', function () {
            tweets.insertAdjacentHTML("afterbegin", "<h2 class='tweet-stream-info'>Tweet stream is paused.</h2>");
        // });
        console.log("stop");

        clearTimeout(handpicked1);
        clearTimeout(handpicked2);
        clearTimeout(handpicked3);
        clearTimeout(handpicked4);
        clearTimeout(handpicked5);
        clearTimeout(handpicked6);

        clearInterval(fetchTweetsLoop);
        console.log('fetchTweetsLoop: ', fetchTweetsLoop);
        clearInterval(fetchTweetsLoop2);
        console.log('fetchTweetsLoop2: ', fetchTweetsLoop2);
    }

    return {
        start: start,
        stop: stop
    };
}());