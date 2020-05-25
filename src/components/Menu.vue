<template>
<div id="menu-and-buttons-wrapper">
    <div class="menu-wrap">
        <div class="container p-1">

            <div id="nav" class="text-center">
                <router-link to="/">Cards</router-link>
                <router-link to="/about">About</router-link>
                <router-link to="/twitter-real-time">Realtime</router-link>
                <router-link to="/scores">Scores</router-link>
            </div>
            <!-- <Gallery /> -->
            <div class="row">
                <div class="col-md-12 text-center">
                    <a href>
                        <img class="logo" alt="logo" src="../assets/img/logo/blockchainbird-logo.png" />
                    </a>

                    <nav class="menu">
                        <!-- <div style="position: relative;"> -->
                        <h1>Bit&shy;coin Mis&shy;con&shy;cep&shy;tions</h1>
                        <!-- <label class="mt-3">
                            <input type="radio" name="soundOnOf" id="soundOnOf1" value="on" /> Sound on
                        </label>
                        <label>
                            <input class="ml-3" type="radio" name="soundOnOf" id="soundOnOf2" value="of" checked="" /> Sound off
                        </label> -->
                        <!-- <BitcoinAnimation /> -->
                        <!-- </div> -->

                        <div class="cryptocoins">

                            <div class="cryptocoin cryptocoin--btc">
                                <div class="cryptocoin--coin-face cryptocoin--coin-back">
                                    <svg class="cryptocoin--coin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244.9 324.2">
                                        <defs></defs>
                                        <title>bitcoin</title>
                                        <g id="Layer_2" data-name="Layer 2">
                                            <g id="svg2">
                                                <path id="symbol" class="cls-1" d="M244.3,130.3c5.1-34-20.9-52.3-56.3-64.6l11.5-46.1-28.1-7L160.2,57.5l-22.5-5.3L149,7,120.9,0,109.4,46.1c-6.1-1.4-12.1-2.7-18-4.2h.1L52.7,32.1l-7.4,30s20.8,4.8,20.4,5.1C77,70,79.1,77.5,78.8,83.5L65.6,136.1l3,.9-3-.7L47.2,209.9c-1.4,3.5-4.9,8.7-12.8,6.7.2.4-20.5-5.1-20.5-5.1L0,243.6l36.6,9.2,20,5.1L45,304.6l28,7,11.5-46.2c7.7,2.1,15.1,4,22.4,5.8l-11.5,46,28.1,7,11.6-46.6c47.9,9.1,84,5.4,99.1-37.9,12.2-34.9-.6-55-25.8-68.1,18.4-4.3,32.2-16.3,35.9-41.3Zm-64.2,90c-8.7,34.9-67.4,16-86.5,11.3l15.5-61.8C128.1,174.5,189.2,183.9,180.1,220.3Zm8.7-90.5c-7.9,31.8-56.8,15.6-72.7,11.7l14-56.1C146,89.4,197,96.7,188.8,129.8Z" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div class="cryptocoin--coin-face cryptocoin--coin-front">
                                    <svg class="cryptocoin--coin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 244.9 324.2">
                                        <defs></defs>
                                        <title>bitcoin</title>
                                        <g id="Layer_2" data-name="Layer 2">
                                            <g id="svg2">
                                                <path id="symbol" class="cls-1" d="M244.3,130.3c5.1-34-20.9-52.3-56.3-64.6l11.5-46.1-28.1-7L160.2,57.5l-22.5-5.3L149,7,120.9,0,109.4,46.1c-6.1-1.4-12.1-2.7-18-4.2h.1L52.7,32.1l-7.4,30s20.8,4.8,20.4,5.1C77,70,79.1,77.5,78.8,83.5L65.6,136.1l3,.9-3-.7L47.2,209.9c-1.4,3.5-4.9,8.7-12.8,6.7.2.4-20.5-5.1-20.5-5.1L0,243.6l36.6,9.2,20,5.1L45,304.6l28,7,11.5-46.2c7.7,2.1,15.1,4,22.4,5.8l-11.5,46,28.1,7,11.6-46.6c47.9,9.1,84,5.4,99.1-37.9,12.2-34.9-.6-55-25.8-68.1,18.4-4.3,32.2-16.3,35.9-41.3Zm-64.2,90c-8.7,34.9-67.4,16-86.5,11.3l15.5-61.8C128.1,174.5,189.2,183.9,180.1,220.3Zm8.7-90.5c-7.9,31.8-56.8,15.6-72.7,11.7l14-56.1C146,89.4,197,96.7,188.8,129.8Z" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <div class="cryptocoin--coin-side">
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                    <div class="spoke"></div>
                                </div>
                            </div>
                        </div>

                        <!-- <h2>Crypto radio 24</h2>
                        <audio style="max-width: 300px;" src="http://n0b.radiojar.com/exrd1tp5mceuv.mp3?1590145895=&rj-tok=AAABcjwec6UAMPRNZZ4HZ8WfJw&rj-ttl=5" controls />
                        <p><a href="https://www.crypto24radio.com/" target="_blank" rel="noopener">Crypto radio 24 website.</a></p> -->

                    </nav>
                </div>
                <button class="close-button" id="close-button">Close Menu</button>
            </div>
        </div>
    </div>
    <button class="menu-button" id="open-button">Open Menu</button>
