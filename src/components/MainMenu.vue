<template>
<nav class="navbar navbar-expand-md sticky-top pt-0 pb-0 pl-0 pr-0">
    <!-- https://dev.to/yossiabramov/the-native-event-modifier-in-vue-js-bpb -->
    <a class="navbar-brand" :href="logoURL"><img :src="logo" :alt="logoAlt"></a>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse pb-0" id="navbarNav">
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

            <!-- INFO -->
            <button type="button" class="key-bindings-info btn btn-outline-dark align-middle inline ml-2 mt-0 pt-1" style="border: none;" data-toggle="modal" data-target="#shortcutKeysHelp">
                <span class="visuallyhidden">Tweetstream info</span>
                <img style="width: 20px;" src="@/assets/img/icons/ui/question.svg" alt="" />
            </button>
        </ul>
        <Search />
        <div class="text-center navbar-toggler2" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">▲</div>
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
            logoURL: process.env.VUE_APP_LOGO_URL,
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
    box-shadow: 0 1px 1px 1px #3b5775;

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

    .navbar-toggler2 {
        display: block;
        color: #999;
        cursor: pointer;
        width: 100%;
        margin: 0 auto;
        margin-top: 1em;
    }

}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    #navbarNav {
        padding-bottom: 0;
        box-shadow: none;
    }

    .navbar-toggler2 {
        display: none !important;
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
