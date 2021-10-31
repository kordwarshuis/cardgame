<template>
<nav class="navbar navbar-expand-md sticky-top">
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
    border-width: $main-menu-border-width;
    border-style: $main-menu-border-style;
    border-color: $main-menu-border-color;
    padding-top: $main-menu-padding-top;
    padding-right: 0;
    padding-bottom: $main-menu-padding-bottom;
    padding-left: 0;
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
        color: $main-menu-link-active;
        background: $main-menu-link-background-active;
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


// 1: encode svg to data:image: https://yoksel.github.io/url-encoder/
// 2: use scss var in data:image: https://stackoverflow.com/a/25478589
@function main-menu-icons-colors($colour) {
    @return '%23' + str-slice('#{$colour}', 2, -1)
}

.navbar .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='#{main-menu-icons-colors($main-menu-icons-color)}' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='21.67' height='22.848'%3E%3Cdefs/%3E%3Cg data-name='Group 165' transform='translate(.096 .531)'%3E%3Crect width='10.635' height='2.279' fill='#{main-menu-icons-colors($main-menu-icons-color)}' data-name='Rectangle 31' rx='1.139' transform='rotate(43 -10.108 24.21)'/%3E%3Cg data-name='Group 164'%3E%3Cg fill='none' stroke='#{main-menu-icons-colors($main-menu-icons-color)}' stroke-width='3' data-name='Ellipse 7' transform='translate(-.096 -.531)'%3E%3Ccircle cx='9' cy='9' r='9' stroke='none'/%3E%3Ccircle cx='9' cy='9' r='7.5'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
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
