<template>
<ul class="nav mb-3 pt-2">
    <li class="nav-item">
        <router-link class="nav-link" to="/">Cards</router-link>
    </li>
    <li class="nav-item">
        <router-link class="nav-link" to="/about">About</router-link>
    </li>
    <li class="nav-item" v-if="this.$store.state.gameName === 'Bitcoin'">
        <router-link class="nav-link" v-if="this.$store.state.gameName === 'Bitcoin'" to="/twitter-real-time">Realtime</router-link>
    </li>
    <li style="border-right: none;" class="nav-item" v-if="this.$store.state.gameName === 'Bitcoin'">
        <router-link class="nav-link" v-if="this.$store.state.gameName === 'Bitcoin'" to="/scores">Scores</router-link>
    </li>
    <li style="border-right: none;">
        <SoundToggle />
    </li>
</ul>
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
// #nav a {
//     display: inline-block;
//     padding: 1em;
//     color: #eee;
// }

.nav {
    color: #ddd;
    background: #191F3A;
}

.nav li {
    border-right: 1px solid #666;
}

.nav a {
    color: #ddd;
}
</style>
