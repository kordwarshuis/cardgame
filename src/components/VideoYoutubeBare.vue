<template>
<!-- negate doesnt seem to work -->
<div v-if="(this.$store.state.currentCard['Youtube Video Id'])" class="">
    <div class="videoWrapper">
        <iframe style="border-radius: 20px;" id="youtubeVideo" class="youtube" :src="'https://www.youtube.com/embed/' + this.$store.state.currentCard['Youtube Video Id'] + '?start=' + this.$store.state.currentCard['Youtube Video Start'] + '&end=' + this.$store.state.currentCard['Youtube Video End'] + '&playsinline=1&enablejsapi=1'" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
    </div>
</div>
</template>

<script>
export default {
    name: "VideoYoutubeBare",
    mounted: function () {
        // console.log("mounted");
        this.youtubeVideo();

    },
    methods: {
        youtubeVideo() {
            // https://developers.google.com/youtube/iframe_api_reference#Examples
            // inserting script tag calling youtube iframe api. This is done after this component is mounted. Only then onYouTubeIframeAPIReady() in index.html is run. In the store this is run: youtubePlayer.stopVideo();
            var tag = document.createElement('script');

            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
    },
    beforeUpdate() {
        // console.log('beforeUpdate')
    },
    beforeDestroy() {
        // console.log('beforeDestroy')
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

.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
</style>
