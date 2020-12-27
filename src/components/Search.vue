<template>
<!-- https://codepen.io/AndrewThian/pen/QdeOVa -->
<div class="">
    <div class="input-group">
        <input @keydown="onInputChangeOrKeyDown" @change="onInputChangeOrKeyDown" v-model="search" class="searchBar border form-control" :placeholder="searchBarPlaceholderText" />
    </div>

    <div class="search-results-container hideSearchResults">
        <div>
            <button class="buttonHideSearchResults" @click="hideSearchResultsContainerAndRemoveSearchStringFromURL"><span class="visuallyhidden">Close search results</span>×</button>
            <h1 class="hideSearchResults m-3 mt-5 display-5 text-center">Everything about “{{search}}”</h1>

            <div class="search-results" v-for="card in computedFilteredList" :key="card.Misconception" @click="$store.commit('showCardIntroFromURL', card['Unique URL'])">

                <!-- copy card URL to clipboard -->
                <button onclick="return false;" :data-misconception="card['Misconception']" :data-url="'card/' + card['Unique URL']" class="copyURLtoClipboard copyURLtoClipboard6 " style="float: right; width: 2em; height: 2em;vertical-align: top;" title="Copy Link">Copy Link</button>

                <!-- category -->
                <small @click="hideSearchResultsContainer" class="search-result category mb-4 pt-1 pl-2 pr-2 pb-0 display-5" :class="card.Category" style="display: inline-block; border-radius: 10px;">
                    <router-link :to="'/card/' + card['Unique URL']">{{card.Category}}</router-link>
                </small>
                <!-- misconception -->
                <h2 @click="hideSearchResultsContainer" style="cursor: pointer" class="w-1/4">
                    <router-link class="search-result" :to="'/card/' + card['Unique URL']">{{ card.Misconception }}</router-link>
                </h2>

                <!-- misconception longer -->
                <p @click="hideSearchResultsContainer" class="search-result ml-4 w-3/4" style="cursor: pointer">
                    {{ card['Misconception Elaborate'] }}
                </p>

                <!-- go to card -->
                <p @click="hideSearchResultsContainer" style="cursor: pointer" class="w-1/4">
                    <router-link class="search-result" :to="'/card/' + card['Unique URL']">{{goToCard}}</router-link>
                </p>

                <!-- result snippet -->
                <p @click="hideSearchResultsContainer" class="search-result" style="font-size: 1em;" v-html="card.searchResultSnippet">
                    <router-link :to="'/card/' + card['Unique URL']">{{card.searchResultSnippet}}</router-link>
                </p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import store from "../store/store";
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
            searchResultSnippet: "",
            goToCard: language.searchGoToCard,
            searchBarPlaceholderText: language.searchBarPlaceholderText
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
        this.disableBodyScroll(".search-results-container"); //mixin
        this.processQueryParams();

        // https://shubhamjain.co/til/vue-shortcuts/
        this._keyListener = function (e) {
            if (e.key === "Escape") {
                e.preventDefault();
                this.hideSearchResultsContainerAndRemoveSearchStringFromURL();
            }
        };
        document.addEventListener('keydown', this._keyListener.bind(this));
    },
    beforeDestroy() {
        document.removeEventListener('keydown', this._keyListener);
    },
    methods: {
        hideSearchResultsContainerAndRemoveSearchStringFromURL() {
            this.hideSearchResultsContainer();
            // the router push should not run inside hideSearchResultsContainer because it does not play well with the URL handling when opening a card
            this.$router.push("/");
        },
        onInputChangeOrKeyDown() {
            this.filteredList();
            this.showSearchResultsContainer();
        },
        filteredList() {
            var allKeys = this.$store.state.allKeys;

            // this updates the URL with what is entered in search field
            // this runs onload, and router should only push when search is not empty, to avoid a redirect to /search
            if (this.search !== undefined) {
                if (this.search !== "") {
                    this.$router.push({
                        // path: '/',
                        query: {
                            search: this.search.toLowerCase() // https://forum.vuejs.org/t/how-to-remove-one-query-string-from-url/39176/3
                        }
                    }).catch(err => {}) //https://stackoverflow.com/a/58747480

                    return this.cards.filter(card => {
                        var results = false;

                        // go through all columns, Misconception, Misconception Elaborate, Short Answer etc
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

                                        // remove links
                                        // https://stackoverflow.com/a/960178
                                        card.searchResultSnippet = card.searchResultSnippet.replace(/<a\b[^>]*>(.*?)<\/a>/i, "");

                                        // remove URLs
                                        // https://stackoverflow.com/a/23571059
                                        card.searchResultSnippet = card.searchResultSnippet.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');

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
        // Routing: dealing with query parameters in URL on page load. This will send the query parameter value to the search input field
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
                this.showSearchResultsContainer();
            }
        },
        hideSearchResultsContainer() {
            var searchResultsContainer = document.querySelector(".search-results-container");
            var searchResultsContainerH1 = document.querySelector(".search-results-container h1");

            if (searchResultsContainer !== null) {
                searchResultsContainer.classList.add('hideSearchResults');
            }
            if (searchResultsContainerH1 !== null) {
                searchResultsContainerH1.classList.add('hideSearchResults');
            }
        },
        showSearchResultsContainer() {
            document.querySelector(".search-results-container").classList.remove('hideSearchResults');
            document.querySelector(".search-results-container h1").classList.remove('hideSearchResults');
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.searchBar {
    background: $search-bar-background;
    color: $search-bar-color !important;
}
.searchBar:focus {
    background: $search-bar-focus-background;
    color: $search-bar-focus-color;

}

.search-results {
    padding: 2em;
    border: 1px dashed $search-results-color;
    border-radius: 10px;
    margin: 2em auto;
    max-width: 50em;
}

.search-results a {
    color: $search-results-color;
}

.search-results-container {
    position: fixed;
    top: 10em;
    padding-bottom: 12em;
    padding-left: 1em;
    padding-right: 1em;
    left: 0;
    font-size: 1em;
    color: $search-results-color;
    background: $search-results-background;
    overflow: scroll;
    height: 100%;
    width: 100%;
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 1);
}

    .input-group{
        margin-top: 1em;
    }


/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .input-group{
        margin-top: 0;
    }
    
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

.buttonHideSearchResults {
    font-size: 2em;
    position: fixed;
    right: -0.3em;
    top: 4.2em;
    cursor: pointer;
    background: transparent;
    color: $button-hide-search-results-color;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .buttonHideSearchResults {
        top: 1em;
        right: 0;
    }
}
</style>
