<template>
<div class="cards">
    <!-- <transition name="fade"> -->
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <BitcoinAnimation /> -->
    <!-- <h1>Bitcoin Misconceptions</h1> -->

    <div class="row">
        <div class="col-md-8">
            <h1 class="pt-1 ml-1 mr-1 ml-md-5 mr-md-5 mt-0">
                <span>
                    <ICountUp :delay="ICountUpDelay" :endVal="$store.state.numberofCards" :options="ICountUpOptions" /> {{this.$store.state.gameName}}</span> Misconceptions
            </h1>

        </div>
        <div class="col-md-4">
            <Search />
        </div>
    </div>

    <!-- <div class="alert alert-info ml-1 mr-1 ml-md-5 mr-md-5 mt-0" role="alert">
            1: Select a tweet – 2: Select and Copy a card – 3: Paste card in reply to tweet
    </div> -->
    <!-- <h1 class="pt-5">{{this.$store.state.topScorer}} Poster of the week</h1> -->
    <ul class="nav nav-pills pt-0 mx-auto justify-content-center">
        <!-- All = All categories at once -->
        <li class="nav-item ">
            <a class="nav-link p-1" @click="$store.commit('showItemsInSelectedCategory')" data-category="All">All</a>
        </li>

        <!-- Every category in a menu item -->
        <li class="nav-item" v-for="category in $store.state.categories" :key="category.name">
            <a class="nav-link p-1" @click="$store.commit('showItemsInSelectedCategory',category.name)" :data-category="category.name">
                {{ category.name }}
                <!-- ({{ category.numberOfItems }}) -->
            </a>
        </li>
    </ul>
    <!-- <h2>{{ subtext }}</h2> -->

    <div class="masonry-with-columns ml-1 mr-1 ml-md-5 mr-md-5 mt-2">
        <div v-for="item in $store.state.allCardsInChosenCategory" :key="item.prejudice" class="mb-4">
            <a :data-id="item['id']" :key="item.prejudice" href="#" @click="showCardIntro" class="p-2">
                <h4 class=""><span class="quote">“</span>{{ item.prejudice }}<span class="quote">”</span></h4>
            </a>
            <div class="card-footer" style="background: #1D2448; text-align: left;">
                <h3 @click="$store.commit('showItemsInSelectedCategory',item.category)" class="category" :class="item.category" style="text-align: left;display: inline-block;font-size: 0.7em; padding: 0.5em">{{ item.category }}</h3>
            </div>
        </div>
    </div>

    <!-- <NewsTicker /> -->
    <!-- <SoundToggle /> -->
    <!-- </transition> -->
</div>
</template>

<script>
// import NewsTicker from "@/components/NewsTicker.vue";
import Search from "@/components/Search.vue";
import SoundToggle from "@/components/SoundToggle.vue";
import ICountUp from 'vue-countup-v2';
// import BitcoinAnimation from "@/components/BitcoinAnimation.vue";

export default {
    name: "Index",
    components: {
        Search,
        // NewsTicker,
        SoundToggle,
        ICountUp
        // ,BitcoinAnimation
        // VueFuse
    },
    props: {
        msg: String,
        categories: Array
    },
    data() {
        return {
            subtext: "Help us get it right and send a card",
            // results: [],
            fuseSearchKeys: ["Prejudice"],
            ICountUpDelay: 2000, //msec
            ICountUpOptions: {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                duration: 4 //sec
            }
        }
    },
    mounted() {
        this.addVisitedToCards();
    },
    methods: {
        addVisitedToCards() {
            //TODO: duplicate code, see addVisitedToCards()
            setTimeout(function () {
                var allCards = document.querySelectorAll(".grid__item");
                // loop all cards and add .visited if in localStorage visited
                for (let i = 0; i < allCards.length; i++) {
                    if (localStorage.getItem("visited") && localStorage.getItem("visited").indexOf(allCards[i].dataset.id) > -1) {
                        allCards[i].classList.add("visited");
                    }
                }
            }, 1000);
        },
        startElectricitySound(e) {
            if (e.target.closest("a").classList.contains("visited")) {
                if (localStorage.getItem("soundOn") === "true") {
                    electricity.play();
                    setTimeout(function () {
                        electricity.stop()
                    }, 1000);
                }
            }
        },
        // stopElectricitySound(e) {
        //     if (e.target.closest("a").classList.contains("visited")) {
        //         if (localStorage.getItem("soundOn") === "true") electricity.stop();
        //     }
        // },
        showCardIntro(event) {
            // console.log('this.$store.state.currentCard["Youtube Video Id"]: ', this.$store.state.currentCard["Youtube Video Id"]);
            // event.target.closest("a").classList.add("visited");

            // https://stackoverflow.com/a/7680123
            // localStorage can only be string
            function appendToLocalStorage(name, data) {
                var old = localStorage.getItem(name);

                // create if not existing
                if (old === null) old = "";

                // only add if it is not already in the string
                if (old.indexOf(data) === -1) localStorage.setItem(name, old + data + " ");
            }

            // deal with CSS to open and close
            this.$store.commit("changeCssClassCardIntroState", "open");
            this.$store.commit("changeCssClassCardOverviewState", "overlay-fullscreen-open");

            // returns object with all entries of one prejudice
            var currentCard = this.$store.getters.getCard(event.target.closest("a").dataset.id);

            this.$store.commit("changeCard", currentCard);

            // set URl to the item that was clicked
            // catch error: https://stackoverflow.com/a/58747480
            // this.$router.push("/card/" + currentCard["Unique URL"]).catch(err => {});
            this.$router.push("/card/" + currentCard["Unique URL"]);

            if (localStorage.getItem("soundOn") === "true") whoosh2.play();

            // add current card url to visited in localStorage
            appendToLocalStorage("visited", this.$store.state.currentCard["Unique URL"]);

            this.addVisitedToCards();
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.cards {
    padding-top: 30px;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .cards {
        padding-top: 0;
    }
}

// https://css-tricks.com/how-do-you-do-max-font-size-in-css/
h1 {
    font-size: 20px;
}

h1 {
    font-weight: normal;
}

h1 span {
    font-weight: bold;
}

.nav-link {
    color: #eee;
    cursor: pointer;
}

@media screen and (min-width: 320px) {
    h1 {
        font-size: calc(20px + 6 * ((100vw - 320px) / 680));
    }
}

@media screen and (min-width: 1000px) {
    h1 {
        font-size: 40px;
    }
}

// https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/
.masonry-with-columns {
    // columns: 5 200px;
    column-count: 5;
    column-width: 200px;
    column-gap: 1rem;
    // column-rule: 1px dotted #ddd;

    >div {
        cursor: pointer;
        background-image: url(../assets/img/icons/flat/bitcoin.svg), linear-gradient(#272f52, #3a4275);
        background-repeat: repeat, no-repeat;
        background-size: 30px 30px, 100% 100%;
        text-align: center;
        font-variant: small-caps;
        border-radius: 10px;
        color: $_text1;
        display: inline-block;
        width: 100%;

        h3,
        h4 {
            color: $_text1;
            font-size: 1.1em;
            margin: 0.5em;
        }

        .card-footer {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            padding: 0 0.5em 0 0.5em;

        }
    }

    .category {
        background: #1D807D;
    }

    .category.Architecture {
        background: #1D807D;
    }

    .category.Crime {
        background: #7a6d45;
    }

    .category.Use {
        background: #604085;
    }

    .category.Environment {
        background: #406685;
    }
}
</style>
