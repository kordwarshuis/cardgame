<template>
        <section id='quiz-lightning' class='snelleovergang clearfix'>
        <div class='tekst clearfix p-3'>
            <div class='w30em displayinlineblock'>
                <hr>

                <h2 class="nummering">–</h2>
                <h3>What is name of the most promising technology that speeds up the transaction speed?</h3>
                <form class='maxiquiz'>
                    <fieldset>
                        <legend>Choose the right answer:</legend>
                        <label>Grasshopper Network
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                        <label>Mengle Tree Network
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                        <label>Lightning Network
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" value="goud" /></label>
                    </fieldset>
                </form>
            </div>
        </div>
        <div v-linkified:options="$store.state.linkifyOptions" class="tekst clearfix toelichting displayNone almost-visible" style="">
            <p>The Lightning Network is a "Layer 2" payment protocol that operates on top of a blockchain-based cryptocurrency (like Bitcoin). It enables fast transactions among participating nodes and has been touted as a solution to the Bitcoin scalability problem (Wikipedia).</p>
            <p class="volgende-pijl">↓</p>
            <p class="volgende-tekst">scroll down</p>
            <p class="score"></p>
        </div>
    </section>
</template>
<script>

export default {
    name: "QLightning"
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/quiz/skin7.01.scss";
</style>
