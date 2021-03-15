<template>
<div class="content-item card h-100 border p-3 mb-3 miniQuizContainer modalbox-iconbackground" v-if="this.$store.state.currentCard['Quiz']">
    <h3 class="quiz">Quiz</h3>
    <form class="miniquiz">
        <fieldset>
            <legend>{{ this.$store.state.currentCard["Quiz"][0].question}}</legend>
            <label v-for="answer in this.$store.state.currentCard['Quiz'][1].answers" v-bind:key="answer[0]">{{ answer[0] }}<input @change="quizMultipleChoice" type="radio" class="miniQuizVraag" name="miniQuizVraag" :value="answer[1]"></label>
        </fieldset>
    </form>
    <div v-linkified:options="$store.state.linkifyOptions" class="quizExplanation displayNone">{{ this.$store.state.currentCard["Quiz"][2].explanation }}</div>
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
                e.target.parentNode.insertAdjacentHTML("beforeend", "<span class='antw answer-check'>√</span>");

                if (localStorage.getItem("soundOn") === "true") go.play();
                document.querySelector("body").classList.add("person1");
                setTimeout(function () {
                    document.querySelector("body").classList.remove("person1");
                }, 4000);

            } else {
                // wrong answer chosen
                // if you have more than one 'correct' then you end up here, no need for more code
                domCorrectAnswer = e.target.parentNode.parentNode.querySelector("input[value='true']").parentNode;

                if (localStorage.getItem("soundOn") === "true") whistle.play();
                setTimeout(
                    function () {
                        domCorrectAnswer.insertAdjacentHTML("beforeend", "<span class='antw answer-check'>√</span>");
                    },
                    800);

                e.target.parentNode.insertAdjacentHTML("beforeend", "<span class='antw answer-cross'>×</span>");

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

form.miniquiz legend {
    font-size: 1.3em;
}

form.miniquiz label {
    font-size: 1.2em;
}

form.miniquiz legend {
    // padding-left: $cardFullTextIndent;
    // width: calc(100% - $cardFullTextIndent);
}

form.miniquiz .antw {
    position: absolute;
    top: 0;
    left: 0;
    /*font-size: 1.5em;*/
    /*text-shadow: 0 0 6px #000;*/
    /*background-color: transparent;*/
}

form.miniquiz .answer-check {
    font-size: 2em;
    text-shadow: 0 0 1px $basic1;
    color: #35a726 !important;
    background: $basic1;
}

form.miniquiz .answer-cross {
    font-size: 2.5em;
    text-shadow: 0 0 1px $basic1;
    color: #d8350e !important;
    background: $basic1;
}

form.miniquiz input {
    /* hide */
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
    margin-left: calc(#{$cardFullTextIndent} + 1.3em);
    text-indent: -1.3em;
    line-height: 1.5em;
    display: block;
    position: relative;
}

form.miniquiz label:before {
    /*content: "O";*/
    font-size: 1.5em;
    content: "☐";
}

form.miniquiz p {
    margin-left: 1em;
}

.quizExplanation {
    margin: 0.5em 0;
    padding: 1em;
    border-top: 1px dashed #0B364D;
    color: #366F0C;
}

.quizExplanation.displayNone {
    display: none;
}
</style>
