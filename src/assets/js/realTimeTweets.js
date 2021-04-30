import store from "../../store/store";
import {
    twitterLinks
} from "./twitterLinks";
import {
    timestampTweet
} from "@/assets/js/calculateTweetTimeStamps";

// https://www.npmjs.com/package/platform-detect
import platform from 'platform-detect';
// import {ios, android, tizen} from 'platform-detect/os.mjs';

import {
    tweetStreamAttentionSeeker
} from '@/assets/js/tweetStreamAttentionSeeker';

export var realTimeTweets = (function () {
    // console showing messages to user
    var konsole;
    document.addEventListener("DOMContentLoaded", function (event) {
        konsole = document.querySelector('.console .message');
    });

    var stringTweets = "";
    var currentKeyword = "";
    var tweetTypeText = "";
    var delaySoundTimer = 0; // restrict how often new-tweet-sound plays

    // criteria
    var numberOfFollowersBackup = 0;
    var numberOfFollowers = numberOfFollowersBackup;
    var onlyVerifiedAccountsUsersChoice = false;
    var anyOfTheseStringsDefault = [];
    var anyOfTheseStrings = [];
    var noneOfTheseStringsDefault = [];
    var noneOfTheseStrings = [];


    // mechanism to prevent new-tweets-sound to play too often
    setInterval(function () {
        delaySoundTimer += 10000; // increase timer every 10 sec
    }, 10000);

    function processTwitters(data) { // runs every ten seconds
        var tweets = document.querySelector(".tweets-realtime .tweets");
        var domMenuIcon = document.querySelector(".menu-icon");
        var tweetsPassedFilter = 0;

        // new cycle, so remove all .newTweets
        document.querySelectorAll('.newTweet').forEach(function (a) {
            a.classList.remove('newTweet');
        });

        // keep number of tweets lower than a certain number
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

        function loopThroughAllTweets(data) {
            for (var i = 0; i < data.length; i++) {
                // for every tweet set back to false
                var onlyVerifiedAccountsUsersChoiceCriterium = false;
                var numberOfFollowersCriterium = false;
                var anyOfTheseStringsCriterium = false;
                var noneOfTheseStringsCriterium = false;

                /*
                 * CHECK CRITERIA FOR TWEET
                 */

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
                    noneOfTheseStringsCriterium = true; // there are no restrictions so tweet can be shown
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

                /*
                 * IF CRITERIA ARE MET FOR THIS TWEET
                 */
                if (numberOfFollowersCriterium &&
                    onlyVerifiedAccountsUsersChoiceCriterium &&
                    anyOfTheseStringsCriterium &&
                    noneOfTheseStringsCriterium
                ) {
                    console.log("++++++++++++++++++ ");

                    // special occasion
                    if (data[i].user.followers_count > 100000) {
                        window.cardgameEvent.$emit('startStopTypewriter', 'A tweet with more than 100 000 followers was just posted.');
                    }

                    stringTweets =
                        "<div class='card mb-3 pt-3 tweet newTweet displayBlokTweet" + "'>" +
                        "<div class='card-body p-2'>" +
                        "<div class='row'>" +
                        tweetTypeText +
                        "<button class='close'><span class='visuallyhidden'>remove this tweet</span>×</button>" +
                        //IMAGE
                        "<div class='col-auto' >" +
                        "<img style='width: 50px;' class='float-left' src='" + data[i].user.profile_image_url_https + "' alt=''></img>" +
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
                        "<div class='col-6'>Keyword: " + currentKeyword + "</div>" +

                        "<div class='col-6 mb-3'>Verified: " + data[i].user.verified + "</div>" +
                        "<div class='col-6 mb-3'>Followers: <span class='followerscount' data-followerscount='" + data[i].user.followers_count + "'>" + data[i].user.followers_count + "</span></div>" +

                        "<div class='col-6'></div>" +
                        "<div data-createdate='" + data[i].created_at + "' data-timestampms='" + data[i].timestamp_ms + "' class='col-6 timestamptweet timestampms'>" + timestampTweet(data[i].created_at) + "</div>" +
                        "</div>" +

                        "<div class='row'>" +
                        "<div class='col-6'><a class='go-to-tweet btn btn-primary m-1' target='_blank' rel='noopener' href='https://twitter.com/" + data[i].user.screen_name + "/status/" + data[i].id_str + "'>" + "Go to tweet</a></div>" +
                        "<div class='col-6 text-right'><button type='button' class='btn btn-primary mt-1 mr-1 ml-0 select-tweet'>Bookmark</button></div>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        stringTweets;
                } 
            }
        }

        loopThroughAllTweets(data);

        console.log("-----------");

        if (localStorage.getItem("soundOn") === "true") {
            // mechanism to prevent new-tweets-sound to play too often
            if (delaySoundTimer > 300000) {
                alert.play();
                delaySoundTimer = 0;
            }
        }

        // if new tweets have arrived to be inserted
        if (stringTweets !== "") {
            domMenuIcon.classList.add('new-tweets');

            tweets.insertAdjacentHTML("afterbegin", stringTweets);

            var newTweets = document.querySelectorAll(".newTweet");
            tweetsPassedFilter = newTweets.length;
            console.log('tweetsPassedFilter: ', tweetsPassedFilter);
            konsole.innerHTML = data.length + ' new tweets, ' + tweetsPassedFilter + ' passed filter.';

            tweetStreamAttentionSeeker();
        }

        stringTweets = "";

        removeOldestTweets();
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
        start: processTwitters, // called every ten seconds
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