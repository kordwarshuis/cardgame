<template>
<section id='quiz-ponzi' class='snelleovergang clearfix'>
    <div class='tekst clearfix p-3'>
        <div class='w30em displayinlineblock'>
            <hr>

            <h2 class="nummering">–</h2>
            <h3>What is 'ponzi'?</h3>
            <form class='maxiquiz'>
                <fieldset>
                    <legend>Choose the right answer:</legend>
                    <label>the name of an Italian business man
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" value="goud" /></label>
                    <label>a Sicilian exchange in the 18th century
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                    <label>the first crypto currency protocol that cunningly stole money from owners
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                    <label>the mafia that threathened Mt.Gox
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                </fieldset>
            </form>
        </div>
    </div>
    <div v-linkified:options="$store.state.linkifyOptions" class="tekst clearfix toelichting displayNone almost-visible" style="">
        <p>Charles Ponzi, March 3, 1882 – January 18, 1949) was an Italian swindler and con artist in the U.S. and Canada. Born and raised in Italy, he became known in the early 1920s as a swindler in North America for his money-making scheme. He promised clients a 50% profit within 45 days or 100% profit within 90 days, by buying discounted postal reply coupons in other countries and redeeming them at face value as a form of arbitrage. In reality, Ponzi was paying earlier investors using the investments of later investors. While this type of fraudulent investment scheme was not originally invented by Ponzi, it became so identified with him that it now is referred to as a ""Ponzi scheme"". His scheme ran for over a year before it collapsed, costing his "investors" $20 million. (Wikipedia).</p>
        <p class="volgende-pijl">↓</p>
        <p class="volgende-tekst">scroll down</p>
        <p class="score"></p>
    </div>
</section>
</template>

<script>
export default {
    name: "QPonzi"
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/quiz/skin7.01.scss";
</style>
