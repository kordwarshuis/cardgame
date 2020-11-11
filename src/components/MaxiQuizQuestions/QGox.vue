<template>
        <section id='quiz-gox' class='snelleovergang clearfix'>
        <div class='tekst clearfix p-3'>
            <div class='w30em displayinlineblock'>
                <hr>

                <h2 class="nummering">–</h2>
                <h3>What is the name of the bitcoin exchange that was hacked in 2014?</h3>
                <form class='maxiquiz'>
                    <fieldset>
                        <legend>Choose the right answer:</legend>
                        <label>Mt. Tox
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                        <label>Mr. Hash
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                        <label>Mt. Gox
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" value="goud" /></label>
                        <label>Mr. Gox
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                    </fieldset>
                </form>
            </div>
        </div>
        <div v-linkified:options="$store.state.linkifyOptions" class="tekst clearfix toelichting displayNone almost-visible" style="">
            <p>Mt. Gox announced that approximately 850,000 bitcoins belonging to customers and the company were missing and likely stolen, an amount valued at more than $450 million at the time (Wikipedia).</p>
            <p class="volgende-pijl">↓</p>
            <p class="volgende-tekst">scroll down</p>
            <p class="score"></p>
        </div>
    </section>
</template>
<script>

export default {
    name: "QGox"
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/quiz/skin7.01.scss";
</style>
