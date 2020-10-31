<template>
<!-- https://codepen.io/AndrewThian/pen/QdeOVa -->
<div class="">
    <div class="input-group ml-3 align-center" style="width: 80% !important;">
        <input v-model="search" class="searchBar  border form-control" />
    </div>

    <div class="search-results-container hideSearchResults">
        <div>
            <span style="font-size: 2em;position: absolute; right: 10px; top: 10px;cursor: pointer;">×</span>
            <h1 class="hideSearchResults m-3 mt-5 display-5 text-center">Search Results</h1>

            <div class="search-results" v-for="card in filteredList" :key="card.Prejudice" @click="$store.commit('showCardIntroFromURL', card['Unique URL'])">
                <router-link :to="'/card/' + card['Unique URL']">
                    <h2 style="cursor: pointer" class="w-1/4">{{ card.Prejudice }}</h2>
                    <p style="cursor: pointer" class="ml-4 w-3/4">{{ card['Prejudice Elaborate'] }}</p>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import store from "../store/store";
import {
    language
} from "@/assets/js/Language.js";
import {
    disableBodyScrollMixin
} from "./mixins/disableBodyScroll";

export default {
    name: "Search2",
    mixins: [disableBodyScrollMixin],
    components: {},
    data() {
        return {
            search: '',
            cards: []
        }
    },
    computed: {
        getCards: function () {
            return this.$store.state.theJSON;
        },
        filteredList() {
            var allKeys = [];

            for (var k in this.cards[0]) {
                if (this.cards[0].hasOwnProperty(k)) {
                    // console.log("Key is " + k + ", value is: " + this.cards[0][k]);
                    allKeys.push(k);
                }
            }

            return this.cards.filter(card => {
                var results = false;
                    for (let i = 0; i < allKeys.length; i++) {
                        // NOTE: the search is done in almost all columns, except the ones where there is created an array out of strings separated by commas
                        if (typeof card[allKeys[i]] === "string" && card[allKeys[i]].toLowerCase().includes(this.search.toLowerCase()) === true) {
                            results = true;
                        }
                    }
                return results;
            })
        }
    },
    watch: {
        getCards(newValue, oldValue) {
            this.cards = newValue;
        }
    },
    mounted: function () {
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
            document.querySelector('.searchBar').addEventListener('keydown', function () {
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
        // height: 1.5em;
        // width: 8em;
        // margin-left: 1.5em !important;
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
