import {
    language
} from '@/assets/js/Language.js';

import store from '@/store/store.js';
import moment from "moment";

export var realTimeTweets = (function () {
    var refreshInterval = 10000;
    var numberOfFollowers = 750;

    var domStart = document.querySelector("#start");
    var domStop = document.querySelector("#stop");
    var domRestoreKeyWords = document.querySelector("#restoreKeyWords");
    var domEmptyKeyWords = document.querySelector("#emptyKeyWords");
    var domRestoreTweetAccounts = document.querySelector("#restoreTweetAccounts");
    var domEmptyTweetAccounts = document.querySelector("#emptyTweetAccounts");
    var domTestTweetAccountsSound = document.querySelector("#testTweetAccountsSound");
    
    var domTemp = "";
    var domTempOld = "x";

    var fetchTweetsLoop;
    var keywordFound = false;
    var currentKeyword = "";
    var somethingFound = false;
    var tweetNumber = 0;
    var status = document.querySelector("#status span");
    var lastDataSet;
    // var keyWords = [];
    var keyWords = ["the", "criminals", "slow", "laundering", "energy", "complicated", "unfair", "quantum", "tax evaders", "unsustainable", "intrinsic value", "shut down", "scammers", "roulette", "only 21", "not safe", "black market", "terrorists", "tulip", "greater fool", "not scalable", "anarchists", "distribution unfair", "hacked", " anonymous", "unsustainable", "useless", "ponzi", "no backing", "will die", "forbidden", "shut down", "scammers", "not gdpr", "price down", "terrorists", "privacy breach", "volatile", "useless", "deflation", "chinese"];





    var tweetAccounts = [];
    // var followersSelect = document.querySelector("#followers");
    var followersSetCounter = document.querySelector("#followersset span");

    // var domKeywords = document.querySelector("#keywords");
    // var domTweetAccounts = document.querySelector("#tweetAccounts");
    var onlyVerifiedAccounts = false;
    // var domOnlyVerifiedAccounts = document.querySelector("#onlyVerifiedAccounts");
    // domOnlyVerifiedAccounts.addEventListener("change", function () {
    //     if (domOnlyVerifiedAccounts.checked === true) {
    //         onlyVerifiedAccounts = true;
    //     } else {
    //         onlyVerifiedAccounts = false;
    //     }
    // }, false);

    function showNumberOfFollowers() {
        document.querySelector("#numberOfFollowers").innerHTML = numberOfFollowers;
    }

    function timestampNow() {
        return moment().format("HH:mm:ss");
    }

    // https://stackoverflow.com/a/59329495
    function fixJSON(json) {
        function bulkRegex(str, callback) {
            if (callback && typeof callback === 'function') {
                return callback(str);
            } else if (callback && Array.isArray(callback)) {
                for (var i = 0; i < callback.length; i++) {
                    if (callback[i] && typeof callback[i] === 'function') {
                        str = callback[i](str);
                    } else {
                        break;
                    }
                }

                return str;
            }

            return str;
        }

        if (json && json !== '') {
            if (typeof json !== 'string') {
                try {
                    json = JSON.stringify(json);
                } catch (e) {
                    return false;
                }
            }

            if (typeof json === 'string') {
                json = bulkRegex(json, false, [function (str) {
                    return str.replace(/[\n\t]/gm, '');
                }, function (str) {
                    return str.replace(/,\}/gm, '}');
                }, function (str) {
                    return str.replace(/,\]/gm, ']');
                }, function (str) {
                    str = str.split(/(?=[,\}\]])/g);
                    str = str.map(function (s) {
                        if (s.includes(':') && s) {
                            var strP = s.split(/:(.+)/, 2);
                            strP[0] = strP[0].trim();

                            if (strP[0]) {
                                var firstP = strP[0].split(/([,\{\[])/g);
                                firstP[firstP.length - 1] = bulkRegex(firstP[firstP.length - 1], false, function (p) {
                                    return p.replace(/[^A-Za-z0-9\-_]/, '');
                                });
                                strP[0] = firstP.join('');
                            }

                            var part = strP[1].trim();

                            if (part.startsWith('"') && part.endsWith('"') || part.startsWith('\'') && part.endsWith(
                                    '\'') || part.startsWith('`') && part.endsWith('`')) {
                                part = part.substr(1, part.length - 2);
                            }

                            part = bulkRegex(part, false, [function (p) {
                                return p.replace(/(["])/gm, '\\$1');
                            }, function (p) {
                                return p.replace(/\\'/gm, '\'');
                            }, function (p) {
                                return p.replace(/\\`/gm, '`');
                            }]);
                            strP[1] = ('"' + part + '"').trim();
                            s = strP.join(':');
                        }

                        return s;
                    });
                    return str.join('');
                }, function (str) {
                    return str.replace(/(['"])?([a-zA-Z0-9\-_]+)(['"])?:/g, '"$2":');
                }, function (str) {
                    str = str.split(/(?=[,\}\]])/g);
                    str = str.map(function (s) {
                        if (s.includes(':') && s) {
                            var strP = s.split(/:(.+)/, 2);
                            strP[0] = strP[0].trim();

                            if (strP[1].includes('"') && strP[1].includes(':')) {
                                var part = strP[1].trim();

                                // dont need this and now it works in more browsers
                                // if (part.startsWith('"') && part.endsWith('"')) {
                                //   part = part.substr(1, part.length - 2);
                                //   part = bulkRegex(part, false, function (p) {
                                //     return p.replace(/(?<!\\)"/gm, '');// only works in Chrome, KD
                                //   });
                                // }

                                strP[1] = ('"' + part + '"').trim();
                            }

                            s = strP.join(':');
                        }

                        return s;
                    });
                    return str.join('');
                }]);

                try {
                    json = JSON.parse(json);
                } catch (e) {
                    return false;
                }
            }

            return json;
        }

        return false;
    }

    function stopLoop() {
        clearInterval(fetchTweetsLoop);
        // status.innerHTML = language.status.appStopped;
    }

    /*
        example:
        args = {
            source: process.env.VUE_APP_REALTIME_TWITTER_JSON
        }
    */
    function startStream(args) {
        var tweets = document.querySelector(args.tweetHook);
        var stopNow = false;
        var isSpecialAccount = false;
        var specialAccountHTMLcode = "";

        // status.innerHTML = language.status.appStarted;
        // store.commit("showToast", language.notifications.appStarted);

        // if (localStorage.getItem("soundOn") === "true") alert.play();

        // Convert URLs (w/ or w/o protocol), @mentions, and #hashtags into anchor links
        // http://roadha.us/2011/03/create-anchor-links-in-twitter-status-text-with-javascript/
        function twitterLinks(text) {
            var base_url = 'http://twitter.com/'; // identica: 'http://identi.ca/'
            var hashtag_part = 'search?q=#'; // identica: 'tag/'
            // convert URLs into links
            text = text.replace(
                /(>|<a[^<>]+href=['"])?(https?:\/\/([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.,]*[^ !#?().,])?)/gi,
                function ($0, $1, $2) {
                    return ($1 ? $0 : '<a href="' + $2 + '" target="_blank">' + $2 + '</a>');
                });
            // convert protocol-less URLs into links
            text = text.replace(
                /(:\/\/|>)?\b(([-a-z0-9]+\.)+[a-z]{2,5}(\/[-a-z0-9!#()\/?&.]*[^ !#?().,])?)/gi,
                function ($0, $1, $2) {
                    return ($1 ? $0 : '<a href="http://' + $2 + '">' + $2 + '</a>');
                });
            // convert @mentions into follow links
            text = text.replace(
                /(:\/\/|>)?(@([_a-z0-9\-]+))/gi,
                function ($0, $1, $2, $3) {
                    return ($1 ? $0 : '<a href="' + base_url + $ +
                        '" title="Follow ' + $3 + '" target="_blank">@' + $3 +
                        '</a>');
                });
            // convert #hashtags into tag search links
            text = text.replace(
                /(:\/\/[^ <]*|>)?(\#([_a-z0-9\-]+))/gi,
                function ($0, $1, $2, $3) {
                    return ($1 ? $0 : '<a href="' + base_url + hashtag_part + $3 +
                        '" title="Search tag: ' + $3 + '" target="_blank">#' + $3 +
                        '</a>');
                });
            return text;
        }

        function processTwitters(data) {
            var domMenuIcon = document.querySelector(".menu-icon");
            // console.log('data: ', data);
            somethingFound = false;

            // if (data !== lastDataSet) {
            // lastDataSet = data;

            // keyWordsFromTextareaToArray();
            // tweetAccountsFromTextareaToArray();

            // loop through all tweets:
            for (var i = 0; i < data.length; i++) {

                // check if user is verified and if this setting is set
                if (data[i].user.verified === false && onlyVerifiedAccounts === true) {
                    stopNow = true;
                }

                // special accounts
                for (var j = 0; j < tweetAccounts.length; j++) {
                    if (data[i].user.screen_name === tweetAccounts[j]) {
                        isSpecialAccount = true;
                    }
                }

                if (isSpecialAccount === true) {
                    specialAccountHTMLcode = " specialAccount "; // space is important
                    if (localStorage.getItem("soundOn") === "true") alertSpecialAccount.play();
                } else {
                    specialAccountHTMLcode = "";
                }

                // if follower count of a tweeter of peticular tweet is higher than:
                if (data[i].user.followers_count >= numberOfFollowers && stopNow === false) {

                    // loop through all keywords:
                    for (var j = 0; j < keyWords.length; j++) {
                        // if keywords found, only last keyword, if there are more, will be remembered:
                        if (data[i].text.indexOf(keyWords[j]) > -1) {

                            keywordFound = true;
                            somethingFound = keywordFound;
                            currentKeyword = keyWords[j];
                        }
                    } // end keywords loop

                    // console.log('keywordFound: ', keywordFound);
                    if (keywordFound === true) {

                        domTemp = "<div class='tweet " + specialAccountHTMLcode +
                            "inviesieble col-md-12'><div class='card mb-4 pt-2 box-shadow'><div class='card-body'><div class='card-text'>" + 
                            "<span class='tweetNumber extra-info1'>#" +
                            tweetNumber + 
                            "</span> | " + 
                            "<small class='text-muted extra-info2'> <span class='extra-info3 tweetTimeStamp'>&#x1f550; " + 
                            timestampNow() +
                            "</span></small>" + 
                            "<p><img class='img-thumbnail float-left mr-3' src='" +
                            data[i].user.profile_image_url_https + "' alt=''> " + twitterLinks(data[i].text) +
                            "</p><p class='extra-info'>Name: " + data[i].user.name + 
                            // "<br>Verified: " +
                            // data[i].user.verified + 
                            // "<br>Keyword: " + 
                            // currentKeyword + 
                            // "</p>" + 
                            // "<p>" + 
                            " | Followers: " + data[i].user.followers_count +
                            " <button type='button' class='btn btn-primary select-tweet'>Select</button></p></div><div class='d-flex justify-content-between align-items-center'><a class='go-to-tweet btn btn-primary' target='_blank' rel='noopener' href='https://twitter.com/" + 
                            data[i].user.screen_name +
                            "/status/" + data[i].id_str +
                            "'><span class='tweet-instruction'>Go to tweet</a> now copy a suitable card and go to tweet</span>" + 
                            "</div></div></div></div>" + domTemp;

                        tweetNumber++;
                        keywordFound = false;
                    }
                    // console.log('domTemp: ', domTemp);

                }
                stopNow = false;
                isSpecialAccount = false;
            }

            if (somethingFound) {
                if (localStorage.getItem("soundOn") === "true") alert.play();
                console.log('domMenuIcon: ', domMenuIcon);
                domMenuIcon.classList.add('new-tweets');
                // console.log('domTemp: ', domTemp);
                // console.log('domTempOld: ', domTempOld);

                if (domTempOld !== domTemp) {
                    var k = 1;
                    tweets.insertAdjacentHTML("afterbegin", domTemp);

                    var invisibleTweets = document.querySelectorAll(".tweet.inviesieble");
                    // for (var i=0;i<invisibleTweets.length;i++) {
                    for (var i = invisibleTweets.length - 1; i > -1; i--) {
                        // this is for give tweets a little fade in so you can see there is something new. “visible” is a reserved word in Bootstrap
                        (function (i) {
                            setTimeout(function () {
                                invisibleTweets[i].classList.add("makeVisible");
                                setTimeout(function () {
                                    invisibleTweets[i].classList.remove("makeVisible");
                                    invisibleTweets[i].classList.remove("inviesieble");
                                }, 1000);

                            }, k);
                            k = k + 100;
                        }(i));
                    }
                }
                domTempOld = domTemp;
                domTemp = "";

            }
        }

        getJSON();
        fetchTweetsLoop = setInterval(getJSON, refreshInterval);

        function getJSON() {
            // AJAX GET
            var request = new XMLHttpRequest();
            request.open("GET", args.source, true);
            request.onload = function () {
                if (this.status >= 200 && this.status < 400) {
                    // Success!
                    // var resp = this.response;
                    // console.log('resp: ', typeof resp);
                    //http://stackoverflow.com/a/8416963
                    // json wordt als string gereturned, wil je json, doe dan

                    if (this.response) {
                        try {

                            // option 1:
                            // var resp2 = JSON.parse(this.response);
                            // console.log('resp2: ', resp2);
                            // resp2 = resp2.statuses;
                            // console.log('resp2: ', resp2);
                            // processTwitters(fixJSON(resp2));

                            // option 2:
                            var resp2 = this.response;
                            // console.log('resp2: ', resp2);
                            //clean up JSON, phase 1
                            var resp3 = resp2.replace(/,\:/g, ':');
                            resp3 = resp3.replace(/\:,/g, ':');
                            resp3 = resp3.replace(/",,/g, '",');
                            resp3 = resp3.replace(/,,"/g, ',"');
                            resp3 = resp3.replace(/\[,"/g, '[');
                            resp3 = resp3.replace(/,\]"/g, ']');
                            // console.log('resp3: ', resp3);
                            // var resp3 = resp2;
                            // var resp3 = resp2;

                            var resp4 = fixJSON(resp3);
                            console.log('resp4: ', resp4);
                            // var resp5 = JSON.parse(resp4);
                            // console.log('resp5: ', resp5);
                            var resp6 = resp4.statuses;
                            console.log('resp6: ', resp6);
                            processTwitters(resp6);

                            console.log("ok");
                            // status.innerHTML = "&#x1f550; " + timestampNow() + " – Status: " + language.status.ok;
                        } catch (e) {

                            // processTwitters(fixJSON(resp2));

                            console.log(e); // error in the above string (in this case, yes)!

                            // status.innerHTML = "&#x1f550; " + timestampNow() + " – Status: " + language.status.error;
                        }
                    }
                } else {
                    // We reached our target server, but it returned an error
                    console.log("error");
                }
            };

            request.onerror = function () {
                // There was a connection error of some sort
            };

            request.send();
        }
    }

    (function () {
        // update system, show message when update available
        var version = 0;
        var isVersionSet = false;
        var domNewVersionAvailable = document.querySelector("#newVersionAvailable");
        // var domUpdateButton = document.querySelector("#update");
        // domUpdateButton.addEventListener("click", function () {
        //     window.location = window.location;
        // }, false);

        function getScreenMessage() {
            // AJAX GET
            var request = new XMLHttpRequest();
            var path = args.source + "?t=" + new Date().getTime();
            request.open("GET", path, true);
            request.responseType = "text";

            request.onload = function () {
                if (this.status >= 200 && this.status < 400) {
                    if (!isVersionSet) {
                        version = +this.response;
                    }
                    isVersionSet = true;

                    if (+this.response > version) {
                        console.log("update available");
                        domNewVersionAvailable.classList.add("show");
                    }

                    if (this.response) {
                        try {
                            var resp2 = JSON.parse(this.response);
                            resp2 = resp2.statuses;

                        } catch (e) {
                            console.log(e);
                        }
                    }
                } else {
                    // We reached our target server, but it returned an error
                    console.log("error");
                }
            };

            request.onerror = function () {
                // There was a connection error of some sort
            };

            request.send();
        }
        // getScreenMessage();
        // setInterval(getScreenMessage, 4000);

    }());

    // followersSelect.addEventListener("change", function () {
    //     console.log(followersSelect.value);
    //     numberOfFollowers = followersSelect.value;
    //     // showNumberOfFollowers();
    //     // Notifier.config.default_timeout = "2000";
    //     // Notifier.info(language.notifications.numberOfFollowersSet);
    //     store.commit("showToast", language.notifications.appStarted);

    // }, false);

    // function keyWordsFromTextareaToArray() {
    //     var keyWordsInTextarea = domKeywords.value.split(",");
    //     keyWords = keyWordsInTextarea;
    // }
    // keyWordsFromTextareaToArray();

    // function tweetAccountsFromTextareaToArray() {
    //     var tweetAccountsInTextarea = domTweetAccounts.value.split(",");

    //     for (var i = 0; i < tweetAccountsInTextarea.length; i++) {
    //         tweetAccounts[i] = tweetAccountsInTextarea[i].trim();
    //     }
    // }
    // tweetAccountsFromTextareaToArray();


    // function storeDefaultKeywordsInLocalStorage() {
    //     // an if statement would not replace new search strings after reload
    //     // if (localStorage.getItem("defaultSearchStrings") === null) {    
    //     localStorage.setItem("defaultSearchStrings", domKeywords.value);
    //     // }
    // }
    // storeDefaultKeywordsInLocalStorage();

    // function storeDefaultTweetAccountsInLocalStorage() {
    //     // an if statement would not replace new search strings after reload
    //     // if (localStorage.getItem("defaultSearchStrings") === null) {    
    //     localStorage.setItem("defaultTweetAccounts", domTweetAccounts.value);
    //     // }
    // }
    // storeDefaultTweetAccountsInLocalStorage();

    function restoreDefaultKeywords() {
        localStorage.getItem("defaultSearchStrings");
        domKeywords.value = localStorage.getItem("defaultSearchStrings");
    }

    function emptyDefaultKeywords() {
        domKeywords.value = "";
    }

    function restoreTweetAccounts() {
        localStorage.getItem("defaultTweetAccounts");
        domTweetAccounts.value = localStorage.getItem("defaultTweetAccounts");
    }

    function emptyTweetAccounts() {
        domTweetAccounts.value = "";
    }

    // domStart.addEventListener("click", startStream, false);
    // domStop.addEventListener("click", stopLoop, false);
    // domRestoreKeyWords.addEventListener("click", restoreDefaultKeywords, false);
    // domEmptyKeyWords.addEventListener("click", emptyDefaultKeywords, false);
    // domRestoreTweetAccounts.addEventListener("click", restoreTweetAccounts, false);
    // domEmptyTweetAccounts.addEventListener("click", emptyTweetAccounts, false);
    // domTestTweetAccountsSound.addEventListener("click", function () {
    //     if (localStorage.getItem("soundOn") === "true") {
    //         alertSpecialAccount.play();
    //         navigator.serviceWorker.getRegistration()
    //             .then(reg => reg.showNotification("test"));
    //     }
    // }, false);


    return {
        start: startStream,
        stop: stopLoop
    };
}());