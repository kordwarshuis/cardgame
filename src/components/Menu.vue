<template>
<div id="menu-and-buttons-wrapper">
    <div class="menu-wrap">

        <div class="colorshield"></div>
        <div class="container mt-5 p-1">

            <div id="nav" class="text-center">
                <router-link to="/">Cards</router-link>
                <router-link to="/about">About</router-link>
                <router-link v-if="this.$store.state.gameName === 'Bitcoin'" to="/twitter-real-time">Realtime</router-link>
                <router-link v-if="this.$store.state.gameName === 'Bitcoin'" to="/scores">Scores</router-link>
            </div>
            <!-- <Gallery /> -->
            <div class="row">
                <div class="col-md-12 text-center">
                    <!-- <form role="form" class="border m-3 p-2 pb-0 d-inline-block">
                        <label class="mr-3 mb-0 d-inline-block">
                            <input type="radio" name="soundOnOf" id="soundOnOf1" value="on" checked="" /> on
                        </label>
                        <p class="d-inline-block mr-3 m-0">
                            Sound
                        </p>
                        <label class="mb-0 d-inline-block">
                            <input type="radio" name="soundOnOf" id="soundOnOf2" value="of" /> off
                        </label>
                    </form> -->
                    <a href>
                        <img class="logo" alt="logo" src="../assets/img/logo/blockchainbird-logo.png" />
                    </a>

                    <nav class="menu">
                        <!-- <div style="position: relative;"> -->
                        <h1>{{this.$store.state.gameName}} Mis&shy;con&shy;cep&shy;tions</h1>
                        <p>A collection of misconceptions about {{this.$store.state.gameName}}.</p>
                        <p>Strike back and send a card.</p>

                        <!-- <button class="btn btn-primary" @click="activateDefaultDesign">Default Design</button>
                        <button class="btn btn-primary"  @click="activateDesign2">Design 2</button> -->

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
    },
    methods: {
        // activateDefaultDesign() {
        //     document.querySelector('#app').classList.remove('design2');
        // },
        // activateDesign2() {
        //     document.querySelector('#app').classList.add('design2');
        // }

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

// TIP: open menu initially by adding this class to body: show-menu, and set isOpen = true;
function sideMenu() {
    'use strict';
    var bodyEl = document.body,
        app = document.querySelector('#app'),
        openbtn = document.getElementById('open-button'),
        closebtn = document.getElementById('close-button'),
        isOpen = false;

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
        if (localStorage.getItem("soundOn") === "true") whoosh.play();
        if (isOpen) {
            bodyEl.classList.remove('show-menu');
        } else {
            bodyEl.classList.add('show-menu');
        }
        isOpen = !isOpen;
    }

    // setTimeout(toggleMenu, 500);

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

// MENU

#menu-and-buttons-wrapper {
    margin: 0;
    margin-left: -1em; // compensate for bootstrap grid
    padding: 0;
}

.colorshield {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    background: $_background1;
    opacity: 0.8;
    z-index: -1;
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
    top: 10px;
    left: 5px;
    z-index: 5;
    /* margin: 1em; */
    margin: 0;
    padding: 0;
    width: 2.7em;
    height: 2.5em;
    border: none;
    text-indent: 2.5em;
    color: transparent;
    background: $_background1BCB;
    // background: #eee;
    outline: none;
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
    right: 10px;
    top: 10px;
    margin: 0;
    overflow: hidden;
    text-indent: 1em;
    font-size: 0.75em;
    border: 5px solid $_background1BCB;
    border-radius: 50%;
    // background: transparent;
    background: $_background1BCB;
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
    background: $_background1 url(../assets/img/photos/dmitry-demidko-xZJpKskRdOg-unsplash.jpg) no-repeat center;
    background-size: cover;
    // filter: grayscale(100%);

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

.design2 .menu-wrap {
    // filter: grayscale(100%) !important;
    // filter: blur(0) brightness(0.91) hue-rotate(332deg) sepia(0.52) opacity(1) ;
    // filter: blur(0) brightness(0.91) hue-rotate(332deg) sepia(0.92) opacity(1) ;
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
    background: $_background1;
}

/* Shown menu */
.show-menu .menu-wrap {
    // -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    // -webkit-transition: -webkit-transform 0.8s;
    transition: transform 0.4s;
    // -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}

.show-menu .content::before {
    opacity: 1;
    // -webkit-transition: opacity 0.8s;
    transition: opacity 0.4s;
    // -webkit-transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    // -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
}

nav.menu {
    overflow: scroll;
}
</style>
