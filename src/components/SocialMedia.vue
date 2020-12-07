<template>
<div>
    <!-- <p style="float: left;margin-top: 0.4em;"> -->
    <!-- Share: -->
    <!-- </p> -->

    <!-- Sharingbutton Facebook -->
    <a class="resp-sharing-button__link" :href="'https://facebook.com/sharer/sharer.php?u=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL']" target="_blank" rel="noopener" aria-label="">
        <img src="../assets/img/icons/social-media-buttons/facebook.svg" alt="facebook logo" />
    </a>

    <!-- Sharingbutton Twitter -->
    <a class="resp-sharing-button__link" :href="'https://twitter.com/intent/tweet/?text=' + this.$store.state.currentCard.Misconception + '&amp;url=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL']" target="_blank" rel="noopener" aria-label="">
        <img src="../assets/img/icons/social-media-buttons/twitter.svg" alt="twitter logo" />
    </a>

    <!-- Sharingbutton E-Mail -->
    <a class="resp-sharing-button__link" :href="'mailto:?subject=' + this.$store.state.currentCard.Misconception + '&amp;body=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL']" target="_self" rel="noopener" aria-label="">
        <img src="../assets/img/icons/social-media-buttons/e-mail.svg" alt="drawing of an envelope" />
    </a>

    <!-- Sharingbutton Pinterest -->
    <a class="resp-sharing-button__link" :href="'https://pinterest.com/pin/create/button/?url=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL'] + '&amp;media=' + '' + '&amp;description=' + this.$store.state.currentCard.Misconception" target="_blank" rel="noopener" aria-label="">
        <img src="../assets/img/icons/social-media-buttons/pinterest.svg" alt="pinterest logo" />
    </a>

    <!-- Sharingbutton LinkedIn -->
    <a class="resp-sharing-button__link" :href="'https://www.linkedin.com/shareArticle?mini=true&amp;url=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL'] + '&amp;title=' + this.$store.state.currentCard.Misconception + '&amp;summary=' + this.$store.state.currentCard.Misconception + '&amp;source=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL']" target="_blank" rel="noopener" aria-label="">
        <img src="../assets/img/icons/social-media-buttons/linked-in.svg" alt="linkedin logo" />
    </a>
</div>
</template>

<script>
import publicPath from "../../vue.config";
export default {
    name: "SocialMedia",
    data: function () {
        return {
            publicPath: publicPath.publicPath,
            windowLocationOrigin: window.location.origin
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.socialMediaButtonsContainer {
    text-align: center;
    // margin-bottom: 1em;
}

img {
    margin: 1.0em 1em;
    width: 1.2em;
}
</style>
