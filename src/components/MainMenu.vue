<template>
<nav class="navbar navbar-expand-md sticky-top pt-0 pb-0 pl-0 pr-0">
    <!-- https://dev.to/yossiabramov/the-native-event-modifier-in-vue-js-bpb -->
    <router-link @click.native="$store.commit('showItemsInSelectedCategory')" class="navbar-brand" to="/"><img :src="logo" :alt="logoAlt"></router-link>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarNav">
        <ul class="nav justify-content-center mr-3">

            <!-- CARDS -->
            <li class="nav-item">
                <!-- https://stackoverflow.com/a/42401686 -->
                <router-link @click.native="$store.commit('showItemsInSelectedCategory')" class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/">{{ menuItemCards }}</router-link>
            </li>

            <!-- ABOUT -->
            <li v-if="aboutPage !== ''">
                <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/about">{{ menuItemAbout }}</router-link>
            </li>

            <!-- SCORES -->
            <li class="nav-item" v-if="showScoresPage === 'true'">
                <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/scores">{{ menuItemScores }}</router-link>
            </li>

            <!-- QUIZ -->
            <li class="nav-item" v-if="quizPage === 'true'">
                <router-link class="nav-link" data-toggle="collapse" data-target=".navbar-collapse.show" to="/quiz">{{ menuItemQuiz }}</router-link>
            </li>

            <!-- SOUND ON OFF -->
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
    data: function () {
        return {
            logo: process.env.VUE_APP_LOGO,
            logoAlt: process.env.VUE_APP_LOGO_ALT,
            aboutPage: process.env.VUE_APP_ABOUT_PAGE_SOURCE,
            showScoresPage: process.env.VUE_APP_REALTIME_TWEETS, // if realtime tweets is “on” -> scores page. Note: True is not a boolean but a string
            quizPage: process.env.VUE_APP_QUIZ,
            menuItemCards: language.menu.cards,
            menuItemAbout: language.menu.about,
            menuItemScores: language.menu.scores,
            menuItemQuiz: language.menu.quiz
        }
    },
    components: {
        Search,
        SoundToggle
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.navbar {
    background: $main-menu-background;
    // https://forum.freecodecamp.org/t/bootsrap-4-5-navbar-full-width/233369 :
    // margin-right: -15px;
    // margin-left: -15px;
    // margin-left: -3rem;
    // margin-right: -3rem;
    // box-shadow: 100px 0 0px 0px #909060;
    // border-right: 100px solid #909060;
    // border-left: 100px solid #909060;
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
        color: $main-menu-link;

    }

    .router-link-exact-active {
        background: $main-menu-link-active;
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
