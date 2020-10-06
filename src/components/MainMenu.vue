<template>
<nav class="navbar navbar-expand-sm sticky-top p-0 pl-2 pr-2">
    <router-link class="navbar-brand" to="/"><img src="@/assets/img/logo/cropped-header_bcb.png" alt=""></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
                <!-- https://stackoverflow.com/a/42401686 -->
                <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/">Cards</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/about">About</router-link>
            </li>
            <li class="nav-item" v-if="this.$store.state.gameName === 'Bitcoin'">
                <router-link class="nav-link" v-if="this.$store.state.gameName === 'Bitcoin'" data-toggle="collapse" data-target=".navbar-collapse.show" to="/twitter-real-time">Realtime</router-link>
            </li>
            <li class="nav-item" v-if="this.$store.state.gameName === 'Bitcoin'">
                <router-link class="nav-link" v-if="this.$store.state.gameName === 'Bitcoin'" data-toggle="collapse" data-target=".navbar-collapse.show" to="/scores">Scores</router-link>
            </li>
        </ul>
    </div>
</nav>
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

.navbar {
    background: #191F3A;
    // https://forum.freecodecamp.org/t/bootsrap-4-5-navbar-full-width/233369 :
    margin-right: -15px;
    margin-left: -15px;
}

a {
    color: #eee;
}

.navbar .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(89,213,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
}

.navbar .navbar-toggler {
    border: none;
}

.navbar-brand img {
    max-height: 30px;
    margin: 0;
    // border: 1px solid red;
}

// .navbar {
//     position: relative;
//     width: 100%;
// }

// .navbar-nav-scroll {
//     position: fixed;
//     color: #ddd;
//     background: #191F3A;
//     padding-right: 2em;

//     margin-right: -13em;
//     margin-bottom: 1em;
//     margin-left: -1em;
//     z-index: 5;

//     max-width: calc(100%);
//     overflow: hidden;

// }

// .navbar-nav-scroll .navbar-nav {
//     overflow-x: auto;
//     white-space: nowrap;
//     -webkit-overflow-scrolling: touch
// }

// /* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
// @media (min-width: 768px) {
//     .navbar-nav-scroll {
//         position: relative;
//     }

// }

// .navbar-nav-scroll li {
//     border-right: 1px solid #444;
//     padding: 0.5em 1em;
// }

// .navbar-nav-scroll a {
//     color: #ddd;
// }
</style>
