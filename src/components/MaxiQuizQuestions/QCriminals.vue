<template>
        <section id='v1flsnyhkbjwetpojnfjvinskd' class='snelleovergang clearfix'>
        <div class='tekst clearfix p-3'>
            <div class='w30em displayinlineblock'>
                <!-- <p class="categorie">Category: Basics</p> -->
                <hr>
                <h1>Important:</h1>
                <p>You can always scroll back to read an answer or answer a question later.</p>
                <hr>

                <h2 class="nummering">–</h2>
                <h3>Is Bitcoin used by criminals?</h3>
                <!-- <p>-</p> -->
                <form class='maxiquiz'>
                    <fieldset>
                        <legend>Choose the right answer:</legend>
                        <label>Yes.
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" value="goud" /></label>
                        <label>No.
                            <input type="radio" class="maxiQuizVraag" name="maxiQuizVraag" /></label>
                    </fieldset>
                </form>
            </div>
        </div>
        <div class="tekst clearfix toelichting displayNone almost-visible" style="">
            <video class="" src="@/assets/video/quiz/bitcoin-crime-andreas-antonopoulos.mp4" preload="metadata" poster="@/assets/video/quiz/bitcoin-crime-andreas-antonopoulos.jpg" controls playsinline></video>
            <p>Transcript will follow. Link to source at the end.</p>
            <p>Bitcoin is indeed used by criminals.</p>
            <p>To put things in perspective: the dollar, euro, cars and supermarkets are also used by criminals.</p>
            <!-- <hr> -->
            <p class="volgende-pijl">↓</p>
            <p class="volgende-tekst">scroll down</p>
            <p class="score"></p>
        </div>
    </section>

</template>
<script>

export default {
    name: "QCriminals"
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/quiz/skin7.01.scss";
</style>
