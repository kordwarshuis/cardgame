<template>
<div class="">
    <!-- <h1>{{ msg }}</h1> -->
    <!-- <BitcoinAnimation /> -->
    <!-- <h1>Bitcoin Misconceptions</h1> -->

    <p class="categoryLinks pt-5">
        <a @click="$store.commit('showItemsInSelectedCategory')" data-category="All">All</a>
        <a v-for="category in $store.state.categories" @click="$store.commit('showItemsInSelectedCategory',category)" :data-category="category.name" :key="category.name">{{ category.name }}
            ({{ category.numberOfItems }})</a>
    </p>
    <h2>{{ subtext }}</h2>
    <Search />

    <!-- <div class="m-1 mt-5">
        <h2>Cards of the Day</h2>
        <div class="row mt-5 p-0 ">
            <div v-for="item in $store.state.allPickedCards" data-shorttext="" :key="item.pickedPrejudice" class="col-md-4 mb-5">
                <div class="p-3 card">
                    <a :data-id="item['pickedId']" class="" href="#" @click="showCardIntro">
                        <img style="float: left; width: 25%; margin-right: 1em;margin-bottom: 1em;" src="@/assets/img/trivial-pursuit/TrivialPursuit2.png" alt="">
                        <h3 class="">{{ item.pickedCategory }}</h3>
                        <h4 class="">{{ item.pickedPrejudice }}</h4>
                    </a>
                </div>
            </div>
        </div>

    </div> -->

    <h2>Cards</h2>
    <div class="grid">
        <!-- <transition name="fade"> -->

        <a v-for="item in $store.state.allCardsInChosenCategory" data-shorttext="" :data-id="item['id']" :key="item.prejudice" class="grid__item" href="#" @click="showCardIntro">
            <div class="box">
                <!-- <div class="box__shadow"></div><img class="box__img" src="@/assets/img/trivial-pursuit/TrivialPursuit2.png" alt="" /> -->
                <div class="box__shadow"></div><img class="box__img" src="@/assets/img/icons/flat/bitcoin.svg" alt="" />
                <h3 class="box__title"><span class="box__title-inner" data-hover="">{{ item.category }}</span></h3>
                <h4 class="box__text"><span class="box__text-inner">{{ item.prejudice }}</span></h4>
            </div>
        </a>

        <!-- </transition> -->
    </div>
    <NewsTicker />
</div>
</template>

<script>
import NewsTicker from "@/components/NewsTicker.vue";
import Search from "@/components/Search.vue";
// import BitcoinAnimation from "@/components/BitcoinAnimation.vue";

export default {
    name: "Index",
    components: {
        Search,
        NewsTicker
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
    methods: {
        showCardIntro(event) {
            // adds a sign to the card that is visited TODO: make it so that everything is clickable and results in a sign
            event.target.closest("a").classList.add("visited");

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

            if (sound) bleep.play();

        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
// svg.bitcoinimage {
// .box__img {
//     fill: #f59074;
//     stroke: #f59074;
// }
</style>
