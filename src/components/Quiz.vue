<template>
  <div class="miniQuizContainer modalbox-iconbackground">
    <p>Quizzzz</p>

    <p>{{ this.$store.state.currentPrejudice["Quiz"] }}</p>
    <!-- <button @click="splitQuizString()">do</button> -->
    <form class="miniquiz miniquiz1">
      <fieldset>
        <legend>xxx</legend>
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
    data() {
      return {
        quizString: this.$store.state.currentPrejudice["Quiz"],
        quizItems: []
      }
    },
      mounted: function() {
        this.splitQuizString(this.quizString)
      },
    computed: {
      // this.splitQuizString(this.quizString)
      ditiseentest: function() {
        console.log("ditiseentest");
      }
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
      splitQuizString(quizString) {
        console.log('quizString: ', quizString);
        // QUIZ
        // if (quizString !== "") {
        //   // https://stackoverflow.com/a/5963202
        //   // and the divider is a |
        //   this.quizItems = quizString.split("|");      
        // }
      }
    }



  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>