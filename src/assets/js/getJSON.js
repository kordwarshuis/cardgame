import store from "../../store/store";
import {
    fixJSON
} from "./fixJSON";
import {
    realTimeTweets
} from "@/assets/js/realTimeTweets.js";

import {
    tweetsHistory
} from "./tweetsHistory.js";

// https://stackoverflow.com/a/1060034
(function() {
    var hidden = "hidden";
  
    // Standards:
    if (hidden in document)
      document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
      document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
      document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
      document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ("onfocusin" in document)
      document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
      window.onpageshow = window.onpagehide
      = window.onfocus = window.onblur = onchange;
  
    function onchange (evt) {
      var v = "visible", h = "hidden",
          evtMap = {
            focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h
          };
  
      evt = evt || window.event;
      if (evt.type in evtMap)
        document.body.className = evtMap[evt.type];
      else
        document.body.className = this[hidden] ? "hidden" : "visible";
    }
  
    // set the initial state (but only if browser supports the Page Visibility API)
    if( document[hidden] !== undefined )
      onchange({type: document[hidden] ? "blur" : "focus"});
  })();



// load tweets history on load
document.addEventListener("DOMContentLoaded", tweetsHistory, false);

// when window out of focus or tab out of focus
function handleVisibilityChange() {
    if (document.hidden) {
        //   code
    } else {
        console.log("visibilitychange");
        tweetsHistory();
    }
}

// document.addEventListener("visibilitychange", handleVisibilityChange, false);

// window.onfocus = function () {
//     console.log("focus");
//     tweetsHistory();
// };


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