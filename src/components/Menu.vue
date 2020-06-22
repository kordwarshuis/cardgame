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
                <!-- <button class="close-button" id="close-button">Close Menu</button> -->
            </div>
        </div>
    </div>
    <!-- <button class="menu-button" id="open-button">Open Menu</button> -->
    <input type="checkbox" id="open-button" class="menu-button" />
    <label class="menuicon " for="open-button">
        <span></span>
        <span class="visuallyhidden">Open/Close Menu</span>
    </label>

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
    methods: {}
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
        isOpen = false,
        navMenuItems = document.querySelectorAll("#nav a");




    function init() {
        initEvents();
    }

    function initEvents() {
        openbtn.addEventListener('click', toggleMenu);
    }

    for (let i = 0; i < navMenuItems.length; i++) {
        navMenuItems[i].addEventListener("click", toggleMenuFromNav, false);
        
    }

    function toggleMenuFromNav() {
        toggleMenu();

        // if the input isnt clicked but menu is toggled anyway, then we have to remove checked=true also
        openbtn.checked = false;
    }


    function toggleMenu() {
        if (localStorage.getItem("soundOn") === "true") whoosh2.play();
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
#nav {
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
}

.menu-button:hover {
    opacity: 0.6;
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

nav.menu {
    overflow: scroll;
}

/* HAMBURGER */
// https://codepen.io/perjor/pen/yOzZPj
#open-button {
    display: none;
}

.menuicon {
    position: fixed;
    top: 10px;
    left: 10px;
    display: block;
    cursor: pointer;
    height: 21px;
    width: 25px;
    z-index: 5;
}

.menuicon>span:first-child,
.menuicon>span:first-child::after,
.menuicon>span:first-child::before {
    display: block;
    width: 22px;
    height: 3px;
    border-radius: 15px;
    background-color: #000;
}

.menuicon>span:first-child {
    top: 8px;
    position: relative;
    -webkit-transition-duration: 0;
    -moz-transition-duration: 0;
    -ms-transition-duration: 0;
    -o-transition-duration: 0;
    -webkit-transition-delay: 0.2s;
    -moz-transition-delay: 0.2s;
    -ms-transition-delay: 0.2s;
    -o-transition-delay: 0.2s;
    transition-delay: 0.2s;
}

.menuicon>span:first-child::after,
.menuicon>span:first-child::before {

    content: '';
    position: absolute;
    -webkit-transition-property: margin, -webkit-transform;
    -webkit-transition-duration: 0.2s;
    -moz-transition-duration: 0.2s;
    -ms-transition-duration: 0.2s;
    -o-transition-duration: 0.2s;
    transition-duration: 0.2s;
    -webkit-transition-delay: 0.2s;
    -moz-transition-delay: 0.2s;
    -ms-transition-delay: 0.2s;
    -o-transition-delay: 0.2s;
    transition-delay: 0.2s;
}

.menuicon>span:first-child::before {
    margin-top: -8px;
}

.menuicon>span:first-child::after {
    margin-top: 8px;
}

#open-button:checked~.menu {
    display: block;
}

#open-button:checked~.title {
    display: none;
}

#open-button:checked~.menuicon>span:first-child {
    background-color: transparent;
}

#open-button:checked~.menuicon>span:first-child::before,
#open-button:checked~.menuicon>span:first-child::after {
    margin-top: 0px;
}

#open-button:checked~.menuicon>span:first-child::before {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
}

#open-button:checked~.menuicon>span:first-child::after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
}
</style>
