<template>
<div id="app">
    <Menu />
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/twitter-real-time">Realtime Twitter</router-link>
    </div>
    <router-view />
    <!-- <NewsTicker /> -->
</div>
</template>

<script>
import Menu from "@/components/Menu.vue";
// import NewsTicker from "@/components/NewsTicker.vue";

export default {
    components: {
        Menu
        // ,NewsTicker
    }

}
</script>

<style lang="scss">
@import '~bootstrap/dist/css/bootstrap.min.css';

// #app {
//     font-family: Avenir, Helvetica, Arial, sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
//     text-align: center;
//     color: #2c3e50;
// }

#nav {
    // position: fixed;
    // padding: 30px;
    padding-top: 1em;

    a {
        font-weight: bold;
        color: #2c3e50;
        padding: 1em;
        // &.router-link-exact-active {
        //   color: #42b983;
        // }
    }

    a:hover {
        background: rgb(165, 219, 240);
    }
}

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

body {
    // font-family: 'Buenard', serif;
    // font-size: 100%;
    min-height: 100%;
    color: $text;
    background-color: $background;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

body.bcb {
    background-color: $background2;
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

.grid {
    width: 100%;
    max-width: 1440px;
    margin: 7rem auto 0;
    padding-bottom: 10rem;
}

.grid__item {
    display: flex;
    justify-content: center;
    margin: 0 0 10rem 0;
    cursor: pointer;
}

.box {
    position: relative;
    margin: 2rem;
}

// https://codepen.io/joeyhoer/pen/BmqIx
hr {
    border: 0;
    margin: 1.35em auto;
    max-width: 100%;
    background-position: 50%;
    box-sizing: border-box;

    height: 6px;
    background-image: radial-gradient(closest-side,
            hsla(0, 0%, 50%, 1.0),
            hsla(0, 0%, 50%, 0) 100%);
    position: relative;
}

hr:after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    background-color: hsl(0, 0%, 75%);
    height: 12px;
    width: 12px;
    transform: rotate(45deg);
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 4px 0;
    border: 4px solid hsla(0, 0%, 100%, 0.35);
    background-clip: padding-box;
    box-shadow: -10px 10px 0 hsla(0, 0%, 100%, 0.15), 10px -10px 0 hsla(0, 0%, 100%, 0.15);
}

.menu hr {
    margin: 0.35em auto;
    background-image: radial-gradient(closest-side,
            #0467AC,
            hsla(0, 0%, 50%, 0) 100%);
}

.menu hr:after {
    background-color: #0467AC;
    border: 4px solid #0467AC;
    box-shadow: -10px 10px 0 hsla(0, 0%, 100%, 0.15), 10px -10px 0 hsla(0, 0%, 100%, 0.15);
}

.box__title {
    margin: 0;
    line-height: 1;
    position: absolute;
    z-index: 2;
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
    -webkit-text-stroke: 0;
    text-stroke: 0;
    -webkit-text-fill-color: #000;
    text-fill-color: #000;
    color: #000;
    transition: all 0.3s;
}

.grid__item:hover .box__title-inner::before {
    height: 100%;
    width: 100%;
}

// card collection
.box__text {
    background: $boxTextBackground;
    margin: 0;
    position: absolute;
    top: -6rem;
    font-weight: normal;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    margin: 0.5rem 1rem;
    font-size: 1.1em;
    // font-family: 'Anton', sans-serif;
}

.box__text-inner {
    position: relative;
    display: block;
    border: 6px solid $boxTextInnerBorder;
    padding: 0.25rem 1.25rem;
}

.box__text-inner--reverse {
    background: $boxTextInnerReverseBackground;
    color: $boxTextInnerReverseText;
}

.box__img {
    display: block;
    flex: none;
    margin: 0 auto;
    max-width: 100%;
    filter: grayscale(1);
    transition: filter 0.3s;
    pointer-events: none;
}

.grid__item:hover .box__img:not(.box__img--original) {
    filter: grayscale(0);
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
        padding: 3rem 3rem 15rem 3rem;
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
    /* background-color: #ccc; */
    background-color: #2196F3;
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
    background-color: #ccc;
}

input:focus+.slider {
    box-shadow: 0 0 1px #ccc;

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

/* BEZOCHTE KAART KRIJG EEN VISUELE AANDUIDING */
.visited .box__text {
    border: 10px solid $boxTextVisited !important;
}

.visited .box__text-inner:after {
    content: "√";
    color: $boxTextVisitedCheckmark;
    text-shadow: 2px 2px 7px #000;
    position: absolute;
    top: -0.3em;
    left: -0.5em;
    margin: 0;
    padding: 0;
    line-height: 0.7;
    font-size: 6em;
    /* transform: rotate(323deg); */
}

.further-reading {
    cursor: pointer;
}

.logo-parent {
    text-align: center;
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
/* lees meer in de tweede popup: */
.md-trigger,
/* alle links in de tweede popup: */
.modal-content a,
/* het menu met alle categorieen */
.categoryLinks a {
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

.md-trigger {
    margin-left: 0;
}

.md-close.md-close-cross,
.overlay__close-cross {
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    display: block;
    font-size: 2.5em;
    line-height: 0.6;
    padding: 0;
    cursor: pointer;
    // border: 1px solid red;
    // vertical-align: middle;
}

a.overlay__close:not(.overlay__close-cross) {
    background: transparent url(./assets/img/trivial-pursuit/TrivialPursuit2-stack.png) no-repeat center;
    background-size: contain;
    padding: 3em 1.2em 3em 2em;
    z-index: auto;
    transition: transform 0.3s;
}

a.overlay__close:not(.overlay__close-cross):hover,
.copyURLtoClipboard:hover {
    transform: rotate(360deg);
    transition: transform 0.3s;
}

.copyURLtoClipboard:hover {
    background: transparent url(./assets/img/trivial-pursuit/TrivialPursuit-copy-link.png) no-repeat center;
    background-size: contain;
}

.copyURLtoClipboard {
    background: transparent url(./assets/img/trivial-pursuit/TrivialPursuit-copy-link.png) no-repeat center;
    background-size: contain;
    padding: 3em 1.2em 3em 2em;
    z-index: auto;
    transition: transform 0.3s;

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
/* lees meer in de tweede popup: */
.md-trigger:hover,
/* alle links in de tweede popup: */
.modal-content a:hover,
/* het menu met alle categorieen */
.categoryLinks a:hover {
    background: $linksHoverBackground;
    transition: background 0.3s ease-in-out;

}

/* het sluiten van de eerste popup: */
.overlay__close:hover {
    background-color: transparent;
    transition: background 0.3s ease-in-out;

}

.categoryLinks a {
    /* display: inline-block; */
    margin: 0.2em;
    padding: 0.2em 0.5em;
}

.categoryLinks .active {
    border: 3px solid $categoryLinksBorderActive;
    background: $categoryLinksBackgroundActive url(./assets/img/logo/blockchainbird-logo.png) no-repeat center right;
    padding-right: 30px;
    background-size: auto 70%;
}

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
@mixin btn-border-drawing($color: $a4, $hover: $a6, $width: 2px, $vertical: top, $horizontal: left, $duration: 0.25s) {
    box-shadow: inset 0 0 0 $width $color;
    color: $a6;
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

.categoryLinks a //   ,.copyURLtoClipboard
//   ,.md-trigger
,
.md-close:not(.md-close-cross),
.modal-content a //   ,a.overlay__close:not(.overlay__close-cross)

    {
    @include btn-border-drawing($a4, $a14, 3px, bottom, right);
}

// de read more / plus sign on the intro card
a.md-trigger {
    border: 3px solid $a4;
    background: $a4;
    color: $a7a;
    border-radius: 50%;
    //   width: 1.5em;
    //   height: 1.5em;
    padding: 0.15em 0.2em 0.25em;
    margin: 0;
    line-height: 0.58;
    font-size: 2em;
    vertical-align: middle;
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

/* https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php */
.videoWrapper {
    position: relative;
    padding-bottom: 56.25%;
    /* 16:9 */
    padding-top: 25px;
    height: 0;
}

.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

/* condensed view */

/* .toggleLayout {
	position: fixed;
	left: 0;
	top: 0;
	margin: 0.1em;
} */

.condensedLayout .app .grid .box .box__img,
.condensedLayout .app .grid .box .box__title-inner {
    display: none;
}

.condensedLayout .app .grid * {
    transform: none !important;
    position: static !important;
}

.condensedLayout .app .grid {
    display: inline;
}

.condensedLayout .app .box {
    margin: 0;
}

.condensedLayout .app .box__title {
    margin: 0;
}

.condensedLayout .app .grid .box__text,
.condensedLayout .app .grid .box__text-inner,
.condensedLayout .app .grid .grid__item {
    border: none;
    font-family: inherit;
    /* width: auto !important; */
    position: static !important;
    display: block !important;
    margin: 0;
}

.condensedLayout .app .grid .box__text {
    border-bottom: 1px solid $a6;
}

.condensedLayout .app .grid .grid__item:first-child .box__text {
    border-top: 1px solid $a6;
    margin-top: 1em;
}

.condensedLayout .app .visited .box:after {
    content: "";
}

/* .box {
	border:3px solid green;
}
.overlay__content {
	border:3px solid red;
} */

/*
 *  BEGIN NEWS TICKER
 */

/* I know I should not animate "right" property but I don't know how to do it another way. */
.news-ticker {
    position: fixed;
    bottom: 0;
    right: 0;
    top: auto;
    /*om te overrulen, als je hem buiten de div plaatst, zodat het een section > div is*/
    left: auto;
    /*om te overrulen, als je hem buiten de div plaatst, zodat het een section > div is*/
    padding: 0;
    /*om te overrulen, als je hem buiten de div plaatst, zodat het een section > div is*/
    margin: 0;
    height: auto !important;
    transform: translateX(100%);
    /* default speed, override via inline style, depending on text length */
    animation-duration: 25s;
    animation-timing-function: linear;
    animation-iteration-count: 30;
    z-index: 5;
    pointer-events: none;
}

/*main .present .news-ticker, */
/*alleen als slide actief is, loopt de animatie*/
body>.news-ticker {
    /*deze is voor als ie niet binnen de main staat en dus altijd te zien is*/
    animation-name: news-ticker;
}

.news-ticker p {
    white-space: nowrap;
    margin: 0 1em;
}

.news-ticker img {
    vertical-align: baseline;
}

@keyframes news-ticker {
    0% {
        right: 0;
        transform: translateX(100%);
    }

    100% {
        right: 100%;
        transform: translateX(0);
    }
}

.news-ticker p {
    line-height: 1;
}

@media only screen and (max-width: 961px) {
    .news-ticker p {
        line-height: 1;
    }
}

/*
 *  EIND NEWS TICKER
 */

/* SEARCH */
.searchString {
    background: $searchStringBackground;
    border: 1px solid $searchStringBorder;
    padding: 0.3em;
}

.condensedLayout .box {
    margin: 0 !important;
}

.condensedLayout .box.hideSearchResult {
    margin: 0 !important;
    display: none !important;
    visibility: hidden;
    height: 0;
    line-height: 0;
    padding: 0;
    margin: 0;

}

.searchContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
}

.searchContainer div {
    max-width: 95%;
    // border: 5px solid red;
}

.searchContainer input#search {
    width: 80%;
}

.searchContainer .changeGridView {
    padding: 0.6em;
    margin: 0;
    height: 1em;
    // border: 1px solid red;
    // display: block;
    width: 10%;
    background: transparent url(./assets/img/icons/flat/menu.png) no-repeat center;
    background-size: contain;
}

.searchContainer div {
    display: inline-block;
}

.searchContainer div:after {
    content: "🔍";
}

#searchPointer {
    position: absolute;
    top: 0.45em;
    right: 0.5em;
    width: 2em;
    height: 2em;
    cursor: pointer;
    z-index: 5;
}

#searchPointer:after {
    content: "🔍";
    font-size: 2em;
    ;
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
</style>
