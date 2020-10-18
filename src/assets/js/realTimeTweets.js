import moment from "moment";
import {
    twitterLinks
} from "./twitterLinks";

export var realTimeTweets = (function () {
    var stopNow = false;
    var isSpecialAccount = false;
    var specialAccountHTMLcode = "";


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

    var tweetNumber = 0;
    var status = document.querySelector("#status span");
    var lastDataSet;


    // criteria

    var numberOfFollowers = 750;

    var anyOfTheseWords = ["criminals", "slow", "laundering", "energy", "complicated", "unfair", "quantum", "tax evaders", "unsustainable", "intrinsic value", "shut down", "scammers", "roulette", "only 21", "not safe", "black market", "terrorists", "tulip", "greater fool", "not scalable", "anarchists", "distribution unfair", "hacked", " anonymous", "unsustainable", "useless", "ponzi", "no backing", "will die", "forbidden", "shut down", "scammers", "not gdpr", "price down", "terrorists", "privacy breach", "volatile", "useless", "deflation", "chinese"];

    var noneOfTheseWords = ["airdrop", "earn"];





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


    var randomValue = function (myArray) {
        return myArray[Math.floor(Math.random() * myArray.length)];
    };

    function showNumberOfFollowers() {
        document.querySelector("#numberOfFollowers").innerHTML = numberOfFollowers;
    }

    function timestampNow() {
        return moment().format("HH:mm:ss");
    }



    function processTwitters(data) {
        var tweets = document.querySelector(".tweets-realtime .tweets");
        var domMenuIcon = document.querySelector(".menu-icon");
        var somethingFound = false;
        var curatedClass = "";

    

        // if we dont remove tweets the DOM will be overpopulated and the browser will not keep up
        function removeOldestTweets() {
            let allTweets = tweets.querySelectorAll('.tweet');

            for (let i = 0; i < allTweets.length; i++) {
                // i determines how many tweets will stay, the rest will be deleted
                if (i > 99) {
                    allTweets[i].parentNode.removeChild(allTweets[i]);
                }
            }
        }

        // 
        // Only for curated tweets; if the first element is true then all is true
        if (data[0].curatedTweet === true) {
            console.log("curated");
            // here we take one random tweet from an array, so the tweet stream is not flooded with curated tweets
            // pick random tweet from curated tweets:
            let selectedRandomTweet = randomValue(data);
            // empty the curated tweets array
            data = [];
            // create array with selected element
            data[0] = selectedRandomTweet;
        }



        function loopThroughAllTweets(data) {    
            // loop through all tweets:
            for (var i = 0; i < data.length; i++) {
                var numberOfFollowersCriterium = false;
                var anyOfTheseWordsCriterium = false;
                var noneOfTheseWordsCriterium = false;
    
                if (data[i].curatedTweet === true) {
                    curatedClass = " curated ";
                } else {
                    curatedClass = "";
                }

                if (data[i].user.followers_count >= numberOfFollowers) {
                    numberOfFollowersCriterium = true;
                } else {
                    numberOfFollowersCriterium = false;
                }

                // loop through all anyOfTheseWords:
                for (var j = 0; j < anyOfTheseWords.length; j++) {
                    // if anyOfTheseWords found, only last anyOfTheseWords, if there are more, will be remembered:
                    if (data[i].text.indexOf(anyOfTheseWords[j]) > -1) {
                        anyOfTheseWordsCriterium = true;
                        // somethingFound = keywordFound;
                        currentKeyword = anyOfTheseWords[j];
                    } else {
                        // anyOfTheseWordsCriterium = false;
                    }
                } // end anyOfTheseWords loop

                // loop through all noneOfTheseWords:
                for (var j = 0; j < noneOfTheseWords.length; j++) {
                    // if noneOfTheseWords found, only last keyword, if there are more, will be remembered:
                    if (data[i].text.indexOf(noneOfTheseWords[j]) > -1) {
                        noneOfTheseWordsCriterium = false;
                    } else {
                        noneOfTheseWordsCriterium = true;
                    }
                } // end noneOfTheseWords loop



                console.log("===");
                console.log('noneOfTheseWordsCriterium: ', noneOfTheseWordsCriterium);
                console.log('anyOfTheseWordsCriterium: ', anyOfTheseWordsCriterium);
                console.log('numberOfFollowersCriterium: ', numberOfFollowersCriterium);
                console.log('data[i].curatedTweet: ', data[i].curatedTweet);

                if ((numberOfFollowersCriterium && anyOfTheseWordsCriterium && noneOfTheseWordsCriterium) || data[i].curatedTweet === true) {
                    somethingFound = true;
                    domTemp = "<div class='tweet " + curatedClass + specialAccountHTMLcode +
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
                        "'>Go to tweet</a> <span class='tweet-instruction'>now copy a suitable card and go to tweet</span>" +
                        "</div></div></div></div>" + domTemp;

                    tweetNumber++;
                    keywordFound = false;
                } else {
                    somethingFound = false;
                }
                stopNow = false;
                isSpecialAccount = false;
            }
        }

        loopThroughAllTweets(data);








        if (somethingFound) {
            if (localStorage.getItem("soundOn") === "true") alert.play();
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

        removeOldestTweets();
    }

    function startStream(data) {
        processTwitters(data);
    }

    return {
        start: startStream
    };
}());