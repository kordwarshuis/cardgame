<template>
<!-- negate doesnt seem to work -->
<div v-if="(this.$store.state.currentCard['Youtube Video Id'])" class="content-item p-3">
    <!-- <h3 class="video">Video</h3> -->

    <VideoBare />
    <p class="video-description ml-0">{{this.$store.state.currentCard["Youtube Video Description"]}}</p>

</div>
</template>

<script>
import VideoBare from "@/components/VideoBare.vue";
export default {
    name: "Video",
    components: {
        VideoBare
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.video-description {
    font-size: 0.7em;;
}
</style>
