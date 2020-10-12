<template>
<div class="content-item miniQuizContainer modalbox-iconbackground border p-3 mb-3" v-if="this.$store.state.currentCard['Quiz']">
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
import publicPath from "../../vue.config";
export default {
    name: "Quiz",
    methods: {
        quizMultipleChoice(e) {
            var domCorrectAnswer;

            // rigth answer chosen
            if (e.target.value === "true") {
                // add class after innerHTML not possible as node is changed by innerHTML?
                e.target.parentNode.insertAdjacentHTML("beforeend", "<span class='antw antw-vinkje'>√</span>");

                if (localStorage.getItem("soundOn") === "true") go.play();
                document.querySelector("body").classList.add("person1");
                setTimeout(function () {
                    document.querySelector("body").classList.remove("person1");
                }, 4000);
                console.log(publicPath.publicPath);

            } else {
                // wrong answer chosen
                // if you have more than one 'correct' then you end up here, no need for more code
                domCorrectAnswer = e.target.parentNode.parentNode.querySelector("input[value='true']").parentNode;

                if (localStorage.getItem("soundOn") === "true") whistle.play();
                setTimeout(
                    function () {
                        domCorrectAnswer.insertAdjacentHTML("beforeend", "<span class='antw antw-vinkje'>√</span>");
                    },
                    800);

                e.target.parentNode.insertAdjacentHTML("beforeend", "<span class='antw antw-kruis'>×</span>");

                document.querySelector("body").classList.add("person2");
                setTimeout(function () {
                    document.querySelector("body").classList.remove("person2");
                }, 4000);
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

.miniQuizContainer {}

.quizExplanation {
    margin: 0.5em 0;
    padding: 1em;
    border-top: 1px dashed #0B364D;
    color: #366F0C;

}

.quizExplanation.displayNone {
    display: none;
}

/*
  * EINDE MINI QUIZ
  */
</style>
