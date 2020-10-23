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
    var curatedTweetText = "";
    var status = document.querySelector("#status span");
    var lastDataSet;


    // criteria

    var numberOfFollowersBackup = 750;
    var numberOfFollowers = numberOfFollowersBackup;


    var anyOfTheseWordsBackup = [
        "bitcoin will never", "bitcoin can never", "bitcoin just is not", "bitcoin is one big", "criminals", "slow", "laundering", "energy", "complicated", "unfair", "quantum", "tax evaders", "unsustainable", "intrinsic value", "shut down", "scammers", "roulette", "only 21", "not safe", "black market", "terrorists", "tulip", "greater fool", "not scalable", "anarchists", "distribution unfair", "hacked", " anonymous", "unsustainable", "useless", "ponzi", "no backing", "will die", "forbidden", "shut down", "scammers", "not gdpr", "price down", "terrorists", "privacy breach", "volatile", "useless", "deflation", "chinese"
    ];


    var onlyVerifiedAccountsUsersChoice = false;
    var anyOfTheseWords = anyOfTheseWordsBackup;
    var anyOfTheseWordsUsersChoice = [];
    var noneOfTheseWords = ["airdrop", "earn", "giveaway"];
    var noneOfTheseWordsUsersChoice = [];



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
        setInterval(function() {
            var allTimestamps = document.querySelectorAll('.timestamp');
            allTimestamps.forEach(function(a) {
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
        // var tweets = document.querySelector(".tweets-realtime");
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

        // join the hardcoded keywords with the users choice
        if (anyOfTheseWordsUsersChoice.length > 0) {
            anyOfTheseWords = arrayUnique(anyOfTheseWords.concat(anyOfTheseWordsUsersChoice));
        }

        // join the hardcoded keywords with the users choice
        if (noneOfTheseWordsUsersChoice.length > 0) {
            noneOfTheseWords = arrayUnique(noneOfTheseWords.concat(noneOfTheseWordsUsersChoice));
        }


        function loopThroughAllTweets(data) {
            // loop through all tweets:
            for (var i = 0; i < data.length; i++) {
                var onlyVerifiedAccountsUsersChoiceCriterium = false;
                var numberOfFollowersCriterium = false;
                var anyOfTheseWordsCriterium = false;
                var noneOfTheseWordsCriterium = false;

                if (data[i].curatedTweet === true) {
                    curatedClass = " curated ";
                    curatedTweetText = "<div class='col-12 mb-2 curated-tweet-text text-center'><small class='m-0'>~~Handpicked~~</small></div>";
                } else {
                    curatedClass = "";
                    curatedTweetText = "";
                }

                if (data[i].user.followers_count >= numberOfFollowers) {
                    numberOfFollowersCriterium = true;
                } else {
                    numberOfFollowersCriterium = false;
                }

                // loop through all anyOfTheseWords:


                if (data[i].user.verified === onlyVerifiedAccountsUsersChoice) {
                    onlyVerifiedAccountsUsersChoiceCriterium = true;
                } else {
                    onlyVerifiedAccountsUsersChoiceCriterium = false;
                }

                if (anyOfTheseWords.length === 0) {
                    anyOfTheseWordsCriterium = true;
                } else {
                    for (let j = 0; j < anyOfTheseWords.length; j++) {
                        // if anyOfTheseWords found, only last anyOfTheseWords, if there are more, will be remembered:
                        if (data[i].text.indexOf(anyOfTheseWords[j]) > -1) {
                            anyOfTheseWordsCriterium = true;
                            // somethingFound = keywordFound;
                            currentKeyword = anyOfTheseWords[j];
                        }
                    } // end anyOfTheseWords loop
                }

                if (noneOfTheseWords.length === 0) {
                    noneOfTheseWords = true; // there are now restrictions so tweet can be shown
                } else {
                    // loop through all noneOfTheseWords:
                    for (let j = 0; j < noneOfTheseWords.length; j++) {
                        // if noneOfTheseWords found, only last keyword, if there are more, will be remembered:
                        if (data[i].text.indexOf(noneOfTheseWords[j]) > -1) { //words are found
                            noneOfTheseWordsCriterium = false; // that means the criterium has NOT been met, and the tweet will not be shown
                        } else {
                            noneOfTheseWordsCriterium = true; // if no word has been found, then the tweet can be shown
                        }
                    } // end noneOfTheseWords loop
                }

                // console.log("===");
                // console.log('noneOfTheseWordsCriterium: ', noneOfTheseWordsCriterium);
                // console.log('anyOfTheseWordsCriterium: ', anyOfTheseWordsCriterium);
                // console.log('numberOfFollowersCriterium: ', numberOfFollowersCriterium);
                // console.log('data[i].curatedTweet: ', data[i].curatedTweet);

                if ((numberOfFollowersCriterium &&
                        onlyVerifiedAccountsUsersChoiceCriterium &&
                        anyOfTheseWordsCriterium &&
                        noneOfTheseWordsCriterium) ||
                    data[i].curatedTweet === true) {
                    somethingFound = true;
                    domTemp =
                    "<div class='card mb-3 tweet inviesieble "+ curatedClass +"'>" +
                        "<div class='card-body p-2'>" +
                            "<div class='row'>" +
                                curatedTweetText +
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
                                "<div class='col-6'>Name: "+ data[i].user.name +"</div>" +
                                "<div class='col-6'>Keyword</div>" +

                                "<div class='col-6 mb-3'>Verified: "+data[i].user.verified+"</div>" +
                                "<div class='col-6 mb-3'>Followers: "+ data[i].user.followers_count +"</div>" +

                                "<div class='col-6'></div>" +
                                "<div data-createdat='" + data[i].created_at + "' class='col-6 timestamp'>"+ timestampTweet(data[i].created_at) +"</div>" +
                            "</div>" +

                            "<div class='row'>" +
                                "<div class='col-6'><a class='go-to-tweet btn btn-primary m-1' target='_blank' rel='noopener' href='https://twitter.com/" + data[i].user.screen_name + "/status/" + data[i].id_str + "'>" + "Go to tweet</a></div>" +
                                "<div class='col-6 text-right'><button type='button' class='btn btn-primary mt-1 mr-1 ml-0 select-tweet'>Bookmark</button></div>" +
                            "</div>" +
                        "</div>" +
                    "</div>" +
                        domTemp;
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

    function toggleAllTweets() {
        if (anyOfTheseWords.length !== 0) {
            anyOfTheseWords = []; // don't do anyOfTheseWords.length = 0, that will affect anyOfTheseWordsBackup
        } else {
            anyOfTheseWords = anyOfTheseWordsBackup;
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

    function setAnyOfTheseWordsUsersChoice(a) {
        anyOfTheseWordsUsersChoice = a;
    }

    function setNoneOfTheseWordsUsersChoice(a) {
        noneOfTheseWordsUsersChoice = a;
    }

    function setOnlyVerifiedAccountsUsersChoice(a) {
        onlyVerifiedAccountsUsersChoice = a;
    }

    return {
        start: startStream,
        toggleAllTweets: toggleAllTweets,
        setFollowersNumber: setFollowersNumber,
        setAnyOfTheseWordsUsersChoice: setAnyOfTheseWordsUsersChoice,
        setNoneOfTheseWordsUsersChoice: setNoneOfTheseWordsUsersChoice,
        setOnlyVerifiedAccountsUsersChoice: setOnlyVerifiedAccountsUsersChoice
    };
}());