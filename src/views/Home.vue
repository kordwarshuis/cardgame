<template>
<div>
    <div class="container logo-parent" :class="this.$store.state.cssClassCardOverviewState">
        <a href>
            <img class="logo" alt="logo" src="../assets/img/logo/blockchainbird-logo.png" />
        </a>
        <Cards msg="Bitcoin Card Game" />
    </div>
    <CardIntro />
    <CardFull />
</div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import * as d3 from "d3-dsv";
import Cards from "@/components/Cards.vue";
import CardIntro from "@/components/CardIntro.vue";
import CardFull from "@/components/CardFull.vue";

export default {
    name: "Home",
    data() {
        return {
            allCardsInChosenCategory: []
        }
    },
    components: {
        Cards,
        CardIntro,
        CardFull
    },
    mounted: function () {
        this.fetchData();
    },
    // https://stackoverflow.com/a/44347195
    methods: {
        fetchData() {
            return axios.get("https://blockchainbird.com/t/cardgame-resources/data/data-csv-cors.php")
                .then(response => {
                    var responseData = d3.csvParse(response.data);

                    // cleaning
                    for (let i = 0; i < responseData.length; i++) {
                        for (var k in responseData[i]) {
                            if (responseData[i].hasOwnProperty(k)) {
                                // console.log("Key is " + k + ", value is: " + dataLayer1[i][k]);
                                // the csv source from google introduces \' so we remove the backslash:
                                responseData[i][k] = responseData[i][k].replace(/\\'/g, "‘");
                                //experimental:
                                responseData[i][k] = responseData[i][k].replace(/'/g, "‘");
                                // responseData[i][k] = responseData[i][k].replace(/(\n\n)/gm, "</p><p>");
                            }
                        }
                    }
                    // format quiz data
                    for (let i = 0; i < responseData.length; i++) {
                        responseData[i]["Quiz"] = this.prepareQuiz(responseData[i]["Quiz"]);
                    }

                    // save data to store, probably not necessary, can be done via data and props
                    this.$store.state.theJSON = responseData;
                    this.createCategoriesArray(this.$store.state.theJSON);

                    // create an overview of all cards. All items are generated if no argument is given, elsewhere we create an overview based on category chosen
                    this.$store.commit("showItemsInSelectedCategory");

                    // deal with URL. We now have an overview of all the cards. Should we show a card intro? If no card param then stop…
                    if (this.$route.params.card === undefined) {
                        return;

                        // if there is a specific url / card param, the do following:
                    } else if (this.$route.params.card !== "") {
                        this.$store.commit("showCardIntroFromURL", this.$route.params.card);
                    }
                });
        },
        prepareQuiz(quiz) {
            var temp = [];

            if (quiz !== "") {
                // split quiz, make array
                quiz = splitString(quiz, "|");
                //put question in first item, first string item is always question
                temp[0] = {
                    "question": quiz[0]
                }

                // put answers in second item
                temp[1] = {
                    "answers": []
                };
                for (let i = 1; i < quiz.length - 1; i++) {
                    temp[1].answers.push(quiz[i]);
                }
                // put explanation in third item, last string item is always answer
                temp[2] = {
                    "explanation": quiz[quiz.length - 1]
                };

                quiz = [];
                quiz = temp;
                return quiz;
            }
        },
        createCategoriesArray(theJSON) {
            // temporary store category names in array
            var categoriesArray = [];

            // https://stackoverflow.com/a/14438954
            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }

            // create array with all categories (to create a menu with all categories):
            for (var i = 0; i < theJSON.length; i++) {
                categoriesArray.push(theJSON[i].Cat);
            }

            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            // var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
            // remove duplicate entries
            categoriesArray = categoriesArray.filter(onlyUnique);

            // now we have an array with categories. Now create final array in the store containing object with name, and number of items in that category:
            for (let i = 0; i < categoriesArray.length; i++) {
                var counter = 0;
                for (let j = 0; j < theJSON.length; j++) {
                    if (theJSON[j].Cat === categoriesArray[i]) {
                        //TODO: number of items in category is sometimes wrong
                        counter++;
                    }
                }

                this.$store.state.categories.push({
                    "name": categoriesArray[i],
                    "numberOfItems": counter
                });
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
//TODO: duplicate code, see CardIntro, but cannot be removed without further change

// https://tympanus.net/Development/FullscreenOverlayStyles/index7.html#
/* Overlay style */
.overlay-fullscreen {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(153, 204, 51, 0.9);
}

/* Overlay closing cross */
.overlay-fullscreen .overlay-fullscreen-close {
    cursor: pointer;
    width: 80px;
    height: 80px;
    position: absolute;
    right: 20px;
    top: 20px;
    overflow: hidden;
    border: none;
    // background: url(../assets/img/icons/ui/cross.png) no-repeat center center;
    text-indent: 200%;
    color: transparent;
    outline: none;
    z-index: 100;
}

/* Menu style */
.overlay-fullscreen nav {
    text-align: center;
    position: relative;
    top: 50%;
    height: 60%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
}

.overlay-fullscreen ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: inline-block;
    height: 100%;
    position: relative;
}

.overlay-fullscreen ul li {
    display: block;
    height: 20%;
    height: calc(100% / 5);
    min-height: 54px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.overlay-fullscreen ul li a {
    font-size: 54px;
    font-weight: 300;
    display: block;
    color: #fff;
    -webkit-transition: color 0.2s;
    transition: color 0.2s;
}

.overlay-fullscreen ul li a:hover,
.overlay-fullscreen ul li a:focus {
    color: #f0f0f0;
}

/* Effects */
// html,
// body {
//   overflow-x: hidden;
// }

.container {
    overflow-x: hidden;
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
}

.container.overlay-fullscreen-open {
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
}

.container::after {
    content: "";
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    -webkit-transition: opacity 0.5s, visibility 0s 0.5s;
    transition: opacity 0.5s, visibility 0s 0.5s;
}

.container.overlay-fullscreen-open::after {
    visibility: visible;
    opacity: 1;
    -webkit-transition: opacity 0.5s;
    transition: opacity 0.5s;
}

.overlay-fullscreen-contentpush {
    background: rgba(153, 204, 51, 1);
    visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    -webkit-transition: -webkit-transform 0.5s, visibility 0s 0.5s;
    transition: transform 0.5s, visibility 0s 0.5s;
}

.overlay-fullscreen-contentpush.open {
    visibility: visible;
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
}

@media screen and (max-height: 30.5em) {
    .overlay-fullscreen nav {
        height: 70%;
        font-size: 34px;
    }

    .overlay-fullscreen ul li {
        min-height: 34px;
    }
}
</style>
