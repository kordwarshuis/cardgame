
<template>
<!-- negate doesnt seem to work -->
<div v-if="(this.$store.state.currentCard['Self Hosted Video'])" class="mt-3">
    <!-- <h3 class="video">Video</h3> -->

    <MediaSelfHostedBare />

    <p class="video-description" v-linkified:options="$store.state.linkifyOptions" >{{this.$store.state.currentCard['Self Hosted Video Description']}}</p>
</div>
</template>

<script>
import store from "../store/store";
import MediaSelfHostedBare from "@/components/MediaSelfHostedBare.vue";
export default {
    name: "MediaSelfHosted",
    components: {
        MediaSelfHostedBare
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
