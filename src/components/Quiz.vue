<template>
<div class="miniQuizContainer modalbox-iconbackground border p-3 mb-3" v-if="this.$store.state.currentCard['Quiz']">
    <h3 class="quiz">Quiz</h3>
    <form class="miniquiz">
        <fieldset>
            <legend>{{ this.$store.state.currentCard["Quiz"][0].question}}</legend>
            <label v-for="answer in this.$store.state.currentCard['Quiz'][1].answers" v-bind:key="answer[0]">{{ answer[0] }}<input @change="quizMultipleChoice" type="radio" class="miniQuizVraag" name="miniQuizVraag" :value="answer[1]"></label>
        </fieldset>
    </form>
    <div class="quizExplanation displayNone">{{ this.$store.state.currentCard["Quiz"][2].explanation }}</div>
</div>
</template>

<script>
export default {
    name: "Quiz",
    methods: {
        quizMultipleChoice(e) {
            var isChecked = this.checked;
            var value = this.value;
            var domCorrectAnswer;

            // totaalAantalVragenBeantwoord++;
            // goede antwoord gekozen
            if (e.target.value === "true") {
                // class toevoegen na innerHTML gaat niet blijkbaar omdat de node door innerHTLM veranderd wordt?
                // this.parentNode.innerHTML += "<span class='antw antw-vinkje'>√</span>";
                e.target.parentNode.insertAdjacentHTML("beforeend", "<span class='antw antw-vinkje'>√</span>");
                // play(audioAnswerGood);
            } else

            // foute antwoord gekozen
            {
                // stel je hebt meerdere "correct", zoals bij een miniquiz waarin je vraagt om een beoordeling, dan kom je hier, in deze "else"  niet terecht, dus hoef ik verder niks te regelen
                domCorrectAnswer = e.target.parentNode.parentNode.querySelector("input[value='true']").parentNode;

                setTimeout(
                    function () {
                        domCorrectAnswer.insertAdjacentHTML("beforeend", "<span class='antw antw-vinkje'>√</span>");
                    },
                    800);

                e.target.parentNode.insertAdjacentHTML("beforeend", "<span class='antw antw-kruis'>×</span>");
                // play(audioAnswerWrong);
            }

            setTimeout(function () {
                document.querySelector(".quizExplanation").classList.remove("displayNone");
            }, 1000);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss">
// scoped doesnt work for the styling of the green checkmark and the cross
/*
 * MINI QUIZ
 */
form.miniquiz,
form.miniquiz label,
form.miniquiz legend,
form.miniquiz input {
    text-align: left;
    display: block;
    float: left;
    width: 100%;
}

form.miniquiz {
    float: none;
    margin-bottom: 2em;
}

form.miniquiz input {
    /*font-size: 3em;*/
}

form.miniquiz .antw {
    position: absolute;
    top: 0;
    left: 0;
    /*font-size: 1.5em;*/
    /*text-shadow: 0 0 6px #000;*/
    /*background-color: transparent;*/
}

form.miniquiz .antw-vinkje {
    font-size: 2em;
    text-shadow: 0 0 1px #eee;
    color: #35a726 !important;
    background: #eee;
}

form.miniquiz .antw-kruis {
    font-size: 2.5em;
    text-shadow: 0 0 1px #eee;
    color: #d8350e !important;
    background: #eee;
}

form.miniquiz label {
    display: block;
    position: relative;
    /*height: 3.5em;*/
}

form.miniquiz input {
    /* verbergen */
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

form.miniquiz label {
    display: inline-block;
    /*margin-left  : -2em;*/
    line-height: 1.5em;
}

form.miniquiz label:before {
    /*content: "O";*/
    font-size: 1.5em;
    content: "☐";
}

form.miniquiz p {
    /*font-size: 0.7em;*/
    margin-left: 1em;
}

.miniquizimage {
    z-index: 4;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 256px;
    height: 256px;
    margin-left: -128px;
    margin-top: -128px;
    display: block;
}

/* fadeIen en FadeOet gebruikt bij de images die in en outfaden bij beantwoorden miniquiz*/

/*TODO: uiteindelijk verwijderen, wordt niet meer gebruikt, vermoedelijk*/
.animated {
    animation-duration: 0.5s;
    animation-fill-mode: both;
}

/*end todo*/

/* fadeIen en FadeOet gebruikt bij de images die in en outfaden bij beantwoorden miniquiz*/
/* let op. dit bepaald hoe snel de afbeelding wegfade, niet HOE LANG HET DUURT voordat dat begint, dus hoe lang het in beeld blijft, ga daarvoor naar JS */
.miniquizanimated {
    animation-duration: 0.5s;
    animation-fill-mode: both;
}

/*
 @-webkit-keyframes fadeOet {
     0% {
         opacity: 1;
         */
/*visibility: hidden;*/
/*
 
     }
     100% {
         opacity: 0;
         visibility: hidden;
     }
 }
 */

@keyframes fadeOet {
    0% {
        opacity: 1;
        /*visibility: hidden;*/
    }

    100% {
        opacity: 0;
        visibility: hidden;
        /* nodig omdat ze over de pagina heenliggen en je wilt toch op links kunnen klikken */
    }
}

/*
 @-webkit-keyframes fadeIen {
     0% {
         visibility: visible;
         opacity: 0;
     }
 
     100% {
         visibility: visible;
         opacity: 1;
     }
 }
 */

@keyframes fadeIen {
    0% {
        visibility: visible;
        opacity: 0;
    }

    100% {
        visibility: visible;
        opacity: 1;
    }
}

.fadeOet {
    /*-webkit-animation-name: fadeOet;*/
    animation-name: fadeOet;
    display: none;
}

.fadeIen {
    /*-webkit-animation-name: fadeIen;*/
    animation-name: fadeIen;
    display: block;
    /* TODO: noodgreep, nu werkt het maar de fade out werkt niet, dit moet beter geregeld worden,
      als ik dit niet doe, kun je alleen eerste modal scrollen en de rest zit er onder en kun je niet bij
      */
}

.miniQuizContainer {}

.quizExplanation {
    margin: 0.5em 0;
    padding: 1em;
    background: #b1eca9;

}

.quizExplanation.displayNone {
    display: none;
}

/*
  * EINDE MINI QUIZ
  */
</style>
