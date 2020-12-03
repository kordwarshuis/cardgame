<template>
<div>
    <div class="" :class="this.$store.state.cssClassCardOverviewState">
        <Cards />
    </div>
    <CardIntro />
    <CardFull />
</div>
</template>

<script>
// @ is an alias to /src
import store from "../store/store";
import Cards from "@/components/Cards.vue";
import CardIntro from "@/components/CardIntro.vue";
import CardFull from "@/components/CardFull.vue";

export default {
    name: "Home",
    data() {
        return {}
    },
    components: {
        Cards,
        CardIntro,
        CardFull
    },
    watch: { //https://www.reddit.com/r/vuejs/comments/58g6u7/how_can_i_detect_the_browser_back_button_with_vue/
        '$route'(to, from) { // https://flaviocopes.com/vue-watchers/
            // if there is a card in the url -> card should be shown:
            if (to.params.card !== undefined) {
                // deal with CSS to open and close
                this.$store.commit("changeCssClassCardIntroState", "open");
                this.$store.commit("changeCssClassCardOverviewState", "overlay-fullscreen-open");
                var currentCard = this.$store.getters.getCard(to.params.card);
            }
            // if there is no card, then intro-screen should not be shown
            else {
                // TODO: this is scattered around and should be made into a function / method or something
                this.$store.commit("changeCssClassCardIntroState", "");
                this.$store.commit("changeCssClassCardOverviewState", "");
                // if you close the intro card, the full card screen should also be closed.
                // TODO: see also toggleOverlayFullscreen, rewrite
                this.$store.commit('hideModal');
            }

            if (currentCard !== undefined) {
                this.$store.commit("changeCard", currentCard);
            }
        }
    },
    mounted: function () {

        this.undoCategorySelection();
    },

    // https://stackoverflow.com/a/44347195
    methods: {
        undoCategorySelection() {
            this.$store.commit('showItemsInSelectedCategory');
        },
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
// https://stackoverflow.com/a/57764811
body.ios-device {
    cursor: pointer !important;
    /* iOS click events don't fire without this! */
}

// .container {
//     overflow-x: hidden;
//     // -webkit-transition: -webkit-transform 0.5s;
//     transition: transform 0.5s;
// }

// .container.overlay-fullscreen-open {
//     -webkit-transform: translateX(50%);
//     transform: translateX(50%);
// }

// .container::after {
//     content: '';
//     opacity: 0;
//     visibility: hidden;
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(0, 0, 0, 0.6);
//     // -webkit-transition: opacity 0.5s, visibility 0s 0.5s;
//     transition: opacity 0.5s, visibility 0s 0.5s;
// }
</style>
