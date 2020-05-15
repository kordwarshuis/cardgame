<template>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header class="masthead mb-auto">
      <div class="inner">
        <nav class="mb-1 mt-0 navbar navbar-dark bg-dark">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <div class="alert alert-info mt-3" role="alert">
              All changes work immediately.
            </div>
            <label class="mt-3">
              <input type="radio" name="soundOnOf" id="soundOnOf1" value="on" checked="" /> Sound on
            </label>
            <label>
              <input type="radio" name="soundOnOf" id="soundOnOf2" value="of" /> Sound off
            </label>
            <hr>

            <div class="container p-0 ">
              <div class="row mt-4 mb-0 ml-0 mr-0 ">
                <p>Show tweets that contain “bitcoin” and…</p>
              </div>

              <div class="row mt-0 mb-4 ml-0 mr-0 no-gutters">
                <div class="col-sm p-0">

                  <label class="" for="followers" id="followersset">…the sender has </label>
                  <select name="followers" id="followers">
                    <option value="0">0</option>
                    <option value="500">500</option>
                    <option value="750" selected>750</option>
                    <option value="1000">1000</option>
                    <option value="2000">2000</option>
                    <option value="5000">5000</option>
                    <option value="10000t">10,000</option>
                    <option value="100000">100,000</option>
                    <option value="1000000">1 million</option>
                  </select>
                  or more followers.
                </div>
                <div class="col-sm">
                  <label for="onlyVerifiedAccounts">Show only verified accounts</label>
                  <input type="checkbox" id="onlyVerifiedAccounts" name="onlyVerifiedAccounts">

                </div>
              </div>
            </div>


            <label for="keywords">Add or delete search strings separated by comma. Spaces matter. Empty means all
              bitcoins tweets are shown.</label>

            <textarea id="keywords" name="keywords" rows="5" cols="33"
              class="w-100 p-3">criminals,slow,laundering,energy,complicated,unfair,quantum,tax evaders,unsustainable,intrinsic value,shut down,scammers,roulette,only 21,not safe,black market,terrorists,tulip,greater fool,not scalable,anarchists,distribution unfair,hacked, anonymous,unsustainable,useless,ponzi,no backing,will die,forbidden,shut down,scammers,not gdpr,price down,terrorists,privacy breach,volatile,useless,deflation,chinese</textarea>
            <button id="restoreKeyWords" type="button" class="btn btn-light mr-2">Reset</button><button
              id="emptyKeyWords" type="button" class="btn btn-light">Empty</button>

            <hr>
            <label for="tweetAccounts">The tweeps here will give an extra notification, visually and audibly <button
                id="testTweetAccountsSound" type="button" class="btn btn-light btn-sm mr-2">Listen</button> Add your
              favorite tweeps.</label>

            <textarea id="tweetAccounts" name="tweetAccounts" rows="5" cols="33"
              class="w-100 p-3">aantonop,saifedean,maxkeiser,jimmysong,lopp</textarea>
            <button id="restoreTweetAccounts" type="button" class="btn btn-light mr-2">Reset</button><button
              id="emptyTweetAccounts" type="button" class="btn btn-light">Empty</button>
            <hr>



          </div>
        </nav>
      </div>
    </header>

    <main role="main" class="inner cover">
      <h1 class="cover-heading">Bitcoin Tweets Tracker</h1>


      <!-- <h1>Bitcoin Tweets Tracker</h1> -->
      <!-- <a><a href="notifications-old.php">Old version.</a></p> -->
      <div id="status" class="alert alert-secondary mt-2 ml-0 mr-0" role="alert"><span>App not active.</span></div>
      <button id="start" type="button" class="btn btn-light">Start</button>
      <button id="stop" type="button" class="btn btn-light">Stop</button>
      <!-- <p>Tweets from accounts with at least <span id="numberOfFollowers"></span> followers.</p> -->
      <!-- <p id="status"><span>App not active.</span></p> -->



      <div id="newVersionAvailable">
        <p>New version available. <a id="update" href="">Update</a></p>
      </div>


      <div id="tweets" class="row"></div>
      <audio id="alert" src="@/assets/audio/330070__paulmorek__beep-05-single-2015-06-21.mp3"></audio>
      <audio id="alertSpecialAccount"
        src="@/assets/audio/175893__toiletrolltube__110923-02-falling-metal-10.mp3"></audio>
    </main>

    <footer class="mastfoot mt-auto">
      <div class="inner">

      </div>
    </footer>
  </div>

</template>

