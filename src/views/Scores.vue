<template>
<section class=" my-0">
    <h1 class="text-center pt-1 ">Score Board</h1>
    <div class="container shape-container d-flex ">
        <div class="col px-0">

            <div class="row justify-content-center ">
                <div class="col-lg-12 col-sm-12">
                    <p>Overview of Tweeps posting misconceptions on Twitter and who has posted the most.</p>
                </div>
            </div>

            <div class="row justify-content-center ">

                <!-- ALL TIME TWEETS -->
                <div class="col-lg-12 col-md-12 col-sm-12 m-0 p-0 pr-1">
                    <div class="card border-primary m-0 p-0 mb-3">
                        <div class="card-header">
                            <h2 class="">All Time Tweeps</h2>
                            <hr>
                            <p>All Tweeps, sorted by number of tweets.</p>
                            <hr>
                            <small>Scroll to the right if not everything is in view.</small>
                        </div>
                        <div class="card-body m-0 p-2">
                            <table class="table table-responsive m-0 p-0">
                                <tr>
                                    <th class="text-left pr-2">
                                        #
                                    </th>
                                    <th class="text-left">
                                        Avatar
                                    </th>
                                    <th>
                                        User name
                                    </th>
                                    <th class="text-right">
                                        Tweets
                                    </th>
                                    <th class="text-right">
                                        Retweets
                                    </th>
                                    <th class="text-right">
                                        Likes
                                    </th>
                                    <th class="text-right">
                                        Replies
                                    </th>
                                    <th class="text-right">
                                        Points
                                    </th>
                                </tr>
                                <template v-for="item in tweetersAllTime">
                                <tr class="border-bottom"  :key="item.name">
                                    <td class="text-left pr-2">
                                        <!-- trick to get a numbering in the table -->
                                        {{ tweetersAllTime.indexOf(item)+1}}
                                    </td>
                                    <td class="text-left">
                                        <img class="mt-1 mr-2 mb-1" :src="item.image" alt="" />
                                    </td>
                                    <td>
                                        {{ item.name }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.tweets }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.retweets }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.likes }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.replies }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.points }}
                                    </td>
                                </tr>
                                <tr colspan="8"></tr>
                                </template>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- TWEETS IN LAST WEEK -->
                <div class="col-lg-12 col-md-12 col-sm-12 m-0 p-0 pl-1">
                    <div class="card border-primary m-0 p-0 mb-3 ">
                        <div class="card-header">
                            <h2 class="">All Tweeps in week {{ mostRecentWeek }}</h2>
                            <hr>
                            <p>All Tweeps in the most recent week</p>
                            <hr>
                        </div>
                        <div class="card-body">
                            <table class="table table-responsive m-0 p-0">
                                <tr>
                                    <th class="text-left pr-2">
                                        #
                                    </th>
                                    <th class="text-left">
                                        Avatar
                                    </th>
                                    <th>
                                        User name
                                    </th>
                                    <th class="text-right">
                                        Tweets
                                    </th>
                                    <th class="text-right">
                                        Retweets
                                    </th>
                                    <th class="text-right">
                                        Likes
                                    </th>
                                    <th class="text-right">
                                        Replies
                                    </th>
                                    <th class="text-right">
                                        Points
                                    </th>
                                </tr>
                                <tr v-for="item in tweetersMostRecentWeek" :key="item.name">
                                    <td class="text-left pr-2">
                                        <!-- trick to get a numbering in the table -->
                                        {{ tweetersMostRecentWeek.indexOf(item)+1}}
                                    </td>
                                    <td class="text-left">
                                        <img class="mt-1 mr-2 mb-1" :src="item.image" alt="" />
                                    </td>
                                    <td>
                                        {{ item.name }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.tweets }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.retweets }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.likes }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.replies }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.points }}
                                    </td>
                                </tr>
                            </table>

                        </div>

                    </div>
                </div>
            </div>

            <div class="row justify-content-center ">

                <!-- TWEETS IN LAST WEEK -1  -->
                <div class="col-lg-12 col-md-12 col-sm-12 m-0 p-0 pr-1">
                    <div class="card border-primary m-0 p-0 mb-3">
                        <div class="card-header">
                            <h2 class="">All Tweeps in week {{ mostRecentWeek -1 }}</h2>
                        </div>
                        <div class="card-body ">
                            <table class="table table-responsive">
                                <tr>
                                    <th class="text-left pr-2">
                                        #
                                    </th>
                                    <th class="text-left">
                                        Avatar
                                    </th>
                                    <th>
                                        User name
                                    </th>
                                    <th class="text-right">
                                        Tweets
                                    </th>
                                    <th class="text-right">
                                        Retweets
                                    </th>
                                    <th class="text-right">
                                        Likes
                                    </th>
                                    <th class="text-right">
                                        Replies
                                    </th>
                                    <th class="text-right">
                                        Points
                                    </th>
                                </tr>
                                <tr v-for="item in tweetersMostRecentWeekMinusOne" :key="item.name">
                                    <td class="text-left pr-2">
                                        <!-- trick to get a numbering in the table -->
                                        {{ tweetersMostRecentWeekMinusOne.indexOf(item)+1}}
                                    </td>
                                    <td class="text-left">
                                        <img class="mt-1 mr-2 mb-1" :src="item.image" alt="" />
                                    </td>
                                    <td>
                                        {{ item.name }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.tweets }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.retweets }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.likes }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.replies }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.points }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- TWEETS IN LAST WEEK -2  -->
                <div class="col-lg-12 col-md-12 col-sm-12 m-0 p-0 pl-1">
                    <div class="card border-primary m-0 p-0 mb-3">
                        <div class="card-header">
                            <h2 class="">All Tweeps in week {{ mostRecentWeek -2 }}</h2>
                        </div>
                        <div class="card-body">
                            <table class="table table-responsive m-0 p-0">
                                <tr>
                                    <th class="text-left pr-2">
                                        #
                                    </th>
                                    <th class="text-left">
                                        Avatar
                                    </th>
                                    <th>
                                        User name
                                    </th>
                                    <th class="text-right">
                                        Tweets
                                    </th>
                                    <th class="text-right">
                                        Retweets
                                    </th>
                                    <th class="text-right">
                                        Likes
                                    </th>
                                    <th class="text-right">
                                        Replies
                                    </th>
                                    <th class="text-right">
                                        Points
                                    </th>
                                </tr>
                                <tr v-for="item in tweetersMostRecentWeekMinusTwo" :key="item.name">
                                    <td class="text-left pr-2">
                                        <!-- trick to get a numbering in the table -->
                                        {{ tweetersMostRecentWeekMinusTwo.indexOf(item)+1}}
                                    </td>
                                    <td class="text-left">
                                        <img class="mt-1 mr-2 mb-1" :src="item.image" alt="" />
                                    </td>
                                    <td>
                                        {{ item.name }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.tweets }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.retweets }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.likes }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.replies }}
                                    </td>
                                    <td class="text-right">
                                        {{ item.points }}
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
import axios from "axios";

