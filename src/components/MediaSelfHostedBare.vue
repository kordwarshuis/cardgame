<template>
<!-- if video -->
<div v-if="(this.$store.state.currentCard['Self Hosted Video'].indexOf('mp4') > -1)" class="">
    <div class="videoWrapper">
        <video :src="path + this.$store.state.currentCard['Self Hosted Video']" controls playsinline></video>
    </div>
</div>

<!-- if audio -->
<div v-else-if="(this.$store.state.currentCard['Self Hosted Video'].indexOf('mp3') > -1)" class="">
    <div class="audioWrapper">
        <audio :src="path + this.$store.state.currentCard['Self Hosted Video']" controls></audio>
    </div>
</div>
</template>

<script>
export default {
    name: "MediaSelfHostedBare",
    data() {
        return {
            path: process.env.VUE_APP_MEDIA_LOCATION
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/* https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php */
.videoWrapper {
    position: relative;
    padding-bottom: 56.25%;
    /* 16:9 */
    padding-top: 25px;
    height: 0;
    margin-bottom: 3em;
}

.videoWrapper video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
</style>
