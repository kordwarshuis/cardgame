<template>
<!-- negate doesnt seem to work -->
<div v-if="(this.$store.state.currentCard['Self Hosted Video'])" class="">
    <div class="videoWrapper">
        <video :src="path" controls></video>
    </div>
</div>
</template>

<script>
export default {
    name: "VideoSelfHostedBare",
    data() {
        return {
            path: process.env.VUE_APP_MEDIA_LOCATION + this.$store.state.currentCard['Self Hosted Video']
        }
    },
    mounted: function () {
    },
    methods: {
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
