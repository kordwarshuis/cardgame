<template>
<div class="p-2 mb-3 mt-3 text-center relatedItems" v-if="this.$store.state.currentCard['Related']">
    <h3 class="related">Related</h3>
    <p>
        <span v-for="item in this.$store.state.currentCard['Related']" v-bind:key="item" @click="$store.commit('showCardIntroFromURL', item)">
            <router-link class="btn btn-primary mr-2" style="border: none; background: #373E65;" :to="'/card/' + item">{{ item }}</router-link>
        </span>
    </p>
</div>
</template>

<script>
export default {
    name: "RelatedCards"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

</style>
