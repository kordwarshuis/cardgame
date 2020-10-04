<template>
<div class="navbar-nav-scroll">
    <!-- <ul class="nav mb-3 pt-2"> -->
    <ul class="navbar-nav bd-navbar-nav flex-row">
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
// scrollable menu, more or less copied from https://getbootstrap.com/docs/4.5/assets/css/docs.min.css

.navbar-nav-scroll {
    color: #ddd;
    background: #191F3A;
    padding-right: 2em;

    margin-right: -1em;
    margin-bottom: 1em;
    margin-left: -1em;
}

.navbar-nav-scroll li {
    border-right: 1px solid #444;
    padding: 0.5em 1em;
}

.navbar-nav-scroll a {
    color: #ddd;
}

@media (max-width: 992px) {
    .navbar-nav-scroll {
        max-width: calc(100%+2em);
        overflow: hidden;
    }

    .navbar-nav-scroll .navbar-nav {
        overflow-x: auto;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch
    }
}
</style>
