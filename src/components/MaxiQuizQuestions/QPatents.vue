<template>
        <section id='quiz-patents' class='snelleovergang clearfix'>
        <div class='tekst clearfix p-3'>
            <div class='w30em displayinlineblock'>
                <hr>

                <h2 class="nummering">–</h2>
                <h3>Patents with regard to bitcoin have been imposed on:</h3>
                <form class='maxiquiz'>
                    <fieldset>
                        <legend>Choose the right answer:</legend>
                        <label>the scaling of bitcoin
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                        <label>the orignal Satoshi whitepaper 2008
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                        <label>centralized bitcoin services
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" value="goud" /></label>
                        <label>the decentralized network and parts of the blockchain protocol
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                    </fieldset>
                </form>
            </div>
        </div>
        <div v-linkified:options="$store.state.linkifyOptions" class="tekst clearfix toelichting displayNone almost-visible" style="">
            <p>One of the main feature is that the bitcoin ecosystem can't be owned. Only services built on top of that could be patented and it's a free choice to use or bypass patented  products.</p>
            <p class="volgende-pijl">↓</p>
            <p class="volgende-tekst">scroll down</p>
            <p class="score"></p>
        </div>
    </section>
</template>
<script>

export default {
    name: "QPatents"
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/quiz/skin7.01.scss";
</style>
