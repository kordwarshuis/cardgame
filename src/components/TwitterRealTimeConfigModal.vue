<template>
<!-- Modal -->
<div class="modal fade" id="tweetStreamConfigurationModal" tabindex="-1" role="dialog" aria-labelledby="tweetStreamConfigurationModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="tweetStreamConfigurationModalLabel">Tweetstream configuration</h1>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="alert alert-info mt-3 col-md-12" role="alert">
                                All changes work immediately.
                            </div>

                            <!-- <button id="show-all">Show all tweets</button> -->
                            <hr class="mt-5">
                            <h2 class="mt-3">Followers</h2>
                            <label class="" for="followers" id="labelFollowers">Poster has </label>
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
                            <hr class="mt-5">
                            <h2 class="mt-3">Verified</h2>
                            <input class="mr-3" type="checkbox" id="onlyVerifiedAccounts" name="onlyVerifiedAccounts">
                            <label for="onlyVerifiedAccounts">Show only verified accounts.</label>
                            <hr class="mt-5">
                            <div class="form-group">
                                <h2 class="mt-3">Any of these strings or words</h2>
                                <div class="alert alert-info mt-3 col-md-12" role="alert">
                                    All changes work immediately.
                                </div>

                                <label class="" for="anyOfTheseStrings" id="labelAnyOfTheseStrings">Any of these strings of words, separated by a comma. Empty field shows all tweets containing “bitcoin”. Add your own:</label>
                                <textarea id="anyOfTheseStrings" name="anyOfTheseStrings" rows="5" class="form-control block p-3">bitcoin will never, bitcoin can never, bitcoin just is not, bitcoin is one big, criminals, slow, laundering, energy, complicated, unfair, quantum, tax evaders, unsustainable, intrinsic value, shut down, scammers, roulette, only 21, not safe, black market, terrorists, tulip, greater fool, not scalable, anarchists, distribution unfair, hacked, anonymous, unsustainable, useless, ponzi, no backing, will die, forbidden, shut down, scammers, not gdpr, price down, terrorists, privacy breach, volatile, useless, deflation, chinese</textarea>
                                <button id="restoreAnyOfTheseStringsDefault" type="button" class="btn btn-light mr-2">Reset</button><button id="emptyAnyOfTheseStrings" type="button" class="btn btn-light">Empty</button>
                            </div>
                            <hr class="mt-5">

                            <div class="form-group">
                                <h2 class="mt-3">None of these strings or words</h2>
                                <label class="" for="noneOfTheseStrings" id="labelNoneOfTheseStrings">None of these words</label>
                                <textarea id="noneOfTheseStrings" name="noneOfTheseStrings" rows="5" class="form-control block p-3">I've hacked your computer,play online casino,Airdrop,All you have to do is RT,I will give one random follower,I will give someone</textarea>
                                <button id="restoreNoneOfTheseStringsDefault" type="button" class="btn btn-light mr-2">Reset</button><button id="emptyNoneOfTheseStrings" type="button" class="btn btn-light">Empty</button>
                            </div>

                            <p>Separate the words with a comma. Spaces matter, “action” will also find “traction”, “ action” wont.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    realTimeTweets
} from "@/assets/js/realTimeTweets.js";
export default {
    name: "TwitterRealTimeConfigModal",
    mounted: function () {
        this.setFollowersNumber();
        this.handleAnyOfTheseStrings();
        this.handleNoneOfTheseStrings();
        this.setOnlyVerifiedAccountsUsersChoice();
        // this.showAllTweets();
    },
    methods: {
        // showAllTweets() {
        //     var button = document.querySelector('#show-all');
        //     button.addEventListener('click', function () {
        //         document.querySelector('#followers').value = 0;
        //     }, false);
        // },
        setFollowersNumber() {
            var followers = document.querySelector("#followers");

            // set initially
            // if a value is set in localStorage earlier…
            if (localStorage.getItem("followersNumber") !== null) {
                // …use this value
                // for the real time tweets
                realTimeTweets.setFollowersNumber(localStorage.getItem("followersNumber"));
                // and also set the dropdown to new number
                followers.value = localStorage.getItem("followersNumber");

            } else {
                realTimeTweets.setFollowersNumber(followers.value);
            }

            // set on change
            followers.addEventListener("change", function () {
                realTimeTweets.setFollowersNumber(followers.value);
                localStorage.setItem("followersNumber", followers.value);
            }, false);
        },

        handleAnyOfTheseStrings() {
            var domAnyOfTheseStrings = document.querySelector("#anyOfTheseStrings");
            var domRestoreAnyOfTheseStringsDefault = document.querySelector("#restoreAnyOfTheseStringsDefault");
            var domEmptyAnyOfTheseStrings = document.querySelector("#emptyAnyOfTheseStrings");

            function emptyAnyOfTheseStrings() {
                domAnyOfTheseStrings.value = "";
                realTimeTweets.setAnyOfTheseStrings([]);
                localStorage.setItem("anyOfTheseStrings", "");
            }

            // get default string from array
            function restoreAnyOfTheseStringsDefault() {
                domAnyOfTheseStrings.value = realTimeTweets.getAnyOfTheseStringsDefault().toString();
                realTimeTweets.setAnyOfTheseStrings(realTimeTweets.getAnyOfTheseStringsDefault());
                localStorage.setItem("anyOfTheseStrings", realTimeTweets.getAnyOfTheseStringsDefault().toString());
            }

            // first save default search strings to a backup array
            // apparently this runs twice. The first time the backup array is filled with what is hardcoded in the input field, the second time this should not run since the input might be empty by then
            //TODO: find out why this runs twice
            if (realTimeTweets.getAnyOfTheseStringsDefault().length === 0) {
                realTimeTweets.setAnyOfTheseStringsDefault(domAnyOfTheseStrings.value.split(","));
            }

            // then save it to the working array 
            realTimeTweets.setAnyOfTheseStrings(domAnyOfTheseStrings.value.split(","));

            // then save it to localStorage
            // localStorage.setItem("anyOfTheseStrings", domAnyOfTheseStrings.value);

            // localStorage.getItem("anyOfTheseStrings") exists…
            if (localStorage.getItem("anyOfTheseStrings") !== null) {
                // …it can be an empty string…
                if (localStorage.getItem("anyOfTheseStrings") === "") {
                    // then text area should also be empty:
                    domAnyOfTheseStrings.value = "";
                    // and working array should be empty:
                    realTimeTweets.setAnyOfTheseStrings([]);
                } else
                // … or filled
                {
                    // then replace default string with what is in local storage, if there is any
                    domAnyOfTheseStrings.value = localStorage.getItem("anyOfTheseStrings");
                    // and working array should be empty:
                    realTimeTweets.setAnyOfTheseStrings(localStorage.getItem("anyOfTheseStrings").split(","));
                }
            }

            domAnyOfTheseStrings.addEventListener("input", function () {
                // save default search strings to array
                realTimeTweets.setAnyOfTheseStrings(this.value.split(","));
                localStorage.setItem("anyOfTheseStrings", this.value);
            }, false);

            domRestoreAnyOfTheseStringsDefault.addEventListener("click", restoreAnyOfTheseStringsDefault, false);
            domEmptyAnyOfTheseStrings.addEventListener("click", emptyAnyOfTheseStrings, false);
        },
        handleNoneOfTheseStrings() {

            var domNoneOfTheseStrings = document.querySelector("#noneOfTheseStrings");
            var domRestoreNoneOfTheseStringsDefault = document.querySelector("#restoreNoneOfTheseStringsDefault");
            var domEmptyNoneOfTheseStrings = document.querySelector("#emptyNoneOfTheseStrings");

            function emptyNoneOfTheseStrings() {
                domNoneOfTheseStrings.value = "";
                realTimeTweets.setNoneOfTheseStrings([]);
                localStorage.setItem("noneOfTheseStrings", "");
            }

            // get default string from array
            function restoreNoneOfTheseStringsDefault() {
                domNoneOfTheseStrings.value = realTimeTweets.getNoneOfTheseStringsDefault().toString();
                realTimeTweets.setNoneOfTheseStrings(realTimeTweets.getNoneOfTheseStringsDefault());
                localStorage.setItem("noneOfTheseStrings", realTimeTweets.getNoneOfTheseStringsDefault().toString());
            }

            // first save default search strings to a backup array
            // apparently this runs twice. The first time the backup array is filled with what is hardcoded in the input field, the second time this should not run since the input might be empty by then
            //TODO: find out why this runs twice
            if (realTimeTweets.getNoneOfTheseStringsDefault().length === 0) {
                realTimeTweets.setNoneOfTheseStringsDefault(domNoneOfTheseStrings.value.split(","));
            }

            // then save it to the working array 
            realTimeTweets.setNoneOfTheseStrings(domNoneOfTheseStrings.value.split(","));

            // localStorage.getItem("noneOfTheseStrings") exists…
            if (localStorage.getItem("noneOfTheseStrings") !== null) {
                // …it can be an empty string…
                if (localStorage.getItem("noneOfTheseStrings") === "") {
                    // then text area should also be empty:
                    domNoneOfTheseStrings.value = "";
                    // and working array should be empty:
                    realTimeTweets.setNoneOfTheseStrings([]);
                } else
                // … or filled
                {
                    // then replace default string with what is in local storage, if there is any
                    domNoneOfTheseStrings.value = localStorage.getItem("noneOfTheseStrings");
                    // and working array should be empty:
                    realTimeTweets.setNoneOfTheseStrings(localStorage.getItem("noneOfTheseStrings").split(","));
                }
            }

            domNoneOfTheseStrings.addEventListener("input", function () {
                // save default search strings to array
                realTimeTweets.setNoneOfTheseStrings(this.value.split(","));
                localStorage.setItem("noneOfTheseStrings", this.value);
            }, false);

            domRestoreNoneOfTheseStringsDefault.addEventListener("click", restoreNoneOfTheseStringsDefault, false);
            domEmptyNoneOfTheseStrings.addEventListener("click", emptyNoneOfTheseStrings, false);
        },

        // setNoneOfTheseWordsUsersChoice() {
        //     var noneOfTheseWordsUsersChoice = document.querySelector("#noneOfTheseWordsUsersChoice");

        //     noneOfTheseWordsUsersChoice.addEventListener("input", function () {
        //         var a = this.value.split(",");
        //         realTimeTweets.setNoneOfTheseWordsUsersChoice(a);
        //     }, false);
        // },
        setOnlyVerifiedAccountsUsersChoice() {
            var onlyVerifiedAccountsUsersChoice = document.querySelector("#onlyVerifiedAccounts");

            if (localStorage.getItem("onlyVerifiedAccounts") !== null) {
                if (localStorage.getItem("onlyVerifiedAccounts") === 'true') {
                    onlyVerifiedAccountsUsersChoice.checked = true;
                    realTimeTweets.setOnlyVerifiedAccountsUsersChoice(true);
                }
                if (localStorage.getItem("onlyVerifiedAccounts") === 'false') {
                    onlyVerifiedAccountsUsersChoice.checked = false;
                    realTimeTweets.setOnlyVerifiedAccountsUsersChoice(false);
                }
            }

            onlyVerifiedAccountsUsersChoice.addEventListener("change", function () {
                if (this.checked === true) {
                    localStorage.setItem("onlyVerifiedAccounts", 'true');
                    realTimeTweets.setOnlyVerifiedAccountsUsersChoice(true);
                } else {
                    localStorage.setItem("onlyVerifiedAccounts", 'false');
                    realTimeTweets.setOnlyVerifiedAccountsUsersChoice(false);
                }
            }, false);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
// https://github.com/jquery/jquery-mobile/issues/2069
select {
    font-size: 18px;
}

h1,
h2 {
    font-size: 1rem;
}

// https://stackoverflow.com/a/26917844
.close {
  font-size: 2em;
  color: #eee;
}
.close:hover {
    color: #fff;
}
</style>
