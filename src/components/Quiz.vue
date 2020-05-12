<template>
  <div class="miniQuizContainer modalbox-iconbackground">
    <p>Quizzzz</p>
    
    <!-- <div>  -->
    <p v-if="gember">{{gember}}</p>
    <!-- </div> -->
    
    <!-- <p>{{filteredFruits()}}</p> -->
    <button @click="filteredFruits()">go</button>


    <p>Quizzzz</p>
    <hr>
    <!-- <p>{{ this.$store.state.currentPrejudice["Quiz"] }}</p> -->
    <hr>
    <!-- <button @click="splitQuizString()">do</button> -->
    <form class="miniquiz miniquiz1">
      <fieldset>
        <!-- <legend>{{ quizItems[0] }}</legend> -->

        <!-- <label v-for="question in quizItems">{{ question }}<input type="radio" class="miniQuizVraag"
            name="miniQuizVraag"></label> -->

        <label>xxx<input type="radio" class="miniQuizVraag" name="miniQuizVraag"></label>
        <label>xxx<input type="radio" class="miniQuizVraag" name="miniQuizVraag"></label>
        <label>xxx<input type="radio" class="miniQuizVraag" name="miniQuizVraag" value="correct"></label>
      </fieldset>
    </form>
    <div class="quizExplanation displayNone">xxx</div>
  </div>
</template>

<script>
  export default {
    name: "Quiz",

    computed: {

    },

    data: function () {
      return {
        gember: "tijdelijk"
      }
    },



    mounted: function () {
      // this.$nextTick(function () {
        console.log('created called.');
        // this.filteredFruits();
      // })
    },
    methods: {
      quizMultipleChoice(domSelectorArg) {
        var domInputs = document.querySelectorAll(domSelectorArg + " input.miniQuizVraag");
        var inputsLength = domInputs.length;

        if (sound) {
          var audioAnswerGood = document.querySelector("#miniQuizRight");
          var audioAnswerWrong = document.querySelector("#miniQuizWrong");
        }

        function checkAnswer() {
          var isChecked = this.checked;
          var value = this.value;
          var domCorrectAnswer;

          // totaalAantalVragenBeantwoord++;
          // goede antwoord gekozen
          if (isChecked === true && value === "correct") {
            // class toevoegen na innerHTML gaat niet blijkbaar omdat de node door innerHTLM veranderd wordt?
            // this.parentNode.innerHTML += "<span class='antw antw-vinkje'>√</span>";
            this.parentNode.insertAdjacentHTML("beforeend", "<span class='antw antw-vinkje'>√</span>");
            play(audioAnswerGood);
          } else

          // foute antwoord gekozen
          {
            // stel je hebt meerdere "correct", zoals bij een miniquiz waarin je vraagt om een beoordeling, dan kom je hier, in deze "else"  niet terecht, dus hoef ik verder niks te regelen
            domCorrectAnswer = this.parentNode.parentNode.querySelector("input[value='correct']").parentNode;

            setTimeout(
              function () {
                // domCorrectAnswer.innerHTML += "<span class='antw antw-vinkje'>√</span>";
                domCorrectAnswer.insertAdjacentHTML("beforeend", "<span class='antw antw-vinkje'>√</span>");
              },
              800);

            // this.parentNode.innerHTML += "<span class='antw antw-kruis'>×</span>";
            this.parentNode.insertAdjacentHTML("beforeend", "<span class='antw antw-kruis'>×</span>");
            play(audioAnswerWrong);
          }

          // a CSS solution for avoiding that you can click multiple times on an answer
          // deSectie.classList.add("avoid-clicks");
          setTimeout(function () {
            document.querySelector(".quizExplanation").classList.remove("displayNone");
          }, 1000);
        }

        while (inputsLength--) {
          domInputs[inputsLength].addEventListener("change", checkAnswer, false);
        }
      },
      filteredFruits() {
        console.log("123");
        var quizString = this.$store.state.currentPrejudice["Quiz"];
        // console.log('quizString: ', quizString);

        function splitQuizString(quizString) {
          console.log('quizString: ', quizString);
          // console.log(this.$store.state.currentPrejudice["Quiz"]);
          if (quizString !== "") {
            // https://stackoverflow.com/a/5963202
            // and the divider is a |
            return quizString.split("|");
          }
        }
        // return "korkorkorkorkorkor" + this.$store.state.currentPrejudice["Quiz"];
        // var temp = this.splitQuizString(this.$store.state.currentPrejudice["Quiz"]);
        // return splitQuizString(quizString);
        this.gember = splitQuizString(quizString);
      }

    }



  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>