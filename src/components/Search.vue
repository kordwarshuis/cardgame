<template>
<!-- https://codepen.io/AndrewThian/pen/QdeOVa -->
<div class="">
    <div class="input-group ml-3 align-center" style="width: 10em !important;">
        <input @keydown="showSearchResults" @change="showSearchResults" v-model="search" class="searchBar  border form-control" />
    </div>

    <div class="search-results-container hideSearchResults">
        <div>
            <span style="font-size: 2em;position: absolute; right: 10px; top: 10px;cursor: pointer;">×</span>
            <h1 class="hideSearchResults m-3 mt-5 display-5 text-center">Everything about “{{search}}”</h1>

            <div class="search-results" v-for="card in computedFilteredList" :key="card.Prejudice" @click="$store.commit('showCardIntroFromURL', card['Unique URL'])">
                <router-link :to="'/card/' + card['Unique URL']">
                    <h2 style="cursor: pointer" class="w-1/4">{{ card.Prejudice }}</h2>
                    <p v-linkified:options="$store.state.linkifyOptions" style="cursor: pointer" class="ml-4 w-3/4">{{ card['Prejudice Elaborate'] }}</p>
                    <p v-linkified:options="$store.state.linkifyOptions" class="category mb-3 pt-1 pl-2 pr-2 pb-0" :class="card.Cat" style="display: inline-block; border-radius: 10px;">{{card.Cat}}</p>
                    <p v-linkified:options="$store.state.linkifyOptions" style="font-size: 1em;" v-html="card.searchResultSnippet">{{card.searchResultSnippet}}</p>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import store from "../store/store";
// import {
//     language
// } from "@/assets/js/Language.js";
import {
    disableBodyScrollMixin
} from "./mixins/disableBodyScroll";

export default {
    name: "Search",
    mixins: [disableBodyScrollMixin],
    components: {},
    data() {
        return {
            search: '',
            cards: [],
            searchResultSnippet: ""
        }
    },
    computed: {
        getCards: function () {
            return this.$store.state.theJSON;
        },
        computedFilteredList: function () {
            return this.filteredList();
        },
    },
    watch: {
        getCards(newValue, oldValue) {
            this.cards = newValue;
        }
    },
    mounted: function () {
        this.hideSearchResults();
        this.disableBodyScroll(".search-results-container"); //mixin
        this.processQueryParams();
    },
    methods: {
        filteredList() {
            var allKeys = this.$store.state.allKeys;

            // this updates the URL with what is entered in search field
            // this runs onload, and router should only push when search is not empty, to avoid a redirect to /search
            if (this.search !== undefined) {
                if (this.search !== "") {
                    this.$router.push({
                        // path: '/',
                        query: {
                            search: this.search.toLowerCase()
                        }
                    }).catch(err => {}) //https://stackoverflow.com/a/58747480

                    return this.cards.filter(card => {
                        var results = false;

                        // go through all columns, Prejudice, Prejudice Elaborate, Short Answer etc
                        for (let i = 0; i < allKeys.length; i++) {
                            if (this.search !== undefined) {
                                // if (typeof card[allKeys[i]] === "string" && card[allKeys[i]] !== "") {
                                if (card[allKeys[i]] !== undefined) {

                                    // NOTE: the search is done in almost all columns, except the ones where there is created an array out of strings separated by commas
                                    if (card[allKeys[i]].toString().toLowerCase().includes(this.search.toLowerCase()) === true) {
                                        // if a match is found, then this entry should be shown
                                        // https://stackoverflow.com/a/494046
                                        var replace = this.search;
                                        var re = new RegExp((replace), "gi");
                                        card.searchResultSnippet = card[allKeys[i]].toString().replace(re, "<em>" + replace + "</em>");
                                        results = true;
                                    }
                                }
                            }
                        }
                        return results;
                    })
                }
            }

        },
        processQueryParams() {
            // https://stackoverflow.com/a/21903119
            var getUrlParameter = function getUrlParameter(sParam) {
                var sPageURL = window.location.search.substring(1),
                    sURLVariables = sPageURL.split('&'),
                    sParameterName,
                    i;

                for (i = 0; i < sURLVariables.length; i++) {
                    sParameterName = sURLVariables[i].split('=');

                    if (sParameterName[0] === sParam) {
                        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
                    }
                }
            };

            this.search = getUrlParameter('search');

            if (this.search !== undefined) {
                this.filteredList();
                document.querySelector('.navbar-toggler').click();
                this.showSearchResults();
            }
        },
        hideSearchResults() {
            document.querySelector(".search-results-container").addEventListener("click", function () {
                this.classList.add('hideSearchResults');
            }, false);
            document.querySelector(".search-results-container h1").addEventListener("click", function () {
                this.classList.add('hideSearchResults');
            }, false);
        },
        showSearchResults() {
            document.querySelector(".search-results-container").classList.remove('hideSearchResults');
            document.querySelector(".search-results-container h1").classList.remove('hideSearchResults');
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
    // text-decoration: underline;
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

.search-results-container h1 {
    font-size: 1.7em;
}

.search-results-container h2 {
    font-size: 1.2em;
}

.hideSearchResults {
    display: none;
}
</style>