import {
    getWeek,
    getYear
} from 'date-fns';

import {
    convertTwitterTimeStamp
} from "@/assets/js/convertTwitterTimeStamp.js";

// import DatePickers from "./components/JavascriptComponents/DatePickers";

export default {
    name: "Scores",
    data() {
        return {
            scores: [],
            mostRecentYear: 0,
            mostRecentWeek: 0,
            tweetersAllTime: [],
            tweetersMostRecentWeek: [],
            tweetersMostRecentWeekMinusOne: [],
            tweetersMostRecentWeekMinusTwo: []
        }
    },
    mounted: function () {
        this.fetchScores();
    },
    methods: {
        fetchScores() {
            return axios.get(process.env.VUE_APP_CARDGAME_SCORES)
                .then(response => {
                    this.scores = response.data.scores;
                    this.addCalendarData();
                    // this.scores = this.convertIntObj(this.scores); // turn strings that contain integers into integers.

                })
                .catch(error => {
                    console.error("Fetching the data did not succeed.")
                })
                .finally(() => {})
        },
        addCalendarData() {
            const that = this;

            function addWeekNumbers() {
                for (let i = 0; i < that.scores.length; i++) {
                    that.scores[i].week_nr = getWeek(convertTwitterTimeStamp(that.scores[i].time));
                }
            }

            function addYears() {
                for (let i = 0; i < that.scores.length; i++) {
                    that.scores[i].year = getYear(convertTwitterTimeStamp(that.scores[i].time));
                }
            }

            addWeekNumbers();
            addYears();
            this.getMostRecentWeekAndYear();
        },
        getMostRecentWeekAndYear() {
            const that = this;
            var week = 0;
            // you first have to find the most recent year before you can search for the most recent week
            this.mostRecentYear = Math.max.apply(Math, that.scores.map(function (o) {
                return o.year;
            }))

            this.mostRecentWeek = Math.max.apply(Math, that.scores.map(function (o) {
                if (o.year === that.mostRecentYear) {
                    week = o.week_nr;
                }
                return week;
            }))

            this.calculateScores();
        },
        calculateScores: function () {
            this.tweetersAllTime = this.calculateScorePerUser();
            this.tweetersMostRecentWeek = this.calculateScorePerUser(this.mostRecentYear, this.mostRecentWeek);
            this.tweetersMostRecentWeekMinusOne = this.calculateScorePerUser(this.mostRecentYear, this.mostRecentWeek - 1);
            this.tweetersMostRecentWeekMinusTwo = this.calculateScorePerUser(this.mostRecentYear, this.mostRecentWeek - 2);
        },

        calculateScorePerUser(year, week) {
            var selection = [];
            var usernamesCounted;
            var userNamesCountedAndSorted = [];

            // if no arguments are given then take all
            if (year === undefined && week === undefined) {
                selection = JSON.parse(JSON.stringify(this.scores));
            } else {
                for (let i = 0; i < this.scores.length; i++) {
                    if (this.scores[i].year === year && this.scores[i].week_nr === week) {
                        selection.push(this.scores[i]);
                    }
                }
            }

            // Count particular key value from array of object, https://stackoverflow.com/a/38695084
            usernamesCounted = selection.reduce(function (obj, v) {
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
                userNamesCountedAndSorted.push({
                    name: user_name,
                    tweets: usernamesCounted[user_name]
                });
            }

            for (let i = 0; i < userNamesCountedAndSorted.length; i++) {
                userNamesCountedAndSorted[i].replies = 0; // replies per user
                userNamesCountedAndSorted[i].retweets = 0; // retweets per user
                userNamesCountedAndSorted[i].likes = 0; // likes per user
                userNamesCountedAndSorted[i].points = 0; // points per user
                for (let j = 0; j < selection.length; j++) {
                    if (userNamesCountedAndSorted[i].name === selection[j].user_name) {
                        userNamesCountedAndSorted[i].image = selection[j].tweet_avatar

                        if (selection[j].replies !== "") { // zero is empty string
                            userNamesCountedAndSorted[i].replies = userNamesCountedAndSorted[i].replies + parseInt(selection[j].replies, 10);
                        }
                        if (selection[j].retweets !== "") { // zero is empty string
                            userNamesCountedAndSorted[i].retweets = userNamesCountedAndSorted[i].retweets + parseInt(selection[j].retweets, 10);
                        }
                        if (selection[j].likes !== "") { // zero is empty string
                            userNamesCountedAndSorted[i].likes = userNamesCountedAndSorted[i].likes + parseInt(selection[j].likes, 10);
                        }
                    }
                }

                userNamesCountedAndSorted[i].points = userNamesCountedAndSorted[i].replies + userNamesCountedAndSorted[i].retweets + userNamesCountedAndSorted[i].likes;

            }

            userNamesCountedAndSorted.sort(function (a, b) {
                return b.points - a.points;
            });

            // copy the array to the data object with same name
            return userNamesCountedAndSorted;

        },
        compareNumbers(a, b) {
            return a - b;
        },
        // converts strings that represent an integer to an integer
        // https://stackoverflow.com/a/61057671/9749918
        convertIntObj(obj) {
            const res = {}
            for (const key in obj) {
                res[key] = {};
                for (const prop in obj[key]) {
                    const parsed = parseInt(obj[key][prop], 10);
                    res[key][prop] = isNaN(parsed) ? obj[key][prop] : parsed;
                }
            }
            return res;
        }
    },
    components: {
        // DatePickers
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.card {
    border: 1px dashed #eee !important;
    background: #45517A;
    border-radius: 15px;
    color: #eee;
    // border-style: dashed !important;
}

tr,
td {
    color: #eee;
}

th:last-child, td:last-child {
    background: rgb(4, 132, 218);
}

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
