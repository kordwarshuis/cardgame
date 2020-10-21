<template>
<!-- <div id="app" class="container-fluid"> -->
<div id="app" class="container-fluid">
    <TwitterRealTimeConfigModal />
    <MainMenu />
    <!-- <slideInMenu /> -->
    <twitterRealtime3 />
    <!-- <CryptoRadio /> -->
    <router-view />
    <!-- <NewsTicker /> -->
    <Person1 />
    <Person2 />
    <!-- <Person3 /> -->
    <!-- <TwitterRealTime2 /> -->

    <Toasts :time-out="2000"></Toasts>
</div>
</template>

<script>
import publicPath from "../vue.config";
// import slideInMenu from "@/components/slideInMenu.vue";
import twitterRealtime3 from "@/components/twitterRealtime3.vue";
import TwitterRealTimeConfigModal from "@/components/TwitterRealTimeConfigModal.vue";
import MainMenu from "@/components/MainMenu.vue";
// import CryptoRadio from "@/components/CryptoRadio.vue";
// import '~snapsvg/dist/snapsvg/dist/snap.svg.js';
// import * as Hammer from "hammerjs";
// import NewsTicker from "@/components/NewsTicker.vue";
import Person1 from "@/components/AnimatedCharacters/Person1.vue";
import Person2 from "@/components/AnimatedCharacters/Person2.vue";

export default {
    components: {
        TwitterRealTimeConfigModal,
        MainMenu,
        // slideInMenu,
        twitterRealtime3,
        // CryptoRadio,
        // NewsTicker,
        // Hammer,
        Person1,
        Person2
    },
    data: function () {
        return {}
    },
    mounted() {
        // this.soundSetting();
        this.initSound();
        // realTimeTweets.start({
        //     source: process.env.VUE_APP_REALTIME_TWITTER_JSON
        // });

    },
    methods: {
        //TODO: change 'of' to 'off'
        // soundSetting() {
        //     // radio buttons for sound on off:
        //     var soundButton = document.querySelectorAll('input[name = "soundOnOf"]');
        //     var i;

        //     // set radio buttons with localstorage value, if any:
        //     if (localStorage.getItem("soundOnOf") !== null) {
        //         var val = localStorage.getItem("soundOnOf"); // local storage value
        //         for (i = 0; i < soundButton.length; i++) {
        //             if (soundButton[i].value === val) {
        //                 soundButton[i].checked = true; // marking the required radio as checked
        //             }
        //         }
        //     }

        //     // set soud variable based on radio buttons setting:
        //     for (i = 0; i < soundButton.length; i++) {
        //         if (soundButton[i].checked === true) {
        //             if (soundButton[i].value === "on") {
        //                 sound = true;
        //             } else {
        //                 sound = false;
        //             }
        //         }
        //     }

        //     // dealing with radio buttons user interactions:
        //     var prev = null; // not used here
        //     for (i = 0; i < soundButton.length; i++) {
        //         soundButton[i].addEventListener('change', function () {
        //             // (prev) ? console.log(prev.value): null;
        //             if (this !== prev) {
        //                 prev = this;
        //             }

        //             localStorage.setItem("soundOnOf", this.value);
        //             if (this.value === "on") {
        //                 sound = true;
        //             } else {
        //                 sound = false;
        //             }
        //         });
        //     }
        // },
        initSound() {
            var button = document.querySelector("#activateSound");

            // see index.html for declaration of vars
            alert = new Howl({
                src: [require("./assets/audio/330050__paulmorek__beep-03-single.mp4")]
            });
            alertSpecialAccount = new Howl({
                src: [require("./assets/audio/175893__toiletrolltube__110923-02-falling-metal-10.mp4")]
            });
            dong = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/288912__littlerobotsoundfactory__click-soft-00.mp4")]
            });
            go = new Howl({
                volume: 0.5,
                src: [require("./assets/audio/394477__gameloops__gamepack1-main-horrible-finish.mp4")]
            });
            whoosh = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/99263__robinhood76__01762-whoosh.mp4")]
            });
            whoosh2 = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/399934__waveplay__short-click-snap-perc.mp4")]
            });
            whistle = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/110390__soundscalpel-com__cartoon-siren-whistle-001.mp4")]
            });
            electricity = new Howl({
                volume: 0.1,
                loop: true,
                src: [require("./assets/audio/341609__pureaudioninja__electricity-1.mp4")]
            });
            typewriter = new Howl({
                volume: 0.6,
                loop: true,
                // src: [require("./assets/audio/love.mp4")]
                src: [require("./assets/audio/331656__trollarch2__keyboard-typing.mp4")]
            });
            // pur = new Howl({
            //     volume: 1,
            //     // loop: true,
            //     src: [require("./assets/audio/130968__cubilon__cat-purring.mp4")]
            // });
            click = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/click.mp4")]
            });

            // document.querySelectorAll("a").forEach(item => item.addEventListener('click', function () {
            //     click.play()
            // }, false));
            // document.querySelectorAll("button").forEach(item => item.addEventListener('click', function () {
            //     click.play()
            // }, false));
        }
    }
}
</script>

