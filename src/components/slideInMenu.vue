<template>
<div id="slide-menu-and-buttons-wrapper">
    <div class="slide-menu-wrapper">
        <div class="content text-center">
            <!-- BEGIN own content -->

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

                        <!-- <h2>Crypto radio 24</h2>
                        <audio style="max-width: 300px;" src="http://n0b.radiojar.com/exrd1tp5mceuv.mp3?1590145895=&rj-tok=AAABcjwec6UAMPRNZZ4HZ8WfJw&rj-ttl=5" controls />
                        <p><a href="https://www.crypto24radio.com/" target="_blank" rel="noopener">Crypto radio 24 website.</a></p> -->

                    </nav>
                </div>
                <!-- <button class="close-button" id="close-button">Close Menu</button> -->
            </div>


            <!-- END own content -->
        </div>
    </div>

    <input type="checkbox" id="open-button" class="menu-button" />
    <label class="menu-icon" for="open-button">
        <span></span>
        <span class="visuallyhidden">Open/Close Menu</span>
    </label>
</div>
</template>

<script>
export default {
    name: "slideInMenu",
    data() {
        return {};
    },
    components: {},
    mounted() {
        // document.addEventListener("click", function (event) {
        //     // if (event.target.matches("ul li")) {
        //         console.log("oei");
        //         sound.play();
        //     // }
        // }, false);
    },
    methods: {
        // playSound() {
        //     console.log('click: ', click);
        //     console.log("kak");
        //     click.play();
        // }
    }
};

// TIP: open menu initially by adding this class to body: show-menu, and set isOpen = true;
function slideInMenu() {
    "use strict";
    var bodyEl = document.body,
        openbtn = document.getElementById("open-button"),
        isOpen = false,
        clickableItems = document.querySelectorAll(".content a");

    function init() {
        initEvents();
    }

    function initEvents() {
        openbtn.addEventListener("click", toggleMenu);
    }

    // after click on clickable item, menu should disappear:
    for (let i = 0; i < clickableItems.length; i++) {
        clickableItems[i].addEventListener(
            "click",
            toggleMenuFromClickableItem,
            false
        );
    }

    function toggleMenuFromClickableItem() {
        toggleMenu();

        // if the input isnt clicked but menu is toggled anyway, then we have to remove checked=true also
        openbtn.checked = false;
    }

    function toggleMenu() {
        if (isOpen) {
            bodyEl.classList.remove("show-menu");
        } else {
            bodyEl.classList.add("show-menu");
        }
        isOpen = !isOpen;
    }

    // setTimeout(toggleMenu, 500);

    init();
}

document.addEventListener("DOMContentLoaded", function () {
    slideInMenu();
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
@import "../assets/css/slide-in-menu-config.scss";

/* 
BASED ON: CODROPS
https://tympanus.net/codrops/2014/09/16/off-canvas-menu-effects/ 
*/

#slide-menu-and-buttons-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    // height: 100%;
    // width: 100%;

    margin: 0;
    padding: 0;
    z-index: $zIndex;
}

.slide-menu-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    text-align: left;
    margin: 0 !important;
    padding: 0 !important;
    transform: translate3d(-100%, 0, 0);
    transition: transform 0.4s;
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);
}

.content {
    height: 100%;
    overflow: scroll;
}

// .menu-button {
//     position: fixed;
//     top: 10px;
//     left: 5px;
//     z-index: $zIndex;
// }

.menu-button:hover {
    opacity: 0.6;
}

/* Shown menu */
.show-menu .slide-menu-wrapper {
    transform: translate3d(0, 0, 0);
    transition: transform 0.4s;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}

.show-menu .content::before {
    opacity: 1;
    transition: opacity 0.4s;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
    transform: translate3d(0, 0, 0);
}

/* HAMBURGER */
// https://codepen.io/perjor/pen/yOzZPj
#open-button {
    display: none;
}

.menu-icon {
    background: $hamburgerBackgroundColor;
    box-shadow: $hamburgerBoxShadow;
    position: fixed;
    top: $hamburgerPositionTop;
    left: $hamburgerPositionLeft;
    display: block;
    cursor: pointer;
    height: $hamburgerHeight;
    width: $hamburgerWidth;
    padding: $hamburgerPadding;
    z-index: $zIndex;
}

.menu-icon>span:first-child,
.menu-icon>span:first-child::after,
.menu-icon>span:first-child::before {
    display: block;
    width: calc(#{$hamburgerWidth} - #{$hamburgerPadding} * 2);
    height: $hamburgerLinesHeight;
    border-radius: 15px;
    background-color: $hamburgerLinesColor;
}

.menu-icon>span:first-child {
    // top: 14px;
    // top: 7px;

    //https://stackoverflow.com/a/20236515
    // top: calc(#{$hamburgerHeight} / 2);
    top: calc(#{$hamburgerHeight} / 2);
    top: calc((#{$hamburgerHeight} - #{$hamburgerPadding} * 2) / 2);
    position: relative;
    transition-delay: 0.2s;
    // padding: 0;
}

.menu-icon>span:first-child::after,
.menu-icon>span:first-child::before {
    content: "";
    position: absolute;
    transition-duration: 0.2s;
    transition-delay: 0.2s;
}

.menu-icon>span:first-child::before {
    // margin-top: -8px;
    margin-top: calc(#{$hamburgerHeight} / 4);
}

.menu-icon>span:first-child::after {
    // margin-top: 8px;
    margin-top: calc(-#{$hamburgerHeight} / 4);
}

#open-button:checked~.menu-icon>span:first-child {
    background-color: transparent;
}

#open-button:checked~.menu-icon>span:first-child::before,
#open-button:checked~.menu-icon>span:first-child::after {
    margin-top: 0px;
}

#open-button:checked~.menu-icon>span:first-child::before {
    transform: rotate(45deg);
}

#open-button:checked~.menu-icon>span:first-child::after {
    transform: rotate(-45deg);
}
</style>
