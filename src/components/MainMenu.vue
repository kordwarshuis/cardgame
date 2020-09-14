<template>
<div id="nav" class="text-center">
    <router-link to="/">Cards</router-link>
    <router-link to="/about">About</router-link>
    <router-link v-if="this.$store.state.gameName === 'Bitcoin'" to="/twitter-real-time">Realtime</router-link>
    <router-link v-if="this.$store.state.gameName === 'Bitcoin'" to="/scores">Scores</router-link>
</div>
</template>

<script>
export default {
    name: "MainMenu"
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>

#nav a {
    display: inline-block;
    padding: 1em;
    color: #eee;
}

</style>
