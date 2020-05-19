<template>
<div class="md:w-1/2 center bg-teal-light min-h-screen overflow-scroll">
    <div class="flex flex-col pt-8">
        <VueFuse placeholder="Search" event-name="results" :list="this.$store.state.theJSON" :keys="['Prejudice', 'Prejudice Elaborate']" :defaultAll="false" class="w-64 text-center h-8 border rounded-lg center" />

    </div>
    <!-- <div v-for="book in results" :key="book.Prejudice" :data-id="book['Unique URL']" @click="showCardIntro" class=""> -->
    <div v-for="book in results" :key="book.Prejudice" :data-id="book['Unique URL']" @click="$store.commit('showCardIntroFromURL', book['Unique URL'])" class="">
    <!-- <div v-for="book in results" :key="book.Prejudice" :data-id="book['Unique URL']" class=""> -->
        <!-- <div> -->
        <router-link :to="'/card/' + book['Unique URL']">
            <h3 class="w-1/4">{{ book.Prejudice }}</h3>
            <p class="ml-4 w-3/4">{{ book['Prejudice Elaborate'] }}</p>
        </router-link>

        <!-- </div> -->
    </div>
</div>
</template>

<script>
import {
    language
} from "@/assets/js/Language.js";
import VueFuse from "vue-fuse";

export default {
    name: "Search",
    components: {
        VueFuse
    },
    data() {
        return {
            results: []
        }
    },
    mounted: function () {
        this.$on('results', results => {
            this.results = results
        })
    },
    methods: {
        createSearchResultRoute(itemName) {
            console.log("asperge");
            // this.$router.push("/card/" + currentCard["Unique URL"]).catch(err => {});
            // this.$router.push("/card/" + itemName);
            // this.$store.commit("changeCssClassCardIntroState", "open");
            // this.$store.commit("changeCssClassCardOverviewState", "overlay-fullscreen-open");
            // this.$store.commit("changeCard", this.$store.getters.getCard(itemName));

        },
        showCardIntro(event) {
            // deal with CSS to open and close
            this.$store.commit("changeCssClassCardIntroState", "open");
            this.$store.commit("changeCssClassCardOverviewState", "overlay-fullscreen-open");

            // returns object with all entries of one prejudice
            var currentCard = this.$store.getters.getCard(event.target.dataset.id);
            this.$store.commit("changeCard", currentCard);

            // set URl to the item that was clicked
            // catch error: https://stackoverflow.com/a/58747480
            // this.$router.push("/card/" + currentCard["Unique URL"]).catch(err => {});
            // this.$router.push("/card/" + currentCard["Unique URL"]);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
</style>
