<template>
<!-- <div id="app" class="container-fluid"> -->
<div id="app" class="container-fluid design2">
    <Toasts :time-out="2000"></Toasts>
    <Menu />
    <!-- <CryptoRadio /> -->
    <router-view />
    <NewsTicker />
    <Person1 />
    <Person2 />
    <!-- <Person3 /> -->
</div>
</template>

<script>
import publicPath from "../vue.config";
import Menu from "@/components/Menu.vue";
import CryptoRadio from "@/components/CryptoRadio.vue";
// import '~snapsvg/dist/snapsvg/dist/snap.svg.js';
import * as Hammer from "hammerjs";
import NewsTicker from "@/components/NewsTicker.vue";
import Person1 from "@/components/AnimatedCharacters/Person1.vue";
import Person2 from "@/components/AnimatedCharacters/Person2.vue";
// import Person3 from "@/components/AnimatedCharacters/Person3.vue";

export default {
    components: {
        Menu,
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
        this.soundSetting();
        this.initSound();
    },
    methods: {
        //TODO: change 'of' to 'off'
        soundSetting() {
            // radio buttons for sound on off:
            var soundButton = document.querySelectorAll('input[name = "soundOnOf"]');
            var i;

            // set radio buttons with localstorage value, if any:
            if (localStorage.getItem("soundOnOf") !== null) {
                var val = localStorage.getItem("soundOnOf"); // local storage value
                for (i = 0; i < soundButton.length; i++) {
                    if (soundButton[i].value === val) {
                        soundButton[i].checked = true; // marking the required radio as checked
                    }
                }
            }

            // set soud variable based on radio buttons setting:
            for (i = 0; i < soundButton.length; i++) {
                if (soundButton[i].checked === true) {
                    if (soundButton[i].value === "on") {
                        sound = true;
                    } else {
                        sound = false;
                    }
                }
            }

            // dealing with radio buttons user interactions:
            var prev = null; // not used here
            for (i = 0; i < soundButton.length; i++) {
                soundButton[i].addEventListener('change', function () {
                    // (prev) ? console.log(prev.value): null;
                    if (this !== prev) {
                        prev = this;
                    }

                    localStorage.setItem("soundOnOf", this.value);
                    if (this.value === "on") {
                        sound = true;
                    } else {
                        sound = false;
                    }
                });
            }
        },
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
                volume: 0.2,
                src: [require("./assets/audio/288912__littlerobotsoundfactory__click-soft-00.mp4")]
            });
            go = new Howl({
                volume: 0.5,
                src: [require("./assets/audio/394477__gameloops__gamepack1-main-horrible-finish.mp4")]
            });
            whoosh = new Howl({
                volume: 0.2,
                src: [require("./assets/audio/99263__robinhood76__01762-whoosh.mp4")]
            });
            whoosh2 = new Howl({
                volume: 0.2,
                src: [require("./assets/audio/63615__robinhood76__ae004-maracas-one-shot-faster.mp4")]
            });
            whistle = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/110390__soundscalpel-com__cartoon-siren-whistle-001.mp4")]
            });
            pur = new Howl({
                volume: 1,
                // loop: true,
                src: [require("./assets/audio/130968__cubilon__cat-purring.mp4")]
            });
            click = new Howl({
                volume: 0.1,
                src: [require("./assets/audio/click.mp4")]
            });

            document.querySelectorAll("a").forEach(item => item.addEventListener('click', function () {
                click.play()
            }, false));
            document.querySelectorAll("button").forEach(item => item.addEventListener('click', function () {
                click.play()
            }, false));
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

// .quote {
    // font-size: 2.5em;
// }

// #app {
//     font-family: Avenir, Helvetica, Arial, sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//     text-align: center;
// }

// @import url('https://fonts.googleapis.com/css?family=Anton|Buenard:400,700');
// @import url('https://fonts.googleapis.com/css?family=Anton:400,700');

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

