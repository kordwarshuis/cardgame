<template>
<div id="nav" class="text-center">
    <router-link to="/">Cards</router-link>
    <router-link to="/about">About</router-link>
    <router-link v-if="this.$store.state.gameName === 'Bitcoin'" to="/twitter-real-time">Realtime</router-link>
    <router-link v-if="this.$store.state.gameName === 'Bitcoin'" to="/scores">Scores</router-link>
    <SoundToggle />
</div>
</template>

<script>
import SoundToggle from "@/components/SoundToggle.vue";

export default {
    name: "MainMenu",
    components: {
        SoundToggle
    }
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