<script>
  import moment from "moment";
  import momentDurationFormat from "moment-duration-format";
  import {
    language
  } from "@/assets/js/Language.js";
  export default {
    mounted: function () {
      this.initTwitterRealTime();
    },
    methods: {
      initTwitterRealTime() {
        var refreshInterval = 10000;
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
        var keyWords = [];
        var tweetAccounts = [];
        var sound = true;
        var followersSelect = document.querySelector("#followers");
        var followersSetCounter = document.querySelector("#followersset span");

        var domKeywords = document.querySelector("#keywords");
        var domTweetAccounts = document.querySelector("#tweetAccounts");
        var onlyVerifiedAccounts = false;
        var domOnlyVerifiedAccounts = document.querySelector("#onlyVerifiedAccounts");
        domOnlyVerifiedAccounts.addEventListener("change", function () {
          if (domOnlyVerifiedAccounts.checked === true) {
            onlyVerifiedAccounts = true;
          } else {
            onlyVerifiedAccounts = false;
          }
          // console.log(domOnlyVerifiedAccounts);
        }, false);

        function showNumberOfFollowers() {
          document.querySelector("#numberOfFollowers").innerHTML = numberOfFollowers;
        }




        function timestampNu() {
          return moment().format("HH:mm:ss");
        }

        //TODO: change 'of' to 'off'
        (function soundSetting() {
          // radio buttons for sound on off:
          var soundButton = document.querySelectorAll('input[name = "soundOnOf"]');
          var i;

          // set radio buttons with localstorage value, if any:
          if (localStorage.getItem("soundOnOf") !== null) {
            var val = localStorage.getItem("soundOnOf"); // local storage value
            for (i = 0; i < soundButton.length; i++) {
              if (soundButton[i].value === val) {
                soundButton[i].checked = true; // marking the required radio as checked
              }
            }
          }

          // set soud variable based on radio buttons setting:
          for (i = 0; i < soundButton.length; i++) {
            if (soundButton[i].checked === true) {
              if (soundButton[i].value === "on") {
                sound = true;
              } else {
                sound = false;
              }
            }
          }

          // dealing with radio buttons user interactions:
          var prev = null; // not used here
          for (i = 0; i < soundButton.length; i++) {
            soundButton[i].addEventListener('change', function () {
              // (prev) ? console.log(prev.value): null;
              if (this !== prev) {
                prev = this;
              }

              localStorage.setItem("soundOnOf", this.value);
              if (this.value === "on") {
                sound = true;
              } else {
                sound = false;
              }
            });
          }
        }());



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
          status.innerHTML = language.status.appStopped;
          domStart.innerHTML = language.startbutton.start;
        }


        function init() {
          var tweets = document.querySelector("#tweets");
          var alert = document.querySelector("#alert");
          var alertSpecialAccount = document.querySelector("#alertSpecialAccount");
          var stopNow = false;
          var isSpecialAccount = false;
          var specialAccountHTMLcode = "";

          domStart.innerHTML = language.startbutton.started;
          status.innerHTML = language.status.appStarted;
          Notifier.config.default_timeout = "2000";
          Notifier.info(language.notifications.appStarted);


          if (sound) {
            alert.play();
            // alertSpecialAccount.play();
          }


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

            // console.log('data: ', data);
            somethingFound = false;

            // if (data !== lastDataSet) {
            // lastDataSet = data;

            keyWordsFromTextareaToArray();
            tweetAccountsFromTextareaToArray();

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
                if (sound) {
                  alertSpecialAccount.play();
                }
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
                    "inviesieble col-md-12'><div class='card mb-4 box-shadow'><div class='card-body'><div class='card-text'><img class='img-fluid float-left w-25 mr-3' src='" +
                    data[i].user.profile_image_url_https + "' alt=''><p>Name: " + data[i].user.name + "<br>Verified: " +
                    data[i].user.verified + "<br>Keyword: " + currentKeyword + "</p><p>" + twitterLinks(data[i].text) +
                    "</p><p>Followers: " + data[i].user.followers_count +
                    " | <a target='_blank' rel='noopener' href='https://twitter.com/" + data[i].user.screen_name +
                    "/status/" + data[i].id_str +
                    "'>Go to tweet</a></p></div><div class='d-flex justify-content-between align-items-center'><small class='text-muted'><span class='tweetNumber'>#" +
                    tweetNumber + "</span> <span class='tweetTimeStamp'>&#x1f550; " + timestampNu() +
                    "</span></small></div></div></div></div>" + domTemp;





                  tweetNumber++;
                  keywordFound = false;
                }
                // console.log('domTemp: ', domTemp);


              }
              stopNow = false;
              isSpecialAccount = false;
            }


            if (somethingFound) {
              if (sound) {
                alert.play();
              }
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
                  }(i))
                }
              }
              domTempOld = domTemp;
              domTemp = "";

            }
            // } 
            // else {
            // console.log("zelfde");
            // }//data !== lastDataSet


          }

          getJSON();
          // var kor = 
          fetchTweetsLoop = setInterval(getJSON, refreshInterval);

          function getJSON() {
            // AJAX GET
            var request = new XMLHttpRequest();

            // This should be an absolute path since this is the only location where tweets.json land
            // var path = "/t/twitter-phirehose/tweets.json?t=" + new Date().getTime();
            // var path = "https://blockchainbird.com/t/twitter-phirehose/tweets.json?t=" + new Date().getTime();
            var path = "php/phirehose-proxy.php";

            request.open("GET", path, true);
            // request.responseType = "json";
            // request.responseType = "text";
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
                    var resp3 = resp3.replace(/\:,/g, ':');
                    var resp3 = resp3.replace(/",,/g, '",');
                    var resp3 = resp3.replace(/,,"/g, ',"');
                    var resp3 = resp3.replace(/\[,"/g, '[');
                    var resp3 = resp3.replace(/,\]"/g, ']');
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
                    status.innerHTML = "&#x1f550; " + timestampNu() + " – Status: " + language.status.ok;
                  } catch (e) {

                    // processTwitters(fixJSON(resp2));

                    console.log(e); // error in the above string (in this case, yes)!

                    // status.innerHTML = "(at " +timestampNu() + "): " + language.status.error + ": " + e;
                    status.innerHTML = "&#x1f550; " + timestampNu() + " – Status: " + language.status.error;
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
          var domUpdateButton = document.querySelector("#update");
          domUpdateButton.addEventListener("click", function () {
            window.location = window.location
          }, false);

          function getScreenMessage() {
            // AJAX GET
            var request = new XMLHttpRequest();
            var path = "json/screen-messages.json?t=" + new Date().getTime();
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
          setInterval(getScreenMessage, 4000);

        }())




        followersSelect.addEventListener("change", function () {
          console.log(followersSelect.value);
          numberOfFollowers = followersSelect.value;
          // showNumberOfFollowers();
          Notifier.config.default_timeout = "2000";
          Notifier.info(language.notifications.numberOfFollowersSet);

        }, false);


        function keyWordsFromTextareaToArray() {
          var keyWordsInTextarea = domKeywords.value.split(",");
          keyWords = keyWordsInTextarea;
        }
        keyWordsFromTextareaToArray();

        function tweetAccountsFromTextareaToArray() {
          var tweetAccountsInTextarea = domTweetAccounts.value.split(",");

          for (var i = 0; i < tweetAccountsInTextarea.length; i++) {
            tweetAccounts[i] = tweetAccountsInTextarea[i].trim();
          }
        }
        tweetAccountsFromTextareaToArray();

        function storeDefaultKeywordsInLocalStorage() {
          // an if statement would not replace new search strings after reload
          // if (localStorage.getItem("defaultSearchStrings") === null) {    
          localStorage.setItem("defaultSearchStrings", domKeywords.value);
          // }
        }
        storeDefaultKeywordsInLocalStorage();

        function storeDefaultTweetAccountsInLocalStorage() {
          // an if statement would not replace new search strings after reload
          // if (localStorage.getItem("defaultSearchStrings") === null) {    
          localStorage.setItem("defaultTweetAccounts", domTweetAccounts.value);
          // }
        }
        storeDefaultTweetAccountsInLocalStorage();

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






        domStart.addEventListener("click", init, false);
        domStop.addEventListener("click", stopLoop, false);
        domRestoreKeyWords.addEventListener("click", restoreDefaultKeywords, false);
        domEmptyKeyWords.addEventListener("click", emptyDefaultKeywords, false);
        domRestoreTweetAccounts.addEventListener("click", restoreTweetAccounts, false);
        domEmptyTweetAccounts.addEventListener("click", emptyTweetAccounts, false);
        domTestTweetAccountsSound.addEventListener("click", function () {
          if (sound) {
            alertSpecialAccount.play();
            navigator.serviceWorker.getRegistration()
              .then(reg => reg.showNotification("kor"));

          }
        }, false);




        // set range indicator while dragging
        // followersSelect.addEventListener("input", function (e) {
        //   followersSetCounter.innerHTML = makeNonLinear(this.value);
        // })














        // return {
        //   showNumberOfFollowers: showNumberOfFollowers
        // }







      }
    }
  }
</script>

<style scoped lang="scss">

</style>