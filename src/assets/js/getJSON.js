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

    // console showing messages to user
    var konsole;
    document.addEventListener("DOMContentLoaded", function (event) {
        konsole = document.querySelector('.console .message');
    });

    function start(source) {
        console.log("start");
        store.commit("showToast", "Tweet stream is running.");
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
        fetchData("https://blockchainbird.com/t/twitter-phirehose/tweets-quickstart-cors.php", true);
        fetchData("https://blockchainbird.com/t/twitter-phirehose/tweets-quickstart-cors.php", true);
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
        console.log("stop");
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