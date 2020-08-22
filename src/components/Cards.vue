<template>
<div class="">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <BitcoinAnimation /> -->
    <!-- <h1>Bitcoin Misconceptions</h1> -->
    <h1 class="pt-5">{{this.$store.state.numberofCards}} {{this.$store.state.gameName}} Misconceptions</h1>
    <!-- <h1 class="pt-5">{{this.$store.state.topScorer}} Poster of the week</h1> -->
    <ul class="nav nav-pills pt-0 mx-auto justify-content-center">
        <li class="nav-item "><a class="nav-link p-1" @click="$store.commit('showItemsInSelectedCategory')" data-category="All">All</a></li>
        <li class="nav-item" v-for="category in $store.state.categories" :key="category.name"><a class="nav-link p-1" @click="$store.commit('showItemsInSelectedCategory',category)" :data-category="category.name">{{ category.name }} ({{ category.numberOfItems }})</a></li>
    </ul>
    <!-- <h2>{{ subtext }}</h2> -->
    <Search />

    <div class="grid">
        <!-- <transition name="fade"> -->

        <a v-for="item in $store.state.allCardsInChosenCategory" data-shorttext="" :data-id="item['id']" :key="item.prejudice" class="grid__item" href="#" @click="showCardIntro">
            <!-- mouseenter and out does does not work on the enclosing "a" -->
            <div class="box" @mouseenter="startElectricitySound">
                <div class="box__shadow"></div>
                <img class="box__img" :src="require('@/assets/img/icons/flat/' + $store.state.cardImage)" alt="" />
                <h3 class="box__title"><span class="box__title-inner" data-hover="">{{ item.category }}</span></h3>
                <h4 class="box__text"><span class="box__text-inner"><span class="quote">“</span>{{ item.prejudice }}<span class="quote">”</span></span><span class="video-indicator" v-if="item['Youtube Video Id'] !== ''"><img  :src="require('@/assets/img/icons/flat/film.svg')" alt="contains video" /></span></h4>
                
                
            </div>
        </a>

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
            fuseSearchKeys: ["Prejudice"]
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
                    setTimeout(function() {electricity.stop()}, 1000);
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

.nav-link {
    cursor: pointer;
    font-variant: small-caps;
    font-size: 1.2em;
}

.nav-link.active,
.nav-link:hover {
    color: $linksText;
    background-color: $backgroundBCB;
}

.video-indicator {
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    font-size: 2em;
    transform: rotate(-25deg);
    // text-decoration: none !important;
}
.video-indicator img {
    width: 1em;
}
</style>
