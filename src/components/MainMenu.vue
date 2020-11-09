<template>
<nav class="navbar navbar-expand-md sticky-top pt-0 pb-0 pl-2 pr-2">
    <!-- https://dev.to/yossiabramov/the-native-event-modifier-in-vue-js-bpb -->
    <router-link @click.native="$store.commit('showItemsInSelectedCategory')" class="navbar-brand" to="/"><img src="@/assets/img/logo/blockchainbird-logo.png" alt=""></router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="nav justify-content-center ">
            <li class="nav-item">
                <!-- https://stackoverflow.com/a/42401686 -->
                <router-link @click.native="$store.commit('showItemsInSelectedCategory')" class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/">Cards</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/about">About</router-link>
            </li>
            <!-- <li class="nav-item" v-if="this.$store.state.gameId === 'btc'">
                <router-link class="nav-link" v-if="this.$store.state.gameId === 'btc'" data-toggle="collapse" data-target=".navbar-collapse.show" to="/twitter-real-time">Realtime</router-link>
            </li> -->
            <li class="nav-item" v-if="this.$store.state.gameId === 'btc'">
                <router-link class="nav-link" v-if="this.$store.state.gameId === 'btc'" data-toggle="collapse" data-target=".navbar-collapse.show" to="/scores">Scores</router-link>
            </li>
            <li class="nav-item" v-if="this.$store.state.gameId === 'btc'">
                <router-link class="nav-link" v-if="this.$store.state.gameId === 'btc'" data-toggle="collapse" data-target=".navbar-collapse.show" to="/quiz">Quiz</router-link>
            </li>
            <li class="nav-item" style="border-right: none;">
                <SoundToggle />
            </li>
        </ul>
        <Search />
    </div>
</nav>
</template>

<script>
import SoundToggle from "@/components/SoundToggle.vue";
import Search from "@/components/Search.vue";

export default {
    name: "MainMenu",
    components: {
        Search,
        SoundToggle
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.navbar {
    background: #191F3A;
    // https://forum.freecodecamp.org/t/bootsrap-4-5-navbar-full-width/233369 :
    margin-right: -15px;
    margin-left: -15px;
}

// a:link {}
// a:visited {}
// a:focus, a:hover {}
// a:active {}

#navbarNav {
    padding-bottom: 2em;
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);

    li.nav-item {
        border-right: red !important;
    }

    a:link,
    a:visited,
    a:focus,
    a:hover,
    a:active {
        color: #eee;

    }

    .router-link-exact-active {
        background: #252B44;
    }

}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    #navbarNav {
        padding-bottom: 0;
    }
}

.navbar .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(89,213,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E"), url(../assets/img/icons/jv-creative/magnifier.svg);
    background-position: 32px 0px, 0px 6px;
    background-size: 32px 32px, 22px 22px;
    width: 64px;
}

.navbar .navbar-toggler {
    border: none;
}

.navbar-brand img {
    max-height: 30px;
    margin: 0;
}
</style>