<style lang="scss">
@import "~bootstrap/dist/css/bootstrap.min.css";
// @font-face {
//     font-family: 'FontAwesome';
//     src: url('./assets/fonts/fontawesome-webfont.eot?v=4.5.0');
//     src: url('./assets/fonts/fontawesome-webfont.eot?#iefix&v=4.5.0') format('embedded-opentype'),
//         url('./assets/fonts/fontawesome-webfont.woff2?v=4.5.0') format('woff2'),
//         url('./assets/fonts/fontawesome-webfont.woff?v=4.5.0') format('woff'),
//         url('./assets/fonts/fontawesome-webfont.ttf?v=4.5.0') format('truetype'),
//         url('./assets/fonts/fontawesome-webfont.svg?v=4.5.0#fontawesomeregular') format('svg');
//     font-weight: normal;
//     font-style: normal;
// }

// /*type writer like*/
// /*! Generated by Font Squirrel (https://www.fontsquirrel.com) on October 22, 2016 */
// @font-face {
//     font-family: 'special_eliteregular';
//     src: url('./assets/fonts/specialelite-webfont.woff2') format('woff2'),
//         url('./assets/fonts/specialelite-webfont.woff') format('woff');
//     font-weight: normal;
//     font-style: normal;
// }

/*! Generated by Font Squirrel (https://www.fontsquirrel.com) on October 9, 2020 */
@font-face {
    font-family: 'poppinsbold';
    src: url('./assets/fonts/poppins/bold/poppins-bold-webfont.woff2') format('woff2'),
        url('./assets/fonts/poppins/bold/poppins-bold-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

/*! Generated by Font Squirrel (https://www.fontsquirrel.com) on October 9, 2020 */
@font-face {
    font-family: 'poppinsmedium';
    src: url('./assets/fonts/poppins/medium/poppins-medium-webfont.woff2') format('woff2'),
        url('./assets/fonts/poppins/medium/poppins-medium-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

/*! Generated by Font Squirrel (https://www.fontsquirrel.com) on October 9, 2020 */
@font-face {
    font-family: 'poppinsregular';
    src: url('./assets/fonts/poppins/regular/poppins-regular-webfont.woff2') format('woff2'),
        url('./assets/fonts/poppins/regular/poppins-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

body {
    font-family: poppinsregular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 0.9rem;
    min-height: 100%;
    color: $text;
    background-color: $background;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    body {
        background-image: url(./assets/img/background-blocks.svg);
        background-repeat: no-repeat;
        background-position: left bottom;
        background-attachment: fixed;
        background-size: 40%;
    }
}

.bcb {
    background-color: $backgroundBCB;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    text-transform: uppercase;
    font-family: poppinsbold;
}

p {
    font-size: 1.2em;
}

/*accessibility*/
.visuallyhidden {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.preview-open {
    overflow: hidden;
}

a {
    text-decoration: none;
    color: $generalLinksText;
    outline: none;
}

a:hover,
a:focus {
    color: $generalLinksTextHover;
    outline: none;
}

.hidden {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
    pointer-events: none;
}

/* Icons */
// .icon {
//     display: block;
//     width: 1.5em;
//     height: 1.5em;
//     margin: 0 auto;
//     fill: currentColor;
// }

.border {
    border: 1px solid $_border1 !important;
}

// https://codepen.io/joeyhoer/pen/BmqIx
hr {
    border: 1px dashed #A3A8B7;
    width: 50%;
}

.menu hr {
    margin: 0.35em auto;
    background-image: radial-gradient(closest-side, $hr1menu, 100%);
}

.menu hr:after {
    background-color: $hr1menu;
    border: 4px solid $hr1menu;
    box-shadow: -10px 10px 0, 10px -10px 0 $hr1menu;
}

/* het sluiten van de eerste popup: */
.overlay__close,
/* het sluiten van de tweede popup: */
button // related Items

// .relatedItems a,
/* alle links in de tweede popup: */
// .modal-content a
/* het menu met alle categorieen */
// .categoryLinks a 
    {
    // border: 3px solid $linksBorder;
    /* border-radius: 5px; */
    border: none;
    color: $linksText;
    display: inline-block;
    padding: 0.5em;
    margin: 0.3em;
    transition: background 0.3s ease-in-out;
    cursor: pointer;
}

a.overlay__close:not(.overlay__close-cross):hover,
.copyURLtoClipboard:hover {
    transform: rotate(360deg);
    transition: transform 0.3s;
}

.copyURLtoClipboard:hover {
    background-size: contain;
}

.copyURLtoClipboard {
    background: transparent url(./assets/img/icons/flat/sheet.svg) no-repeat center;
    background-size: contain;
    // padding: 3em 1.2em 3em 2em;
    // padding: 1.5em 0.6em 1.5em 1em;
    // padding: 0.7em;
    // margin-bottom: 1em;

    border: 1px solid green;
    line-height: 0.7;
    width: 1.5em;
    padding: 0 !important;
    margin: 0 !important;
    z-index: auto;
    transition: transform 0.3s;
    color: transparent;
}

.modal-content .modalbox-iconbackground.related {
    text-align: center;
    display: block;
    width: 100%;
}

.modal-content .related a,
.md-content button {
    margin: 0 0.3em 0.5em;
}

.copyURLtoClipboard.showWhatToDo {
    border-style: dashed;
    cursor: default;
    background: transparent;
    // display: block !important;
}

.copyURLtoClipboard.showWhatToDo:focus {
    outline: 0;
}

/* het sluiten van de eerste popup: */
.overlay__close:hover,
/* het sluiten van de tweede popup: */
// button:hover,
/* alle links in de tweede popup: */
// .modal-content a:hover,
/* het menu met alle categorieen */
/* het sluiten van de eerste popup: */
.overlay__close:hover {
    background-color: transparent;
    transition: background 0.3s ease-in-out;
}

/* de button voor het kopieren van tekst */
.kopieertekst {
    border: 3px solid #fff;
    background: #685D79;
    color: #222;
}

.kopieertekst:hover,
.kopieertekst:focus {
    border: 3px solid #fff;
    background: #5e5074;
}

#socialMediaTekst {
    /* background: #685D79 !important; */
    border: 3px solid #2196F3;
    color: #ccc;
    line-height: 1.6;
    font-weight: normal;
    display: block;
    margin-bottom: 0.5rem;
    width: 100%;
    min-height: 2em;
}

#attentionSeeker {
    display: none;
    // display: block;
    position: fixed;
    top: 0;
    left: 0;
    // transform: translate(-50%, 0);
    width: 100%;
    height: 100%;
    // border: 3px solid #900;
    background: transparent url(./assets/img/animated-gif/party.gif) no-repeat center;
    background-size: contain;
    z-index: 9;
    pointer-events: none;
}

#attentionSeeker.visible {
    display: block !important;
}

.card-video {
    width: 6em;
    float: left;
    margin-right: 1em;
    // display: inline-block;
}

.card-img {
    width: 10em;
    float: left;
    margin-right: 1em;
    // display: inline-block;
}

.toast-container {
    color: #111;
}

.toast {
    background-color: #eee;
}

// realtime tweets
.card {
    border-radius: 10px;
}

.select-tweet,
.go-to-tweet {
    background: linear-gradient(to right, #5C34A7, #2376D6);
}

.tweets-selected .select-tweet {
    display: none;
}

// .tweets-realtime .go-to-tweet {
//     display: none;
// }

.tweets-realtime .tweet-instruction {
    display: none;
}

.tweet.curated .card {
    background-color: rgb(250, 239, 202) !important;
}

.curatedTweetIndication {
    position: absolute;
    top: 10px;
    right: 10px;

}

// .tweet.curated .card:after {
//     content: "★";
//     color: red;
//     font-size: 3em;
//     position: absolute;
//     right: -0.5em;
//     top: -0.5em;
// }
</style>
