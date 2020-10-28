<template>
<div class="">
    <div class="">
        <VueFuse placeholder="Search" event-name="results" :list="this.$store.state.theJSON" :keys="['Prejudice', 'Prejudice Elaborate']" :defaultAll="false" class="searchBar border form-control m-0" />
    </div>
    <div class="search-results-container hideSearchResults">
        <div>
            <span style="font-size: 2em;position: absolute; right: 10px; top: 10px;cursor: pointer;">×</span>
            <h1 class="hideSearchResults m-3 mt-5 display-5 text-center">Search Results</h1>
            <div class="search-results" v-for="book in results" :key="book.Prejudice" @click="$store.commit('showCardIntroFromURL', book['Unique URL'])">
                <router-link :to="'/card/' + book['Unique URL']">
                    <h2 style="cursor: pointer" class="w-1/4">{{ book.Prejudice }}</h2>
                    <p style="cursor: pointer" class="ml-4 w-3/4">{{ book['Prejudice Elaborate'] }}</p>
                </router-link>
                <!-- <hr> -->
            </div>
        </div>
    </div>

</div>
</template>

<script>
import {
    language
} from "@/assets/js/Language.js";
import VueFuse from "vue-fuse";
import {
    disableBodyScrollMixin
} from "./mixins/disableBodyScroll";

export default {
    name: "Search",
    mixins: [disableBodyScrollMixin],
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
        });
        this.hideSearchResults();
        this.showSearchResults();
        this.disableBodyScroll(".search-results-container"); //mixin
    },
    methods: {
        hideSearchResults() {
            document.querySelector(".search-results-container").addEventListener("click", function () {
                this.classList.add('hideSearchResults');
            }, false);
            document.querySelector(".search-results-container h1").addEventListener("click", function () {
                this.classList.add('hideSearchResults');
            }, false);
        },
        showSearchResults() {
            document.querySelector('.searchBar').addEventListener('input', function () {
                document.querySelector(".search-results-container").classList.remove('hideSearchResults');
                document.querySelector(".search-results-container h1").classList.remove('hideSearchResults');
            }, false);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.searchBar {
    background: #393E4D;
    color: #eee;
    width: 12em;
    margin: 0 auto !important;
    // display: block;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .searchBar {
        background: #393E4D;
        height: 1.5em;
        width: 8em;
        margin-left: 1.5em !important;
    }
}

.search-results {
    padding: 2em;
    border: 1px dashed #eee;
    border-radius: 10px;
    margin: 2em;

}

.search-results a {
    color: #eee;
}

.search-results-container {
    position: fixed;
    top: 10em;
    padding-bottom: 12em;
    left: 0;
    font-size: 1em;
    background: #222;
    overflow: scroll;
    height: 100%;
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 1);
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .search-results-container {
        top: 3em;
    }
}

.search-results-container h2 {
    font-size: 1.2em;
}

.hideSearchResults {
    display: none;
}
</style>
