<template>
<!-- negate doesnt seem to work -->
<div v-if="(this.$store.state.currentCard['Self Hosted Video'])" class="content-item p-3">
    <!-- <h3 class="video">Video</h3> -->

    <VideoSelfHostedBare />

    <p class="video-description" v-linkified:options="$store.state.linkifyOptions" v-for="item in this.$store.state.currentCard['Self Hosted Video Description']" v-bind:key="item">{{ item }}</p>

</div>
</template>

<script>
import store from "../store/store";
import VideoSelfHostedBare from "@/components/VideoSelfHostedBare.vue";
export default {
    name: "VideoSelfHosted",
    components: {
        VideoSelfHostedBare
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
