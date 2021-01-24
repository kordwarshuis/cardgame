<template>
<!-- negate doesnt seem to work -->
<div v-if="(this.$store.state.currentCard['Self Hosted Image'])" class="content-item p-3">
    <img :src="path + this.$store.state.currentCard['Self Hosted Image']" :alt="this.$store.state.currentCard['Self Hosted Image Alt']">
    <p class="image-description" v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard['Self Hosted Image Description']}}</p>
</div>
</template>

<script>
import store from "../store/store";
import MediaSelfHostedBare from "@/components/MediaSelfHostedBare.vue";
export default {
    name: "ImageSelfHosted",
    data() {
        return {
            path: process.env.VUE_APP_MEDIA_LOCATION
        }
    },
    components: {
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
img {
    width: 100%;
}
</style>
