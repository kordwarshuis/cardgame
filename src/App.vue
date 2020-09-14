<template>
<!-- <div id="app" class="container-fluid"> -->
<div id="app" class="container-fluid">

    <MainMenu />
    <!-- <CryptoRadio /> -->
    <router-view />
    <NewsTicker />
    <Person1 />
    <Person2 />
    <!-- <Person3 /> -->
    <Toasts :time-out="2000"></Toasts>
</div>
</template>

<script>
import publicPath from "../vue.config";
import MainMenu from "@/components/MainMenu.vue";
import CryptoRadio from "@/components/CryptoRadio.vue";
// import '~snapsvg/dist/snapsvg/dist/snap.svg.js';
import * as Hammer from "hammerjs";
import NewsTicker from "@/components/NewsTicker.vue";
import Person1 from "@/components/AnimatedCharacters/Person1.vue";
import Person2 from "@/components/AnimatedCharacters/Person2.vue";
// import Person3 from "@/components/AnimatedCharacters/Person3.vue";

export default {
    components: {
        MainMenu,
        CryptoRadio,
        NewsTicker,
        Hammer,
        Person1,
        Person2
        // Person3
    },
    data: function () {
        return {}
    },
    mounted() {
        // this.soundSetting();
        this.initSound();
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
                src: [require("./assets/audio/330070__paulmorek__beep-05-single-2015-06-21.mp4")]
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
//     font-family: 'League Gothic';
//     src: url("./assets/fonts/league_gothic-webfont.eot");
//     src: url("./assets/fonts/league_gothic-webfont.eot?#iefix") format("embedded-opentype"),
//         url("./assets/fonts/league_gothic-webfont.woff") format("woff"),
//         url("./assets/fonts/league_gothic-webfont.ttf") format("truetype"),
//         url("./assets/fonts/league_gothic-webfont.svg#LeagueGothicRegular") format("svg");
//     font-weight: normal;
//     font-style: normal;
// }

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

/*!
 * Web Fonts from fontspring.com
 *
 * All OpenType features and all extended glyphs have been removed.
 * Fully installable fonts can be purchased at http://www.fontspring.com
 *
 * The fonts included in this stylesheet are subject to the End User License you purchased
 * from Fontspring. The fonts are protected under domestic and international trademark and
 * copyright law. You are prohibited from modifying, reverse engineering, duplicating, or
 * distributing this font software.
 *
 * (c) 2010-2016 Fontspring
 *
 *
 *
 *
 * The fonts included are copyrighted by the vendor listed below.
 *
 * Vendor:      exljbris Font Foundry
 * License URL: https://www.fontspring.com/licenses/exljbris/webfont
 *
 *
 */

@font-face {
    font-family: 'museo300';
    src: url('./assets/fonts/Museo300-Regular-webfont.eot');
    src: url('./assets/fonts/Museo300-Regular-webfont.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/Museo300-Regular-webfont.woff2') format('woff2'),
        url('./assets/fonts/Museo300-Regular-webfont.woff') format('woff'),
        url('./assets/fonts/Museo300-Regular-webfont.ttf') format('truetype'),
        url('./assets/fonts/Museo300-Regular-webfont.svg#museo300') format('svg');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'roboto-light';
    src: url('./assets/fonts/roboto-light-webfont.eot');
    src: url('./assets/fonts/roboto-light-webfont.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/roboto-light-webfont.woff2') format('woff2'),
        url('./assets/fonts/roboto-light-webfont.woff') format('woff'),
        url('./assets/fonts/roboto-light-webfont.ttf') format('truetype'),
        url('./assets/fonts/roboto-light-webfont.svg#museo300') format('svg');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'caviar_dreamsregular';
    src: url('./assets/fonts/CaviarDreams-webfont.eot');
    src: url('./assets/fonts/CaviarDreams-webfont.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/CaviarDreams-webfont.woff') format('woff'),
        url('./assets/fonts/CaviarDreams-webfont.ttf') format('truetype'),
        url('./assets/fonts/CaviarDreams-webfont.svg#caviar_dreamsregular') format('svg');
    font-weight: normal;
    font-style: normal;

}

body {
    // font-family: 'Buenard', serif;
    // font-size: 100%;
    font-family: museo300, "Helvetica Neue", Helvetica, Arial, sans-serif;
    min-height: 100%;
    color: $text;
    background-color: $background;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    // font-family: caviar_dreamsregular, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-family: roboto-light, "Helvetica Neue", Helvetica, Arial, sans-serif;
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
    border: 1px solid #666;
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

// @media screen and (min-width: 55em) {
//     .grid {
//         display: grid;
//         align-items: center;
//         padding: 3rem 3rem 1rem 3rem;
//         grid-row-gap: 2rem;
//         grid-template-columns: repeat(3, calc(100% / 3));
//     }

//     .grid__item {
//         margin: 0;
//     }
// }

// @media screen and (min-width: 80em) {
//     .grid {
//         grid-template-columns: repeat(4, 25%);
//     }

//     .grid__item:nth-child(4n-2) {
//         margin-top: -8rem;
//         margin-bottom: 8rem;
//     }

//     .grid__item:nth-child(4n) {
//         margin-top: -5rem;
//     }

//     .box {
//         margin: 6rem 4.5rem;
//     }
// }

/* het sluiten van de eerste popup: */
.overlay__close,
/* het sluiten van de tweede popup: */
button,
// related Items
.relatedItems a,
/* alle links in de tweede popup: */
.modal-content a

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

.md-close.md-close-cross {
    position: fixed;
    top: 10px;
    right: 10px;
    border: none;
    background: $_background1BCB;
    padding: 0.1em;
    border: 1px solid transparent;
    border-radius: 50%;
    padding: 0.2em;

    display: block;
    font-size: 2.5em;
    line-height: 0.6;
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
    padding: 0.7em;
    margin-bottom: 1em;
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
button:hover,
/* alle links in de tweede popup: */
.modal-content a:hover,
/* het menu met alle categorieen */
// .categoryLinks a:hover {
//     background: $linksHoverBackground;
//     transition: background 0.3s ease-in-out;
// }

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

/*!
Animate.css - http://daneden.github.io/animate.css/
Licensed under the MIT license - http://opensource.org/licenses/MIT
Copyright (c) 2014 Daniel Eden
*/
.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

.animated.infinite {
    animation-iteration-count: infinite;
}

.animated.threeTimes {
    animation-iteration-count: 3;
}

/* end animate.css */

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
</style>
