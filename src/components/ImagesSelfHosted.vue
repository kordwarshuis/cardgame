<template>
<div>
    <div v-if="(this.$store.state.currentCard['Self Hosted Image 1'])" class="content-item p-3">
        <img class="mb-4" :src="path + this.$store.state.currentCard['Self Hosted Image 1']" :alt="this.$store.state.currentCard['Self Hosted Image Alt 1']">
        <p class="image-description" v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard['Self Hosted Image Description 1']}}</p>
    </div>
    <div v-if="(this.$store.state.currentCard['Self Hosted Image 2'])" class="content-item p-3">
        <img class="mb-4" :src="path + this.$store.state.currentCard['Self Hosted Image 2']" :alt="this.$store.state.currentCard['Self Hosted Image Alt 2']">
        <p class="image-description" v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard['Self Hosted Image Description 2']}}</p>
    </div>
    <div v-if="(this.$store.state.currentCard['Self Hosted Image 3'])" class="content-item p-3">
        <img class="mb-4" :src="path + this.$store.state.currentCard['Self Hosted Image 3']" :alt="this.$store.state.currentCard['Self Hosted Image Alt 3']">
        <p class="image-description" v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard['Self Hosted Image Description 3']}}</p>
    </div>
    <div v-if="(this.$store.state.currentCard['Self Hosted Image 4'])" class="content-item p-3">
        <img class="mb-4" :src="path + this.$store.state.currentCard['Self Hosted Image 4']" :alt="this.$store.state.currentCard['Self Hosted Image Alt 4']">
        <p class="image-description" v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard['Self Hosted Image Description 4']}}</p>
    </div>
</div>
</template>

<script>
export default {
    name: "ImagesSelfHosted",
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
