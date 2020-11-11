<template>
<section id='quiz-laundering' class='snelleovergang clearfix'>
    <div class='tekst clearfix p-3'>
        <div class='w30em displayinlineblock'>
            <hr>

            <h2 class="nummering">–</h2>
            <h3>How much money do banks launder worldwide EVERY YEAR in terms of the current bitcoin marketcap which is $130 billion in Dec 2019?</h3>
            <form class='maxiquiz'>
                <fieldset>
                    <legend>Choose the right answer:</legend>
                    <label>0.11 times total bitcoin Marketcap EACH year
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                    <label>1.1 times total bitcoin Marketcap EACH year
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                    <label>11 times total bitcoin Marketcap EACH year
                        <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" value="goud" /></label>
                </fieldset>
            </form>
        </div>
    </div>
    <div v-linkified:options="$store.state.linkifyOptions" class="tekst clearfix toelichting displayNone almost-visible" style="">
        <p>So just image: you have to use every single bitcoin in the world on average 11 times to launder the money that banks and others launder every year ! You still think bitcoin is for money laundering? Or do you think somebody's fooling you around to distract attention?
            "Global money laundering 2-5% of GDP per year" according to Money-Laundering and Globalization
            United Nations Office on Drugs and Crime Web Site. (https://www.unodc.org/unodc/en/money-laundering/globalization.html), 800bn - 2tn per year, that is 6-16x btc market cap. While marketcap is a fake number, the amount laundered is of course not.</p>
        <p class="volgende-pijl">↓</p>
        <p class="volgende-tekst">scroll down</p>
        <p class="score"></p>
    </div>
</section>
</template>

<script>
export default {
    name: "QLaundering"
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/quiz/skin7.01.scss";
</style>
