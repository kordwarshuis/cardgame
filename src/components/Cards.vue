<template>
<div class="">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <BitcoinAnimation /> -->
    <!-- <h1>Bitcoin Misconceptions</h1> -->
    <h1 class="pt-1">
        <ICountUp :delay="ICountUpDelay" :endVal="$store.state.numberofCards" :options="ICountUpOptions" /> {{this.$store.state.gameName}} Misconceptions</h1>
    <!-- <h1 class="pt-5">{{this.$store.state.topScorer}} Poster of the week</h1> -->
    <ul class="nav nav-pills pt-0 mx-auto justify-content-center">
        <!-- All categories at once -->
        <li class="nav-item "><a class="nav-link p-1" @click="$store.commit('showItemsInSelectedCategory')" data-category="All">All</a></li>

        <!-- Every category in a menu item -->
        <li class="nav-item" v-for="category in $store.state.categories" :key="category.name"><a class="nav-link p-1" @click="$store.commit('showItemsInSelectedCategory',category)" :data-category="category.name">{{ category.name }} ({{ category.numberOfItems }})</a></li>
    </ul>
    <!-- <h2>{{ subtext }}</h2> -->
    <Search />

    <div class="masonry-with-columns m-5">
        <!-- <transition name="fade"> -->

        <div v-for="item in $store.state.allCardsInChosenCategory" :key="item.prejudice" class="mb-4">
            <a :data-id="item['id']" :key="item.prejudice" href="#" @click="showCardIntro" class="p-2">
                <!-- <div class="" @mouseenter="startElectricitySound"> -->

                <h4 class=""><span class="quote">“</span>{{ item.prejudice }}<span class="quote">”</span></h4>
                <!-- </div> -->
            </a>
            <div class="card-footer" style="background: #557AA3; text-align: left;">
                <h3 class="category" :class="item.category" style="text-align: left;display: inline-block;font-size: 0.7em; padding: 0.5em">{{ item.category }}</h3>
            </div>
        </div>

        <!-- </transition> -->
    </div>
    <NewsTicker />
    <SoundToggle />
</div>
</template>

<script>
import NewsTicker from "@/components/NewsTicker.vue";
import Search from "@/components/Search.vue";
import SoundToggle from "@/components/SoundToggle.vue";
import ICountUp from 'vue-countup-v2';
// import BitcoinAnimation from "@/components/BitcoinAnimation.vue";

export default {
    name: "Index",
    components: {
        Search,
        NewsTicker,
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
// https://css-tricks.com/how-do-you-do-max-font-size-in-css/
h1 {
    font-size: 30px;
}

@media screen and (min-width: 320px) {
    h1 {
        font-size: calc(30px + 6 * ((100vw - 320px) / 680));
    }
}

@media screen and (min-width: 1000px) {
    h1 {
        font-size: 50px;
    }
}

// https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/
.masonry-with-columns {
    columns: 5 200px;
    column-gap: 1rem;

    >div {
        cursor: pointer;
        background: $_background2 url(../assets/img/icons/flat/bitcoin.svg) no-repeat 5px 5px;
        background-size: 20px;
        border-radius: 10px;
        color: $_text1;
        // margin: 0 1rem 1rem 0;
        display: inline-block;
        width: 100%;
        // text-align: left;
        // font-family: system-ui;
        // font-weight: 900;
        // font-size: 2rem;

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
