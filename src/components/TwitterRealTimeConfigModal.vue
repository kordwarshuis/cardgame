<template>
<!-- Modal -->
<div class="modal fade" id="tweetStreamConfigurationModal" tabindex="-1" role="dialog" aria-labelledby="tweetStreamConfigurationModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="tweetStreamConfigurationModalLabel">Tweetstream configuration</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="alert alert-info mt-3 col-md-12" role="alert">
                            All changes work immediately.
                        </div>
                        <div class="col-md-12">
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
                        </div>

                        <div class="col-md-12 mt-3">
                            <div class="form-group">
                                <label class="" for="followers" id="labelAnyOfTheseWordsUsersChoice">Words that should be in the tweet (spaces matter, “action” will also find “traction”, “ action” wont.) </label>
                                <textarea id="anyOfTheseWordsUsersChoice" name="anyOfTheseWordsUsersChoice" rows="5" class="form-control block p-3"></textarea>
                                <!-- <button id="restoreKeyWords" type="button" class="btn btn-light mr-2">Reset</button><button id="emptyKeyWords" type="button" class="btn btn-light">Empty</button> -->
                            </div>
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
        this.setAnyOfTheseWordsUsersChoice();
    },
    methods: {
        setFollowersNumber() {
            var followers = document.querySelector("#followers");

            followers.addEventListener("change", function () {
                console.log(followers.value);
                realTimeTweets.setFollowersNumber(followers.value);
            }, false);

        },
        setAnyOfTheseWordsUsersChoice() {
            var anyOfTheseWordsUsersChoice = document.querySelector("#anyOfTheseWordsUsersChoice");

            anyOfTheseWordsUsersChoice.addEventListener("input", function () {
                // var that = this;
                var keyWordsInTextarea = this.value.split(",");
                console.log('keyWordsInTextarea: ', keyWordsInTextarea);

                realTimeTweets.setAnyOfTheseWordsUsersChoice(keyWordsInTextarea);
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
</style>
