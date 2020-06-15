<template>
<section class=" my-0">
    <h1 class="text-center ">Bitcoin Card Game Score Board</h1>
    <div class="container shape-container d-flex ">
        <div class="col px-0">

            <div class="row justify-content-center ">
                <div class="col-lg-12 col-sm-12">
                    <p>Overview of Tweeps posting misconceptions on Twitter and who has posted the most.</p>
                </div>
            </div>

            <div class="row justify-content-center ">
                <div class="col-lg-6 col-sm-6">
                    <div class="card border-primary mb-3 p-4">
                        <div class="card-header">
                            <h2 class="">All Time Tweeps</h2>
                            <hr>
                            <p>All Tweeps, sorted by number of tweets.</p>
                            <hr>
                        </div>
                        <div class="card-body">
                            <table>
                                <tr>
                                    <th>
                                        User name
                                    </th>
                                    <th class="text-right">
                                        Tweets
                                    </th>
                                </tr>
                                <tr v-for="item in userNamesCountedAndSorted" :key="item[0]">
                                    <td>
                                        {{ item[0] }}
                                    </td>
                                    <td class="text-right">
                                        {{ item[1] }}
                                    </td>
                                </tr>
                            </table>

                        </div>

                    </div>
                </div>

                <div class="col-lg-6 col-sm-6">
                    <div class="card border-primary mb-3 p-4">
                        <div class="card-header">
                            <h2 class="">All Tweeps in week {{ userNamesCountedAndSorted2.mostRecentWeek }}</h2>
                            <hr>
                            <p>All Tweeps in the most recent week</p>
                            <hr>
                        </div>
                        <div class="card-body">
                            <table>
                                <tr>
                                    <th>
                                        User name
                                    </th>
                                    <th class="text-right">
                                        Tweets
                                    </th>
                                </tr>
                                <tr v-for="item in userNamesCountedAndSorted2.tweetersMostRecentWeek" :key="item[0]">
                                    <td>
                                        {{ item[0] }}
                                    </td>
                                    <td class="text-right">
                                        {{ item[1] }}
                                    </td>
                                </tr>
                            </table>

                        </div>

                    </div>
                </div>
            </div>

            <div class="row justify-content-center ">
                <div class="col-lg-6 col-sm-6">
                    <div class="card border-primary mb-3 p-4">
                        <div class="card-header">
                            <h2 class="">All Tweeps in week {{ userNamesCountedAndSorted2.mostRecentWeek -1 }}</h2>
                        </div>
                        <div class="card-body">
                            <table>
                                <tr>
                                    <th>
                                        User name
                                    </th>
                                    <th class="text-right">
                                        Tweets
                                    </th>
                                </tr>
                                <tr v-for="item in userNamesCountedAndSorted2.tweetersMostRecentWeekMinusOne" :key="item[0]">
                                    <td>
                                        {{ item[0] }}
                                    </td>
                                    <td class="text-right">
                                        {{ item[1] }}
                                    </td>
                                </tr>
                            </table>

                        </div>

                    </div>
                </div>

                <div class="col-lg-6 col-sm-6">
                    <div class="card border-primary mb-3 p-4">
                        <div class="card-header">
                            <h2 class="">All Tweeps in week {{ userNamesCountedAndSorted2.mostRecentWeek -2 }}</h2>
                        </div>
                        <div class="card-body">
                            <table>
                                <tr>
                                    <th>
                                        User name
                                    </th>
                                    <th class="text-right">
                                        Tweets
                                    </th>
                                </tr>
                                <tr v-for="item in userNamesCountedAndSorted2.tweetersMostRecentWeekMinusTwo" :key="item[0]">
                                    <td>
                                        {{ item[0] }}
                                    </td>
                                    <td class="text-right">
                                        {{ item[1] }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- <div class="row justify-content-center ">
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
                        </div>
                    </div>
                </div>

                <div class="col-lg-7 text-center pt-lg">
                    <div class="btn-wrapper">

                    </div>
                </div>
            </div> -->
        </div>
    </div>
</section>
</template>

<script>
import moment from "moment";
import axios from "axios";
import scoresJSON from "../../paths.config";
// import DatePickers from "./components/JavascriptComponents/DatePickers";

export default {
    name: "Scores",
    data() {
        return {
            scores: [],
            // sortedTweets: "",
            // sortedFavorites: "",
            userNamesCountedAndSorted: []
        }
    },
    computed: {
        userNamesCountedAndSorted2: function () {
            // we want to find the most recent weeks. So first we search for most recent year
            var mostRecentYear = Math.max.apply(Math, this.scores.map(function (o) {
                return o.year;
            }));

            // create subselection array with only most recent year
            var userNamesCountedAndSortedOnlyRecentYear = [];
            // create subselection array with only most recent week
            var mostRecentWeek = 0;
            var userNamesCountedAndSortedOnlyRecentWeek = [];

            for (let i = 0; i < this.scores.length; i++) {
                if (this.scores[i].year === mostRecentYear) {
                    userNamesCountedAndSortedOnlyRecentYear.push(this.scores[i]);
                }
            }

            mostRecentWeek = Math.max.apply(Math, userNamesCountedAndSortedOnlyRecentYear.map(function (o) {
                return o.week_nr;
            }))

            for (let i = 0; i < userNamesCountedAndSortedOnlyRecentYear.length; i++) {
                if (userNamesCountedAndSortedOnlyRecentYear[i].week_nr === mostRecentWeek) {
                    userNamesCountedAndSortedOnlyRecentWeek.push(userNamesCountedAndSortedOnlyRecentYear[i]);
                }
            }

            return {
                tweetersMostRecentWeek: this.calculateTweetsPerUser(mostRecentYear, mostRecentWeek),
                tweetersMostRecentWeekMinusOne: this.calculateTweetsPerUser(mostRecentYear, mostRecentWeek - 1),
                tweetersMostRecentWeekMinusTwo: this.calculateTweetsPerUser(mostRecentYear, mostRecentWeek - 2),
                mostRecentWeek: mostRecentWeek
            };
        }
    },
    mounted: function () {
        this.fetchScores();
    },
    methods: {
        // testDatePicked(datePicked) {
        //     // this.calculateHighestTweet(moment(datePicked, "YYYY-MM-DD").week());

        //     alert("Er wordt nog niks met deze keuze gedaan maar hier is alvast de keuze weergegeven: " + datePicked +
        //         " Dit is weeknr: " + moment(datePicked, "YYYY-MM-DD").week());
        // },
        fetchScores() {
            return axios.get(scoresJSON.scoresJSON)
                .then(response => {
                    this.scores = response.data.scores;
                    // this.calculateHighestTweet();
                    // this.calculateHighestFollowers();
                    this.addWeekNumber();
                    this.addYear();
                    // this.calculateTweetsPerUser(2020, 15);
                    // this.calculateTweetsPerUser();
                    this.allTweets();
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
            var myArray = scoresCopy.filter(function (obj) {
                return obj.weekreport.weeknumber !== 2;
            });

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
        },
        addWeekNumber() {
            for (let i = 0; i < this.scores.length; i++) {
                this.scores[i].week_nr = moment(this.scores[i].time).week();
            }
        },
        addYear() {
            for (let i = 0; i < this.scores.length; i++) {
                this.scores[i].year = moment(this.scores[i].time).year();
            }
            console.log(this.scores);
        },
        calculateTweetsPerUser(year, week) {
            var userNamesCountedAndSorted = [];
            var selection = [];

            if (year === undefined && week === undefined) {
                // console.log("gas");
                selection = this.scores;
            } else {
                for (let i = 0; i < this.scores.length; i++) {
                    if (this.scores[i].year === year && this.scores[i].week_nr === week) {
                        selection.push(this.scores[i]);

                    }

                }
            }

            // Count particular key value from array of object, https://stackoverflow.com/a/38695084
            var usernamesCounted = selection.reduce(function (obj, v) {
                // increment or set the property
                // `(obj[v.status] || 0)` returns the property value if defined
                // or 0 ( since `undefined` is a falsy value
                obj[v.user_name] = (obj[v.user_name] || 0) + 1;
                // return the updated object
                return obj;
                // set the initial value as an object
            }, {});

            // Sorting object property by values, https://stackoverflow.com/a/1069840
            for (var user_name in usernamesCounted) {
                userNamesCountedAndSorted.push([user_name, usernamesCounted[user_name]]);
            }

            userNamesCountedAndSorted.sort(function (a, b) {
                return b[1] - a[1];
            });

            // copy the array to the data object with same name
            return userNamesCountedAndSorted;

        },
        allTweets() {
            this.userNamesCountedAndSorted = this.calculateTweetsPerUser();
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
