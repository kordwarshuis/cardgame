import store from "../../store/store";
export default {
    methods: {
        showCardIntro() {
            console.log("radio");

            // console.log('event: ', event);
            console.log("radio");


            // event.target.closest(".card").classList.add("visited");
            // console.log('event.target.closest(".card"): ', event.target.closest(".card"));

            // // https://stackoverflow.com/a/7680123
            // // localStorage can only be string
            // function appendToLocalStorage(name, data) {
            //     var old = localStorage.getItem(name);

            //     // create if not existing
            //     if (old === null) old = "";

            //     // only add if it is not already in the string
            //     if (old.indexOf(data) === -1) localStorage.setItem(name, old + data + " ");
            //     console.log(localStorage.getItem("visited"));
            // }

            // // add current card url to visited in localStorage
            // appendToLocalStorage("visited", this.$store.state.currentCard["Unique URL"]);

            // this.addVisitedToCards();

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