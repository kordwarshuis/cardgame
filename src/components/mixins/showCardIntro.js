export default {
    methods: {
        showCardIntro() {
            // deal with CSS to open and close
            this.$store.commit("changeCssClassCardIntroState", "open");
            this.$store.commit("changeCssClassCardOverviewState", "overlay-fullscreen-open");

            // returns object with all entries of one misconception
            var currentCard = this.$store.getters.getCard(event.target.closest("a").dataset.id);

            this.$store.commit("changeCard", currentCard);

            // set URl to the item that was clicked
            this.$router.push("/card/" + currentCard["Unique URL"]);

            if (localStorage.getItem("soundOn") === "true") whoosh2.play();
        }
    }
};