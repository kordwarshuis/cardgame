<template>
<div class="">
    <div class=" pt-8 m-4 text-center">
        <VueFuse placeholder="Search" event-name="results" :list="this.$store.state.theJSON" :keys="['Prejudice', 'Prejudice Elaborate']" :defaultAll="false" class="border " />

    </div>

    <div v-for="book in results" :key="book.Prejudice" @click="$store.commit('showCardIntroFromURL', book['Unique URL'])">
        <!-- <router-link :to="'/card/' + book['Unique URL']"> -->
        <h3 style="cursor: pointer" class="w-1/4">{{ book.Prejudice }}</h3>
        <p style="cursor: pointer" class="ml-4 w-3/4">{{ book['Prejudice Elaborate'] }}</p>
        <!-- </router-link> -->
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
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="scss">
</style>
