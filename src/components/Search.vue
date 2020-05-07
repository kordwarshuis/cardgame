<template>
  <div class="searchContainer animated threeTimes">
    <div>
      <button class="changeGridView" title="Change view"><span class="visuallyhidden">Change view</span></button>
      <input value="search" type="text" id="search" name="search" required minlength="2" maxlength="100" size="30">
    </div>
  </div>

</template>

<script>
  import { language } from "@/assets/js/Language.js";
  export default {
    name: "Search",
    mounted: function() {
      this.search();
    },
    methods: {
      search() {
        var domAllPrejudices = document.querySelectorAll(".grid__item .box");
        // console.log('domAllPrejudices: ', domAllPrejudices);
        var domChangeGridView = document.querySelector(".changeGridView");


        // https://schier.co/blog/2014/12/08/wait-for-user-to-stop-typing-using-javascript.html
        var domTextInput = document.querySelector("#search");
        var domBody = document.querySelector("body");

        // Init a timeout variable to be used below
        var timeout = null;

        // setInputValue: () => {
        function setInputValue(t) {
          // var cat = language.all;
          //if there is no category in url
        console.log(t.$store.state.activeCategory);

          // if (this.$store.state.activeCategory === undefined) {
          //   // the text for 'all categories'
          //   cat = language.all;
          // } else {
          //   cat = simpleRouter.getUrlValue("cat");
          // }
          // domTextInput.value = language.searchFieldText + " in category " + cat;
          // domTextInput.value = language.searchFieldText;
        }

        function showResults(searchString) {
          domBody.classList.add("condensedLayout");

          showAllEntries();

          if (searchString !== "") { // als er iets in het zoekveld staat
            for (var i = 0; i < domAllPrejudices.length; i++) {
              // first hide all
              domAllPrejudices[i].classList.add("hideSearchResult");

              // if searchstring is found then remove class that hides result
              if (
                dataCardsSelection[i].Prejudice.toLowerCase().indexOf(searchString.toLowerCase()) > -1 ||
                dataCardsSelection[i]["Prejudice Elaborate"].toLowerCase().indexOf(searchString.toLowerCase()) > -1
              ) {
                domAllPrejudices[i].classList.remove("hideSearchResult");
              }
            }
          } else { // als er niks (meer) in het zoekveld staat moet alles gewoon weer getoond worden en de originele lay out weer getoond

            showAllEntries();
            domBody.classList.remove("condensedLayout");
          }
        }

        function showAllEntries() {
          for (var i = 0; i < domAllPrejudices.length; i++) {
            domAllPrejudices[i].classList.remove("hideSearchResult");
          }
        }

        function undoSearchResults() {
          showAllEntries();
          setInputValue(this);
        }

        domTextInput.addEventListener("click", function () {
          undoSearchResults();
          this.value = "";
        }, false);

        // Listen for keystroke events
        domTextInput.addEventListener("keyup", function () {
          // textInput.onchange = function (e) {
          // Clear the timeout if it has already been set.
          // This will prevent the previous task from executing
          // if it has been less than <MILLISECONDS>
          clearTimeout(timeout);

          // Make a new timeout set to go off in 800ms
          timeout = setTimeout(function () {
            showResults(domTextInput.value);
          }, 500);
        }, false);


        // toggle the grid lay out
        domChangeGridView.addEventListener("click", function () {
          domBody.classList.toggle("condensedLayout");
        }, false);

        setInputValue(this);
      } // search


    }



  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>