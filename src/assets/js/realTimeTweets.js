import store from "../../store/store";
import moment from "moment";
import {
    twitterLinks
} from "./twitterLinks";
import {
    language
} from "@/assets/js/language1.js";

// https://www.npmjs.com/package/platform-detect
import platform from 'platform-detect';
// import {ios, android, tizen} from 'platform-detect/os.mjs';

export var realTimeTweets = (function () {
    // console showing messages to user
    var konsole;
    document.addEventListener("DOMContentLoaded", function (event) {
        konsole = document.querySelector('.console .message');
    });

    var stopNow = false;
    var isSpecialAccount = false;

    var domTemp = "";
    var domTempOld = "x";

    var currentKeyword = "";

    var tweetNumber = 0;
    var tweetTypeText = "";


    // criteria

    var numberOfFollowersBackup = 0;
    var numberOfFollowers = numberOfFollowersBackup;

    var onlyVerifiedAccountsUsersChoice = false;

    var anyOfTheseStringsDefault = [];
    var anyOfTheseStrings = [];

    var noneOfTheseStringsDefault = [];
    var noneOfTheseStrings = [];

    var tweetAccounts = [];
    // var followersSelect = document.querySelector("#followers");
    var followersSetCounter = document.querySelector("#followersset span");

    // var domKeywords = document.querySelector("#keywords");
    // var domTweetAccounts = document.querySelector("#tweetAccounts");
    // var onlyVerifiedAccounts = false;
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

    function timestampTweet(time) {
        return moment.utc(time, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').fromNow();
    }

    function reCalculateTimestamp() {
        setInterval(function () {
            var allTimestamps = document.querySelectorAll('.timestamp');
            allTimestamps.forEach(function (a) {
                a.innerHTML = timestampTweet(a.dataset.createdat);
            });
        }, 60000);
    }
    reCalculateTimestamp();


    // https://stackoverflow.com/a/1584377
    function arrayUnique(array) {
        var a = array.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }


    function processTwitters(data) {
        var tweets = document.querySelector(".tweets-realtime .tweets");
        var domMenuIcon = document.querySelector(".menu-icon");
        var somethingFound = false;
        var handpickedClass = "";

        // if we dont remove tweets the DOM will be overpopulated and the browser will not keep up
        function removeOldestTweets() {
            let allTweets = tweets.querySelectorAll('.tweet');

            for (let i = 0; i < allTweets.length; i++) {
                // i determines how many tweets will stay, the rest will be deleted
                // make a distinction between operating systems
                if (platform.android || platform.ios || platform.tizen) {
                    if (i > 99) {
                        allTweets[i].parentNode.removeChild(allTweets[i]);
                    }
                } else {
                    if (i > 999) {
                        allTweets[i].parentNode.removeChild(allTweets[i]);
                    }
                }
            }
        }

        // 
        // Only for handpicked tweets; if the first element is true then all is true
        if (data[0].handpickedTweet === true) {
            // here we take one random tweet from an array, so the tweet stream is not flooded with handpicked tweets
            // pick random tweet from handpicked tweets:
            let selectedRandomTweet = randomValue(data);
            // empty the handpicked tweets array
            data = [];
            // create array with selected element
            data[0] = selectedRandomTweet;
        }

        function loopThroughAllTweets(data) {
            konsole.innerHTML = data.length + ' incoming tweets';

            // loop through all tweets:
            for (var i = 0; i < data.length; i++) {
                var onlyVerifiedAccountsUsersChoiceCriterium = false;
                var numberOfFollowersCriterium = false;
                var anyOfTheseStringsCriterium = false;
                var noneOfTheseStringsCriterium = false;

                // HANDPICKED TWEETS
                if (data[i].handpickedTweet === true) {
                    handpickedClass = " handpicked ";
                    tweetTypeText = "<div class='col-12 mb-2 handpicked-tweet-text text-center'><small class='m-0'>– Handpicked –</small></div>";
                } else {
                    handpickedClass = "";
                    tweetTypeText = "<div class='col-12 mb-2 realtime-tweet-text text-center'><small class='m-0'>– Real Time –</small></div>";
                }

                // NUMBER OF FOLLOWERS
                if (data[i].user.followers_count >= numberOfFollowers) {
                    numberOfFollowersCriterium = true;
                } else {
                    numberOfFollowersCriterium = false;
                }

                // VERIFIED USERS
                if (data[i].user.verified === onlyVerifiedAccountsUsersChoice) {
                    onlyVerifiedAccountsUsersChoiceCriterium = true;
                } else {
                    onlyVerifiedAccountsUsersChoiceCriterium = false;
                }

                // STRINGS THAT SHOULD EXIST IN TWEET TEXT
                if (anyOfTheseStrings.length === 0) {
                    anyOfTheseStringsCriterium = true;
                } else {
                    for (let j = 0; j < anyOfTheseStrings.length; j++) {

                        // if anyOfTheseStrings found, only last anyOfTheseStrings, if there are more, will be remembered:
                        if (data[i].text.toLowerCase().indexOf(anyOfTheseStrings[j].toLowerCase()) > -1) {
                            anyOfTheseStringsCriterium = true;
                            currentKeyword = anyOfTheseStrings[j];
                        }
                    } // end anyOfTheseStrings loop
                }

                // STRINGS THAT SHOULD NOT EXIST IN TWEET TEXT
                if (noneOfTheseStrings.length === 0) {
                    noneOfTheseStringsCriterium = true; // there are now restrictions so tweet can be shown
                } else {
                    // loop through all noneOfTheseStrings:
                    for (let j = 0; j < noneOfTheseStrings.length; j++) {
                        // if noneOfTheseStrings found, only last keyword, if there are more, will be remembered:
                        if (data[i].text.toLowerCase().indexOf(noneOfTheseStrings[j].toLowerCase()) > -1) { //strings are found
                            noneOfTheseStringsCriterium = false; // that means the criterium has NOT been met, and the tweet will not be shown
                        } else {
                            noneOfTheseStringsCriterium = true; // if no word has been found, then the tweet can be shown
                        }
                    } // end noneOfTheseStrings loop
                }

                if ((numberOfFollowersCriterium &&
                        onlyVerifiedAccountsUsersChoiceCriterium &&
                        anyOfTheseStringsCriterium &&
                        noneOfTheseStringsCriterium
                    ) ||
                    data[i].handpickedTweet === true) {
                    somethingFound = true;
                    domTemp =
                        "<div class='card mb-3 tweet newTweet" + handpickedClass + "'>" +
                        "<div class='card-body p-2'>" +
                        "<div class='row'>" +
                        tweetTypeText +
                        "<button class='close'><span class='visuallyhidden'>remove this tweet</span>×</button>" +
                        //IMAGE
                        "<div class='col-auto' >" +
                        "<img class='img-thumbnail float-left' src='" + data[i].user.profile_image_url_https + "' alt=''></img>" +
                        "</div>" +

                        // TEXT
                        "<div class='col pl-0'>" +
                        "<div class='row'>" +
                        // TWEET
                        "<div class='col-12'>" +
                        "<p>" + twitterLinks(data[i].text) + "</p>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +

                        "<div class='row mb-3'>" +
                        "<div class='col-6'>Name: " + data[i].user.name + "</div>" +
                        "<div class='col-6'>Keyword</div>" +

                        "<div class='col-6 mb-3'>Verified: " + data[i].user.verified + "</div>" +
                        "<div class='col-6 mb-3'>Followers: " + data[i].user.followers_count + "</div>" +

                        "<div class='col-6'></div>" +
                        "<div data-createdat='" + data[i].created_at + "' class='col-6 timestamp'>" + timestampTweet(data[i].created_at) + "</div>" +
                        "</div>" +

                        "<div class='row'>" +
                        "<div class='col-6'><a class='go-to-tweet btn btn-primary m-1' target='_blank' rel='noopener' href='https://twitter.com/" + data[i].user.screen_name + "/status/" + data[i].id_str + "'>" + "Go to tweet</a></div>" +
                        "<div class='col-6 text-right'><button type='button' class='btn btn-primary mt-1 mr-1 ml-0 select-tweet'>Bookmark</button></div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        domTemp;
                    tweetNumber++;
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
            if (domTempOld !== domTemp) {
                var k = 0;

                tweets.insertAdjacentHTML("afterbegin", domTemp);

                var newTweets = document.querySelectorAll(".newTweet");
                for (var i = newTweets.length - 1; i > -1; i--) {
                    (function (i) {
                        setTimeout(function () {
                            newTweets[i].classList.add("displayBlokTweet");
                            setTimeout(function () {
                                newTweets[i].classList.remove("newTweet");
                            }, 100);
                        }, k);
                        // k = k + 10;
                        // spread available tweets, every 10 sec new tweet set arrives, tweets spread over 9 secs, 1 sec pause
                        k = k + (Math.floor(9500/newTweets.length));
                    }(i));
                }
            }

            domTempOld = domTemp;
            domTemp = "";
        }

        removeOldestTweets();
    }

    function toggleAllTweets() {
        if (anyOfTheseStrings.length !== 0) {
            anyOfTheseStrings = []; // don't do anyOfTheseStrings.length = 0, that will affect anyOfTheseStringsDefault
            store.commit("showToast", language.tweetStream.message7);
        } else {
            store.commit("showToast", language.tweetStream.message8);
            anyOfTheseStrings = anyOfTheseStringsDefault;
        }

        if (numberOfFollowers !== 0) {
            numberOfFollowers = 0;
        } else {
            numberOfFollowers = numberOfFollowersBackup;
        }
    }

    function setFollowersNumber(a) {
        numberOfFollowers = a;
    }

    function setOnlyVerifiedAccountsUsersChoice(a) {
        onlyVerifiedAccountsUsersChoice = a;
    }


    function getAnyOfTheseStrings() {
        return anyOfTheseStrings;
    }

    function getAnyOfTheseStringsDefault() {
        return anyOfTheseStringsDefault;
    }

    function setAnyOfTheseStrings(a) {
        anyOfTheseStrings = a;
    }

    function setAnyOfTheseStringsDefault(a) {
        anyOfTheseStringsDefault = a;
    }








    function getNoneOfTheseStrings() {
        return noneOfTheseStrings;
    }

    function getNoneOfTheseStringsDefault() {
        return noneOfTheseStringsDefault;
    }

    function setNoneOfTheseStrings(a) {
        noneOfTheseStrings = a;
    }

    function setNoneOfTheseStringsDefault(a) {
        noneOfTheseStringsDefault = a;
    }

    return {
        start: processTwitters,
        toggleAllTweets: toggleAllTweets,
        setFollowersNumber: setFollowersNumber,
        setOnlyVerifiedAccountsUsersChoice: setOnlyVerifiedAccountsUsersChoice,

        setAnyOfTheseStrings: setAnyOfTheseStrings,
        setAnyOfTheseStringsDefault: setAnyOfTheseStringsDefault,
        getAnyOfTheseStrings: getAnyOfTheseStrings,
        getAnyOfTheseStringsDefault: getAnyOfTheseStringsDefault,

        setNoneOfTheseStrings: setNoneOfTheseStrings,
        setNoneOfTheseStringsDefault: setNoneOfTheseStringsDefault,
        getNoneOfTheseStrings: getNoneOfTheseStrings,
        getNoneOfTheseStringsDefault: getNoneOfTheseStringsDefault,
    };
}());