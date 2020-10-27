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
                                <h2 class="mt-3">Any of these strings of words</h2>
                                <div class="alert alert-info mt-3 col-md-12" role="alert">
                                    All changes work immediately.
                                </div>

                                <label class="" for="anyOfTheseStrings" id="labelAnyOfTheseStrings">Any of these strings of words, separated by a comma. Empty field shows all tweets containing “bitcoin”. Add your own:</label>
                                <textarea id="anyOfTheseStrings" name="anyOfTheseStrings" rows="5" class="form-control block p-3">bitcoin will never, bitcoin can never, bitcoin just is not, bitcoin is one big, criminals, slow, laundering, energy, complicated, unfair, quantum, tax evaders, unsustainable, intrinsic value, shut down, scammers, roulette, only 21, not safe, black market, terrorists, tulip, greater fool, not scalable, anarchists, distribution unfair, hacked, anonymous, unsustainable, useless, ponzi, no backing, will die, forbidden, shut down, scammers, not gdpr, price down, terrorists, privacy breach, volatile, useless, deflation, chinese</textarea>
                                <button id="restoreAnyOfTheseStringsDefault" type="button" class="btn btn-light mr-2">Reset</button><button id="emptyAnyOfTheseStrings" type="button" class="btn btn-light">Empty</button>
                            </div>
                            <hr class="mt-5">
                            <div class="form-group">
                                <h2 class="mt-3">None of these words</h2>
                                <label class="" for="noneOfTheseWordsUsersChoice" id="labelNoneOfTheseWordsUsersChoice">None of these words</label>
                                <textarea id="noneOfTheseWordsUsersChoice" name="noneOfTheseWordsUsersChoice" rows="5" class="form-control block p-3"></textarea>
                                <!-- <button id="restoreAnyOfTheseStringsDefault" type="button" class="btn btn-light mr-2">Reset</button><button id="emptyAnyOfTheseStrings" type="button" class="btn btn-light">Empty</button> -->
                            </div>

                            <p>Separate the words with a comma. Spaces matter, “action” will also find “traction”, “ action” wont.</p>

                        </div>

                        <!-- <div class="col-md-4 ml-auto">.col-md-4 .ml-auto</div> -->
                    </div>
                    <!-- <div class="row">
                        <div class="col-md-3 ml-auto">.col-md-3 .ml-auto</div>
                        <div class="col-md-2 ml-auto">.col-md-2 .ml-auto</div>
                    </div> -->
                    <!-- <div class="row">
                        <div class="col-md-6 ml-auto">.col-md-6 .ml-auto</div>
                    </div> -->
                    <!-- <div class="row">
                        <div class="col-sm-9">
                            Level 1: .col-sm-9
                            <div class="row">
                                <div class="col-8 col-sm-6">
                                    Level 2: .col-8 .col-sm-6
                                </div>
                                <div class="col-4 col-sm-6">
                                    Level 2: .col-4 .col-sm-6
                                </div>
                            </div>
                        </div>
                    </div> -->
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

            followers.addEventListener("change", function () {
                console.log(followers.value);
                realTimeTweets.setFollowersNumber(followers.value);
            }, false);
        },

        handleAnyOfTheseStrings() {
            var domAnyOfTheseStrings = document.querySelector("#anyOfTheseStrings");
            var domRestoreAnyOfTheseStringsDefault = document.querySelector("#restoreAnyOfTheseStringsDefault");
            var domEmptyAnyOfTheseStrings = document.querySelector("#emptyAnyOfTheseStrings");

            function emptyAnyOfTheseStrings() {
                console.log("empty");
                domAnyOfTheseStrings.value = "";
                realTimeTweets.setAnyOfTheseStrings([]);
                localStorage.setItem("defaultSearchStrings", "");
            }

            // get default string from array
            function restoreAnyOfTheseStringsDefault() {
                console.log(" hey hoi");
                domAnyOfTheseStrings.value = realTimeTweets.getAnyOfTheseStringsDefault().toString();
                realTimeTweets.setAnyOfTheseStrings(realTimeTweets.getAnyOfTheseStringsDefault());
                localStorage.setItem("defaultSearchStrings", realTimeTweets.getAnyOfTheseStringsDefault().toString());
            }

            // first save default search strings to a backup array
            realTimeTweets.setAnyOfTheseStringsDefault(domAnyOfTheseStrings.value.split(","));
            console.log(realTimeTweets.getAnyOfTheseStringsDefault);

            // then save it to the working array 
            realTimeTweets.setAnyOfTheseStrings(domAnyOfTheseStrings.value.split(","));

            // then save it to localStorage
            // localStorage.setItem("defaultSearchStrings", domAnyOfTheseStrings.value);

            // localStorage.getItem("defaultSearchStrings") exists…
            if (localStorage.getItem("defaultSearchStrings") !== null) {
                // …it can be an empty string…
                if (localStorage.getItem("defaultSearchStrings") === "") {
                    // then text area should also be empty:
                    domAnyOfTheseStrings.value = "";
                    // and working array should be empty:
                    realTimeTweets.setAnyOfTheseStrings([]);
                } else
                // … or filled
                {
                    // then replace default string with what is in local storage, if there is any
                    domAnyOfTheseStrings.value = localStorage.getItem("defaultSearchStrings");
                    // and working array should be empty:
                    realTimeTweets.setAnyOfTheseStrings(localStorage.getItem("defaultSearchStrings").split(","));
                }
            }

            domAnyOfTheseStrings.addEventListener("input", function () {
                // save default search strings to array
                realTimeTweets.setAnyOfTheseStrings(this.value.split(","));
                localStorage.setItem("defaultSearchStrings", this.value);
            }, false);

            domRestoreAnyOfTheseStringsDefault.addEventListener("click", restoreAnyOfTheseStringsDefault, false);
            domEmptyAnyOfTheseStrings.addEventListener("click", emptyAnyOfTheseStrings, false);
        },
        setNoneOfTheseWordsUsersChoice() {
            var noneOfTheseWordsUsersChoice = document.querySelector("#noneOfTheseWordsUsersChoice");

            noneOfTheseWordsUsersChoice.addEventListener("input", function () {
                var stringsInTextarea = this.value.split(",");
                console.log('stringsInTextarea: ', stringsInTextarea);

                realTimeTweets.setNoneOfTheseWordsUsersChoice(stringsInTextarea);
            }, false);
        },
        setOnlyVerifiedAccountsUsersChoice() {
            var onlyVerifiedAccountsUsersChoice = document.querySelector("#onlyVerifiedAccounts");

            onlyVerifiedAccountsUsersChoice.addEventListener("change", function () {
                var verified = false;

                if (this.checked === true) {
                    verified = true;
                } else {
                    verified = false;
                }

                // var verified = this.value;
                console.log('verified: ', verified);

                realTimeTweets.setOnlyVerifiedAccountsUsersChoice(verified);
            }, false);
        },

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
</style>