/* Page Loader */
// .js .loading::before {
//     content: '';
//     position: fixed;
//     z-index: 100000;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: $loadingBackground;
// }

// .js .loading::after {
//     content: '';
//     position: fixed;
//     z-index: 100000;
//     top: 50%;
//     left: 50%;
//     width: 60px;
//     height: 60px;
//     margin: -30px 0 0 -30px;
//     pointer-events: none;
//     border-radius: 50%;
//     opacity: 0.4;
//     background: #000;
//     animation: loaderAnim 0.7s linear infinite alternate forwards;
// }

// @keyframes loaderAnim {
//     to {
//         opacity: 1;
//         transform: scale3d(0.5, 0.5, 1);
//     }
// }

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
.icon {
    display: block;
    width: 1.5em;
    height: 1.5em;
    margin: 0 auto;
    fill: currentColor;
}

.app {
    position: relative;

    /* om de tekst in de boxjes zichtbaar te houden */
    /* padding-top: 100px; */
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
small {
    text-align: center;
    /* margin: 0 */
}

.border {
    border: 1px solid $_border1 !important;
}

.grid {
    width: 100%;
    max-width: 1440px;
    margin: 7rem auto 0;
    // padding-bottom: 10rem;
}

.grid__item {
    display: flex;
    justify-content: center;
    margin: 0 0 10rem 0;
    cursor: pointer;

    background: rgba(190, 43, 63, 0.045);
    border-radius: 50%;
}

.grid__item.visited {
    background: none;

}

.box {
    position: relative;
    margin: 2rem;
}

// https://codepen.io/joeyhoer/pen/BmqIx
// 

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

.box__title {
    margin: 0;
    line-height: 1;
    position: absolute;
    // z-index: 2;
    /* important ivm de tekst passend maken middels textFit*/
    /* zie JS, allOverlayTitles[i].style.height */
    margin: 5% 1em 0 17%;

}

// Category on card collection  
.box__title-inner {
    display: block;
    position: relative;
    font-weight: normal;
    font-size: 0.7em;
    opacity: 0.3;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    line-height: 1.25;
    // font-family: 'Anton', sans-serif;
    margin: 0;
}

.box__title-inner[data-hover] {
    -webkit-text-stroke: 2px #000;
    text-stroke: 2px #000;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    color: transparent;
}

.box__title-inner::before {
    content: attr(data-hover);
    position: absolute;
    top: 0;
    left: 0;
    height: 0;
    overflow: hidden;
    white-space: nowrap;
    // -webkit-text-stroke: 0;
    // text-stroke: 0;
    // -webkit-text-fill-color: #000;
    // text-fill-color: #000;
    // color: #000;
    transition: all 0.3s;
}

.grid__item:hover .box__title-inner::before {
    height: 100%;
    width: 100%;
}

// card collection
.box__text {
    background: $cardGridBackground;
    margin: 0;
    position: absolute;
    top: -6rem;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    margin: 0.5rem 1rem;
    font-size: 1.1em;
}

.box__text-inner {
    position: relative;
    display: block;
    // border: 6px solid $cardGridBorder;
    padding: 1rem 1.25rem;
    color: $cardLink;
}

.box__text-inner:hover {
    color: $cardLinkHover;
}

.box__img {
    display: block;
    flex: none;
    margin: 0 auto;
    max-width: 100%;
    filter: grayscale(0);
    transition: filter 0.3s;
    pointer-events: none;
}

.design2 .box__img {
    max-width: 60%;
}

.grid__item:hover .box__img:not(.box__img--original) {
    filter: grayscale(1);
}

.further-reading {
    display: block;
    margin-top: 1em;
}

@media screen and (min-width: 55em) {
    .box__title-inner {
        margin: 0;
    }

    .grid {
        display: grid;
        align-items: center;
        padding: 3rem 3rem 1rem 3rem;
        grid-row-gap: 2rem;
        grid-template-columns: repeat(3, calc(100% / 3));
    }

    .grid__item {
        margin: 0;
    }

    .box {
        margin: 4rem;
    }

    .box__title {
        top: -4rem;
        right: -4.5rem;
        -webkit-writing-mode: vertical-rl;
        writing-mode: vertical-rl;
    }

    .box__title--straight {
        -webkit-writing-mode: horizontal-tb;
        writing-mode: horizontal-tb;
    }

    .box__title--straight .box__title-inner::before {
        width: 0;
        height: auto;
    }

    .box__title--left {
        /* left: -2rem; */
        right: auto;
    }

    .box__text--bottom {
        bottom: -5rem;
        top: auto;
    }

    .box__text--right {
        right: 0;
        left: auto;
    }

}

@media screen and (min-width: 80em) {
    .grid {
        grid-template-columns: repeat(4, 25%);
    }

    .grid__item:nth-child(4n-2) {
        margin-top: -8rem;
        margin-bottom: 8rem;
    }

    .grid__item:nth-child(4n) {
        margin-top: -5rem;
    }

    .box {
        margin: 6rem 4.5rem;
    }

    /* .box__content {

display: block;
	} */
}

/* BEGIN GELUID AAN UIT */

// TODO: remove this?
/* https://www.w3schools.com/howto/howto_css_switch.asp */
/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
    margin: 0.5em;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $slider;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: $slider2;
}

