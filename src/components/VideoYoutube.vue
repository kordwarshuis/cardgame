<template v-if="(this.$store.state.currentCard['Youtube Video Id'])">
<!-- negate doesnt seem to work -->
<div>
    <!-- <h3 class="video">Video</h3> -->

    <VideoYoutubeBare />

    <p class="video-description" v-linkified:options="$store.state.linkifyOptions" v-for="item in this.$store.state.currentCard['Youtube Video Description']" v-bind:key="item">{{ item }}</p>

</div>
</template>

<script>
import store from "../store/store";
import VideoYoutubeBare from "@/components/VideoYoutubeBare.vue";
export default {
    name: "VideoYoutube",
    components: {
        VideoYoutubeBare
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.video-description {
    font-size: 0.9em;
    margin-left: 0;
}
</style>