</div>
</template>

<script>
// import BitcoinAnimation from "@/components/BitcoinAnimation.vue";
// import Gallery from "@/components/Gallery.vue";

export default {
    name: "Menu",
    components: {
        // BitcoinAnimation
        // Gallery
    }
};

/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
function sideMenu() {
    'use strict';
    var bodyEl = document.body,
        app = document.querySelector('#app'),
        openbtn = document.getElementById('open-button'),
        closebtn = document.getElementById('close-button'),
        isOpen = true;

    function init() {
        initEvents();
    }

    function initEvents() {
        openbtn.addEventListener('click', toggleMenu);
        if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
        }

        // close the menu element if the target it´s not the menu element or one of its descendants..
        app.addEventListener('click', function (ev) {
            var target = ev.target;
            if (isOpen && target !== openbtn) {
                toggleMenu();
            }
        });
    }

    function toggleMenu() {
        if (isOpen) {
            bodyEl.classList.remove('show-menu');
        } else {
            bodyEl.classList.add('show-menu');
        }
        isOpen = !isOpen;
    }

    setTimeout(toggleMenu, 2000);

    init();

}

document.addEventListener("DOMContentLoaded", function () {
    sideMenu();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
$numberOfCycles: 8;

#nav {
    // position: fixed;
    // padding: 30px;
    // padding: 1em;
    // text-align: right;

    a {
        font-weight: bold;
        color: $generalLinksText;
        padding: 1em 0.1em;
        display: inline-block;
    }

    a:hover {
        background: rgb(165, 219, 240);
    }
}

/*! 
Bitcoin animation
https://codepen.io/boyd/pen/ajpGbM */

// ================
// Helper functions
// ================

@function pi() {
    @return 3.14159265359;
}

@function pow($number, $exp) {
    $value: 1;

    @if $exp>0 {
        @for $i from 1 through $exp {
            $value: $value * $number;
        }
    }

    @else if $exp < 0 {
        @for $i from 1 through -$exp {
            $value: $value / $number;
        }
    }

    @return $value;
}

@function rad($angle) {
    $unit: unit($angle);
    $unitless: $angle / ($angle * 0 + 1);

    // If the angle has 'deg' as unit, convert to radians.
    @if $unit==deg {
        $unitless: $unitless / 180 * pi();
    }

    @return $unitless;
}

@function fact($number) {
    $value: 1;

    @if $number>0 {
        @for $i from 1 through $number {
            $value: $value * $i;
        }
    }

    @return $value;
}

@function sin($angle) {
    $sin: 0;
    $angle: rad($angle);

    // Iterate a bunch of times.
    @for $i from 0 through 10 {
        $sin: $sin + pow(-1, $i) * pow($angle, (2 * $i + 1)) / fact(2 * $i + 1);
    }

    @return $sin;
}

// ================
// Settings
// ================

$coin_diam: 10em;
$coin_depth: $coin_diam * 0.1;
$spin_speed: 2s;
$facets: 32;
$spokes: $facets / 2;
$degs: sin(pi() / $facets);
$facet_length: #{$coin_diam * $degs};
$spin-speed: 10s;

// ================
// shared styles
// ================

.cryptocoins {
    margin: auto;
    // display: flex;
    width: $coin_diam;
    text-align: center;
}

.cryptocoin {
    transform-style: preserve-3d;
    perspective: 1000;
    border-radius: 50%;
    width: $coin_diam;
    height: $coin_diam;
    position: relative;
    margin: 1em;
    transform: rotateY(77deg);
    animation: spin $spin_speed linear $numberOfCycles;

    &--coin-face {
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    &--coin-front {
        transform: translateZ(#{$coin_depth / 2});
    }

    &--coin-back {
        transform: translateZ(#{-$coin_depth / 2}) rotateY(180deg);
    }

    &--coin-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 66.666%;
        height: 66.666%;
        transform: translate(-50%, -50%);

    }

    &--coin-side {
        transform: translateZ(-($coin-diam/2)) rotateY(90deg);
        transform-style: preserve-3d;
        backface-visibility: hidden;

        .spoke {
            height: $coin_diam;
            width: $coin_depth;
            position: absolute;
            transform-style: preserve-3d;
            backface-visibility: hidden;

            &:before,
            &:after {
                content: '';
                display: block;
                height: $facet_length;
                width: ($coin_depth);
                position: absolute;
                background: red;
            }

            // One at each end
            &:before {
                transform-origin: top center;
                transform: rotateX(90deg) translateY(-$coin-depth);
            }

            &:after {
                bottom: 0;
                transform-origin: center bottom;
                transform: rotateX(90deg);
            }
        }

        @for $i from 1 through $facets {
            .spoke:nth-child(#{$i}) {
                transform: rotateX(#{(180/$spokes) * $i}deg) rotateY(90deg);
            }
        }
    }
}

// ================
// ETH styles
// ================

.cryptocoin--eth {
    color: #ddd;

    .cryptocoin--coin-face {
        background-color: #eee;

        svg {
            opacity: .5;
        }
    }

    .spoke {

        &:before,
        &:after {
            background-color: currentColor;
        }
    }
}

.cryptocoin--btc {
    color: darken(#eda550, 5%);

    .cryptocoin--coin-face {
        background-color: #eda550;
    }

    .spoke {

        &:before,
        &:after {
            background-color: currentColor;
        }
    }
}

// ================
// Annimations
// ================
@keyframes spin {
    0% {
        transform: rotate3d(0, 0, 0, 0deg);
    }

    50% {
        transform: rotate3d(.5, .5, .5, 180deg);
    }

    100% {
        transform: rotate3d(1, 1, 1, 360deg);
    }
}

// MENU

#menu-and-buttons-wrapper {
    margin: 0;
    margin-left: -1em; // compensate for bootstrap grid
    padding: 0;
}

audio {
    width: 100%;
}

/* 
SOURCE: CODROPS
https://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/ 
*/

/* Menu Button */
.menu-button {
    position: fixed;
    left: 0;
    z-index: 5;
    /* margin: 1em; */
    margin: 0;
    padding: 0;
    width: 2.5em;
    height: 2.25em;
    border: none;
    text-indent: 2.5em;
    color: transparent;
    // background: transparent;
    background: #eee;
}

.menu-button::before {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
    bottom: 0.5em;
    left: 0.5em;
    background: linear-gradient(#373a47 20%, transparent 20%, transparent 40%, #373a47 40%, #373a47 60%, transparent 60%, transparent 80%, #373a47 80%);
    content: '';
}

.menu-button:hover {
    opacity: 0.6;
}

/* Close Button */
.close-button {
    width: 3.2em;
    height: 3.2em;
    position: absolute;
    right: 0;
    top: 0;
    margin: 0;
    overflow: hidden;
    text-indent: 1em;
    font-size: 0.75em;
    border: 5px solid #eee;
    // background: transparent;
    background: #eee;
    color: transparent;
}

.close-button::before,
.close-button::after {
    content: '';
    position: absolute;
    width: 3px;
    height: 100%;
    top: 0;
    left: 50%;
    background: #222;
}

.close-button::before {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.close-button::after {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
}

/* Menu */
.menu-wrap {
    /* position: absolute; */
    position: fixed;
    z-index: 5;
    // width: 300px;
    width: 100%;
    height: 100%;
    text-align: left;
    color: $slideInMenuTextColor;
    // background: $slideInMenuBackgroundColor;
    background: transparent url(../assets/img/photos/dmitry-demidko-xZJpKskRdOg-unsplash.jpg) no-repeat center;
    background-size: cover;

    padding: 2.5em 1.5em 0;
    // -webkit-transform: translate3d(-320px, 0, 0);
    // transform: translate3d(-320px, 0, 0);
    transform: translate3d(-100%, 0, 0);
    -webkit-transition: -webkit-transform 0.4s;
    transition: transform 0.4s;
    -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);
}

// Menu items
.menu-wrap #nav a {
    color: $slideInMenuLinkColor;
    background: #eee;
    padding: 0 0.5em !important;
    margin: 0.5em 0.3em;
}

.menu-wrap a:hover {
    color: $slideInMenuLinkHoverColor;
}

// makes slide in menu scrollable vertical
.menu {
    height: 100%;
}

.container {
    background: rgba(239, 209, 188, 0.815);
}

/* Shown menu */
.show-menu .menu-wrap {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    -webkit-transition: -webkit-transform 0.8s;
    transition: transform 0.8s;
    -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}

.show-menu .content::before {
    opacity: 1;
    -webkit-transition: opacity 0.8s;
    transition: opacity 0.8s;
    -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

nav.menu {
    overflow: scroll;
}
</style>