input:focus+.slider {
    box-shadow: 0 0 1px $slider2;

}

input:checked+.slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

/* EIND GELUID AAN UIT */

/* Visited cards get a visual sign */
// .visited .box__text {
// border: 10px solid $boxTextVisited;
// }

.visited .box__text:after {
    content: "√";
    color: $boxTextVisitedCheckmark;
    text-shadow: 2px 2px 7px #000;
    position: absolute;
    top: -0.1em;
    left: -0.2em;
    margin: 0;
    padding: 0;
    line-height: 0.7;
    font-size: 6em;
    /* transform: rotate(323deg); */
}

.further-reading {
    cursor: pointer;
}

.logo {
    /* display: block;
	margin: 1em auto 0; */
    width: 100px;
}

// Buttons etc

button {
    background: transparent;
}

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

.md-close.md-close-cross,
.overlay__close-cross {
    position: fixed;
    top: 10px;
    left: 10px;
    border: none;
    background: rgba(238, 238, 238, 0.671);
    display: block;
    font-size: 2.5em;
    line-height: 0.6;
    padding: 0.1em;
    cursor: pointer;
}

// a.overlay__close:not(.overlay__close-cross) {
//     background: transparent url(./assets/img/trivial-pursuit/TrivialPursuit2-stack.png) no-repeat center;
//     background-size: contain;
//     padding: 3em 1.2em 3em 2em;
//     z-index: auto;
//     transition: transform 0.3s;
//         border: 10px solid #333;
// }

a.overlay__close:not(.overlay__close-cross):hover,
.copyURLtoClipboard:hover {
    transform: rotate(360deg);
    transition: transform 0.3s;
}

.copyURLtoClipboard:hover {
    // background: transparent url(./assets/img/trivial-pursuit/TrivialPursuit-copy-link.png) no-repeat center;
    background-size: contain;
}

