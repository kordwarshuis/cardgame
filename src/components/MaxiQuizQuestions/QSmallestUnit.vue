<template>
        <section id='quiz-smallest-unit' class='snelleovergang clearfix'>
        <div class='tekst clearfix p-3'>
            <div class='w30em displayinlineblock'>
                <hr>

                <h2 class="nummering">–</h2>
                <h3>What is the smallest unit on the bitcoin - blockchain can you own?</h3>
                <form class='maxiquiz'>
                    <fieldset>
                        <legend>Choose the right answer:</legend>
                        <label>1 bitcoin cent = 0.01 BTC
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag"  /></label>
                        <label>1 micro BTC = 0.000001 BTC
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                        <label>1 satoshi = 0.0000001 BTC
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" value="goud" /></label>
                        <label>1 millisatoshi = 0.00000000001 BTC
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                    </fieldset>
                </form>
            </div>
        </div>
        <div v-linkified:options="$store.state.linkifyOptions" class="tekst clearfix toelichting displayNone almost-visible" style="">
            <p>On chain smallest unit is 1 sathosi. 1 sat = 0.00000001 BTC Blockchain value, 1 msat = 0.00000000001 BTC Payment channel value</p>
            <p class="volgende-pijl">↓</p>
            <p class="volgende-tekst">scroll down</p>
            <p class="score"></p>
        </div>
    </section>
</template>
<script>

export default {
    name: "QSmallestUnit"
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/quiz/skin7.01.scss";
</style>
