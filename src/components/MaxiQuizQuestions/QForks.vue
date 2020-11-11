<template>
<section id='quiz-forks' class='snelleovergang clearfix'>
    <div class='tekst clearfix p-3'>
        <div class='w30em displayinlineblock'>
            <hr>

            <h2 class="nummering">–</h2>
            <h3>What are correct existing types of bitcoin forks?</h3>
            <form class='maxiquiz'>
                <fieldset>
                    <legend>Choose the right answer:</legend>
                    <label>Hard&soft, consensus&quantum
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                    <label>Hard&soft
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                    <label>Temporal&permanent, soft&hard,accidental&planned
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" value="goud" /></label>
                    <label>Hard&fungible
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                </fieldset>
            </form>
        </div>
    </div>
    <div v-linkified:options="$store.state.linkifyOptions" class="tekst clearfix toelichting displayNone almost-visible" style="">
        <p>“There are a variety of fork types—as such, we have temporal and permanent forks, soft and hard forks, but also accidental and planned forks.” </p>
        <p>https://bitfortune.net/bitcoin-forks/</p>
        <p class="volgende-pijl">↓</p>
        <p class="volgende-tekst">scroll down</p>
        <p class="score"></p>
    </div>
</section>
</template>

<script>
import store from "../../store/store";
export default {
    name: "QForks"
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/quiz/skin7.01.scss";
</style>
