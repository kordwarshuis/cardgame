<template>
<section class=" my-0">
    <h1 class="text-center ">Bitcoin Card Game Score Board</h1>
    <div class="container shape-container d-flex ">
        <div class="col px-0">

            <div class="row justify-content-center ">
                <div class="col-lg-12 col-sm-12">
                    <!-- <date-pickers @eventDatePicked="testDatePicked"></date-pickers> -->

                </div>
            </div>

            <div class="row justify-content-center ">
                <div class="col-lg-4 col-sm-6">
                    <div class="card border-primary mb-3 p-4">
                        <div class="card-header">
                            <h2 class="">Scores</h2>
                        </div>
                        <div class="card-body">
                            <ul class="">
                                <li v-for="item in scores" :key="item.id">{{ item.name }}, {{ item.id }}</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div class="col-lg-4 col-sm-6">
                    <div class="card border-primary mb-3 p-4">
                        <div class="card-header">
                            <h2 class="">Most retweets</h2>
                        </div>

                        <div class="card-body">
                            <ol class="">
                                <li v-for="tweet in sortedTweets" :key="tweet.id">{{ tweet.name }},
                                    {{ tweet.weekreport[0].retweet_count }} retweets.</li>
                            </ol>
                            <!-- <base-button tag="button" class="mb-3 mb-sm-0 btn btn-1 " type="white" icon="ni ni-cloud-download-95" @click="fetchScores()">
                                Get Scores
                            </base-button> -->
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-sm-6">
                    <div class="card border-primary mb-3 p-4">
                        <div class="card-header">
                            <h2 class="">Most followers</h2>
                        </div>

                        <div class="card-body">
                            <ol class="">
                                <li v-for="tweet in sortedFavorites" :key="tweet.id">{{ tweet.name }},
                                    {{ tweet.weekreport[0].favorite_count }} followers.</li>
                            </ol>
                            <!-- <base-button tag="button" class="mb-3 mb-sm-0 btn btn-1 " type="white" icon="ni ni-cloud-download-95" @click="fetchScores()">
                                Get Scores
                            </base-button> -->
                        </div>
                    </div>
                </div>

                <div class="col-lg-7 text-center pt-lg">
                    <!-- <img src="img/brand/white.png" style="width: 200px;" class="img-fluid"> -->
                    <!-- <p class="lead mt-4 mb-5">A beautiful Design System for Bootstrap 4. It's Free and Open Source.
            </p> -->

                    <div class="btn-wrapper">

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import moment from "moment";
import axios from "axios";
// import DatePickers from "./components/JavascriptComponents/DatePickers";

export default {
    name: "Scores",
    data() {
        return {
            loading: true,
            scores: null,
            sortedTweets: '',
            sortedFavorites: ''
        }
    },
    mounted: function () {
        this.fetchScores();
    },
    methods: {
        getScores() {
            return axios.get("https://blockchainbird.com/data/cardgamescores.php")
                .then(response => {
                    this.results = response.data.gamedata;
                    return this.results;
                });
        },

        // testDatePicked(datePicked) {
        //     // this.calculateHighestTweet(moment(datePicked, "YYYY-MM-DD").week());

        //     alert("Er wordt nog niks met deze keuze gedaan maar hier is alvast de keuze weergegeven: " + datePicked +
        //         " Dit is weeknr: " + moment(datePicked, "YYYY-MM-DD").week());
        // },
        fetchScores() {
            return this.getScores()
                .then(scores => {
                    this.scores = scores;
                    this.calculateHighestTweet();
                    this.calculateHighestFollowers();
                })
                .catch(error => {})
                .finally(() => {
                    // this.loading = false
                })
        },
        calculateHighestTweet(a) {
            // https://stackoverflow.com/a/1129270
            function compare(a, b) {
                if (a.weekreport[0].retweet_count < b.weekreport[0].retweet_count) {
                    return 1;
                }
                if (a.weekreport[0].retweet_count > b.weekreport[0].retweet_count) {
                    return -1;
                }
                return 0;
            }

            // make a copy, not by reference
            var scoresCopy = JSON.parse(JSON.stringify(this.scores));
            // console.log(scoresCopy[0].weekreport[0].weeknumber);

            // var filtered = scoresCopy.reduce((a, o) => ((o.weekreport[a].weeknumber === 2) && a.push(o), a), []);

            var myArray = scoresCopy.filter(function (obj) {
                return obj.weekreport.weeknumber !== 2;
            });

            console.log('filtered: ', myArray);

            this.sortedTweets = scoresCopy.sort(compare);
        },
        calculateHighestFollowers(a) {
            // https://stackoverflow.com/a/1129270
            function compare(a, b) {
                if (a.weekreport[0].favorite_count < b.weekreport[0].favorite_count) {
                    return 1;
                }
                if (a.weekreport[0].favorite_count > b.weekreport[0].favorite_count) {
                    return -1;
                }
                return 0;
            }

            var scoresCopy = JSON.parse(JSON.stringify(this.scores));
            this.sortedFavorites = scoresCopy.sort(compare);
        }
    },
    created() {
        // ScoreAPI.getScores()
        //   .then(scores => {
        //     this.scores = scores
        //   })
        //   .catch(error => {})
        //   .finally(() => {
        //     this.loading = false
        //   })
    },
    components: {
        // DatePickers
    }
};
</script>

<style>
ol {
    list-style-position: inside;
    padding-left: 0;
}

ol li:first-child {
    font-size: 1.5em;
    padding: 0.3em;
    margin-left: -1em;
    margin-bottom: 1em;
    background: rgb(206, 237, 252);
    width: calc(100% + 2em);

    /* border-radius: 5px; */
    /* padding-left: 0;
    margin-left: 0;
    text-indent: 0%; */
}
</style>
