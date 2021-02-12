<template>
<div v-if="(randomCardButton === 'true')" class="p-2 mb-3 mt-3 text-center ">
    <p>
        <router-link class="btn btn-outline-primary btn-sm mr-2" :to="'/card/' + randomCard">{{randomCardButtonText}}</router-link>
    </p>
</div>
</template>

<script>
export default {
    name: "RandomCard",
    data() {
        return {
            randomCardButton: process.env.VUE_APP_RANDOM_CARD,
            randomCard: "",
            randomCardButtonText: language.random
        }
    },
    computed: {
        getCards: function () {
            return this.$store.state.theJSON;
        }
    },
    watch: {
        getCards(newValue) { // https://stackoverflow.com/a/44073272/9749918
            this.randomCard = newValue[Math.floor(Math.random() * newValue.length)]['Unique URL'];
        },
        '$route'(to, from) { // https://flaviocopes.com/vue-watchers/
            this.randomCard = this.$store.state.theJSON[Math.floor(Math.random() * this.$store.state.theJSON.length)]['Unique URL'];
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

</style>