.copyURLtoClipboard {
    // background: transparent url(./assets/img/trivial-pursuit/TrivialPursuit-copy-link.png) no-repeat center;
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

// .modal-content a.readOn {
// 	border-top: none;
// 	border-left: none;
// 	border-right: none;
// 	border-width: 1px;
// 	padding: 0 0.1em;
// 	margin: 0em 0.5em;
// }

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

// .modal-content .related a:first-child {
// 	margin-left: 0;
// }
// .modal-content .related a:last-child {
// 	margin-right: 0;
// }

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

// .categoryLinks a {
//     /* display: inline-block; */
//     margin: 0.2em;
//     padding: 0.2em 0.5em;
// }

// .categoryLinks .active {
//     // border: 3px solid $categoryLinksBorderActive;
//     background: $categoryLinksBackgroundActive url(./assets/img/logo/blockchainbird-logo.png) no-repeat center right;
//     padding-right: 40px;
//     background-size: auto 70%;
// }

/* .categoryLinks .active:after {
	position: relative;
    top: 30px;
    right: -20px;
	display: inline-block;
	content: '';
	background: url(../logo/blockchainbird-logo.png) no-repeat;
	background-size: contain;
	width: 30px;
    height: 30px;

} */

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

//=== Drawing effect
// https://codepen.io/giana/pen/xdXpJB
@mixin btn-border-drawing($color: $menuItemsAndButtonsBorder, $hover: $a6, $width: 2px, $vertical: top, $horizontal: left, $duration: 0.25s) {
    box-shadow: inset 0 0 0 $width $color;
    color: $borderDrawingEffect;
    transition: color $duration $duration/3;
    position: relative;

    &::before,
    &::after {
        border: 0 solid transparent;
        box-sizing: border-box;
        content: '';
        pointer-events: none;
        position: absolute;
        width: 0;
        height: 0;

        #{$vertical}: 0;
        #{$horizontal}: 0;
    }

    &::before {
        $h-side: if($horizontal=='left', 'right', 'left');

        border-#{$vertical}-width: $width;
        border-#{$h-side}-width: $width;
    }

    &::after {
        $v-side: if($vertical=='top', 'bottom', 'top');

        border-#{$v-side}-width: $width;
        border-#{$horizontal}-width: $width;
    }

    &:hover {
        color: $hover;

        &::before,
        &::after {
            border-color: $hover;
            transition: border-color 0s, width $duration, height $duration;
            width: 100%;
            height: 100%;
        }

        &::before {
            transition-delay: 0s, 0s, $duration;
        }

        &::after {
            transition-delay: 0s, $duration, 0s;
        }
    }
}

// .categoryLinks a,
.relatedItems a,
.md-close:not(.md-close-cross),
.modal-content a {
    @include btn-border-drawing($menuItemsAndButtonsBorder, $a14, 3px, bottom, right);
}

.box__text-inner {
    // @include btn-border-drawing($menuItemsAndButtonsBorder, $a14, 6px, bottom, right);
    border: 7px solid $menuItemsAndButtonsBorder;
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

iframe,
video {
    /* width: 100%; */
}

iframe {
    /* height: 70%; */

}


// REPORT
.report {
    border: 3px solid #1c343b;
    background: $reportBackground;
    padding: 1em;
    margin: 1em;
}

.generate-report {
    position: fixed;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    z-index: 3;
}

#reportWarning {
    position: fixed;
    top: 0;
    left: 0;
    font-size: 6vw;
    color: $reportWarningText;
    margin: 0;
    text-align: center;
    width: 100%;
    z-index: 7;
    pointer-events: none;
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

@keyframes heartBeat {
    0% {
        transform: scale(1);
    }

    14% {
        transform: scale(2.3);
    }

    28% {
        transform: scale(1);
    }

    42% {
        transform: scale(2.3);
    }

    70% {
        transform: scale(1);
    }
}

.heartBeat {
    animation-name: heartBeat;
    animation-duration: 1.3s;
    animation-timing-function: ease-in-out;
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

.design2 {
    .grid .box__text-inner,
    .handDrawnBorder {
        // animation-name: animatedBorder;
        // animation-duration: 0.8s;
        // animation-iteration-count: infinite;
        // animation-timing-function: ease-in-out;
        // animation-fill-mode: both;

        border: 2px solid $cardBorder;
        background: $cardBackground;
        border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;

        &::before {
            content: '';
            border: 2px solid $cardBorder;
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0) scale(1.095) rotate(1.7deg);
            border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
        }

        &::after {
            content: '';
            border: 2px solid $cardBorder;
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0) scale(1.045) rotate(-0.7deg);
            border-radius: 3% 4% 2% 4% / 4% 6% 1% 4%;
        }

    }
}
</style>
