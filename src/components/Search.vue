<template>
<div class="">
    <div class="m-0 p-0 pt-2">
        <VueFuse placeholder="Search" event-name="results" :list="this.$store.state.theJSON" :keys="['Prejudice', 'Prejudice Elaborate']" :defaultAll="false" class="border " />

    </div>

    <div class="search-results" v-for="book in results" :key="book.Prejudice" @click="$store.commit('showCardIntroFromURL', book['Unique URL'])">
        <router-link :to="'/card/' + book['Unique URL']">
            <h3 style="cursor: pointer" class="w-1/4">{{ book.Prejudice }}</h3>
            <p style="cursor: pointer" class="ml-4 w-3/4">{{ book['Prejudice Elaborate'] }}</p>
        </router-link>
        <hr>
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

<style lang="scss" scoped>
.search-results a {
    color: #eee;
}

input {
    background: #393D4E;
    border-radius: 7px;
}
</style>
