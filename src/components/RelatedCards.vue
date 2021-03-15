<template>
<div class="card h-100 border p-3 mb-3 text-center relatedItems" v-if="this.$store.state.currentCard['Related']">
    <h3 class="related">{{ related }}</h3>
    <p>
        <span v-for="item in this.$store.state.currentCard['Related']" v-bind:key="item" @click="$store.commit('showCardIntroFromURL', item)">
            <router-link class="btn btn-primary mr-2" style="border: none; background: #373E65;" :to="'/card/' + item">{{ item }}</router-link>
        </span>
    </p>
</div>
</template>

<script>
export default {
    name: "RelatedCards",
    data() {
        return {
            related: language.related
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

</style>
