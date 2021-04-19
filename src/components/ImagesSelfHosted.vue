<template>
<div class="card h-100 p-3 mb-3 mt-3" style="column-break-inside: auto;">
    <div v-if="(this.$store.state.currentCard['Self Hosted Image 1'])" >
        <img class="mb-4" :src="this.$store.state.currentCard['Self Hosted Image 1']" :alt="this.$store.state.currentCard['Self Hosted Image Alt 1']">
        <p class="image-description" v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard['Self Hosted Image Description 1']}}</p>
        <hr class="mb-5">
    </div>
    <div v-if="(this.$store.state.currentCard['Self Hosted Image 2'])" >
        <img class="mb-4" :src="this.$store.state.currentCard['Self Hosted Image 2']" :alt="this.$store.state.currentCard['Self Hosted Image Alt 2']">
        <p class="image-description" v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard['Self Hosted Image Description 2']}}</p>
        <hr class="mb-5">
    </div>
    <div v-if="(this.$store.state.currentCard['Self Hosted Image 3'])" >
        <img class="mb-4" :src="this.$store.state.currentCard['Self Hosted Image 3']" :alt="this.$store.state.currentCard['Self Hosted Image Alt 3']">
        <p class="image-description" v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard['Self Hosted Image Description 3']}}</p>
        <hr class="mb-5">
    </div>
    <div v-if="(this.$store.state.currentCard['Self Hosted Image 4'])" >
        <img class="mb-4" :src="this.$store.state.currentCard['Self Hosted Image 4']" :alt="this.$store.state.currentCard['Self Hosted Image Alt 4']">
        <p class="image-description" v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard['Self Hosted Image Description 4']}}</p>
        <hr class="mb-5">
    </div>
</div>
</template>

<script>
export default {
    name: "ImagesSelfHosted"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
img {
    width: 100%;
}
</style>
