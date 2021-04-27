import store from "../../store/store";
import {
    fixJSON
} from "./fixJSON";
import {
    realTimeTweets
} from "@/assets/js/realTimeTweets.js";

import {
    tweetsHistory // IIFE
} from "./tweetsHistory.js";

export var getJSON = (function () {
    var fetchTweetsLoop;

    // console showing messages to user
    var konsole;
    var tweets;
    document.addEventListener("DOMContentLoaded", function (event) {
        konsole = document.querySelector('.console .message');
        tweets = document.querySelector(".tweets-realtime .tweets");
    });

    function start(source) {
        const mediaQuery = window.matchMedia('(max-width: 767px)');
        console.log("Started fetching tweets");
        
        if (document.querySelector('.tweet-stream-info-in-stream')) {
            document.querySelector('.tweet-stream-info-in-stream').classList.add('hidden');
        }

        var resp;
        var refreshInterval = 10000;

        function fetchData(source) {
            var connectionSymbol = document.querySelector('.menu-icon');
            fetch(source)
                // 1 json
                // .then(response => response.json())

                // 2 text
                .then(response => response.text())

                .then(data => {
                    connectionSymbol.classList.remove('disconnected');
                    resp = data;
                    // regex can only operate on string
                    resp = resp.replace(/,\:/g, ':');
                    resp = resp.replace(/\:,/g, ':');
                    resp = resp.replace(/",,/g, '",');
                    resp = resp.replace(/,,"/g, ',"');
                    resp = resp.replace(/\[,"/g, '[');
                    resp = resp.replace(/,\]"/g, ']');

                    // 1
                    resp = fixJSON(resp); // fixJSON also converts to object, resp is now an object

                    // 2: if we do not use fixJSON, we need to parse it, fixJSON also parses
                    // resp = JSON.parse(resp);


                    // we need what is insides statuses
                    resp = resp.statuses;

                    realTimeTweets.start(resp);
                })
                .catch(error => {
                    connectionSymbol.classList.add('disconnected');
                    console.log('error: ', error);
                    konsole.innerHTML = 'No tweets or invalid data.';
                    // handle the error
                });
        }

        fetchData(process.env.VUE_APP_REALTIME_TWITTER_JSON, false);
        fetchTweetsLoop = setInterval(function () {
            console.log('Fetch new tweets.');
            konsole.innerHTML = 'Fetch new tweets.';
            fetchData(process.env.VUE_APP_REALTIME_TWITTER_JSON, false);
        }, refreshInterval);
    }

    function stop() {
        document.querySelector('.tweet-stream-info-in-stream').classList.remove('hidden');
        console.log("stop");

        clearInterval(fetchTweetsLoop);
    }

    return {
        start: start,
        stop: stop
    };
}());