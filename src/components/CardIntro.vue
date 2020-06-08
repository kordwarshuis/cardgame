<template>
<!-- open/close -->
<div class="overlay-fullscreen overlay-fullscreen-contentpush" :class="this.$store.state.cssClassCardIntroState">
    <div class="row">
        <div class="col-lg-6 col-sm-6">
            <div class="card h-100 bg-transparent">
                <div class="card-body title-on-card center">
                    <h3>Misconception:</h3>
                    <img class="title-on-card-background-image" src="@/assets/img/trivial-pursuit/TrivialPursuit2.png" alt="">
                    <h2 class="title-on-card-text animated infinite">{{ this.$store.state.currentCard.Prejudice }}</h2>
                </div>
            </div>
        </div>

        <div class="col-lg-6 col-sm-6">
            <div class="card h-100 bg-transparent">
                <div class="card-body text-center">
                    <h3 class="">Reply:</h3>
                    <p>{{ this.$store.state.currentCard["short direct answer"] }} …</p>
                    <p><a data-modal='modal-1' class='md-trigger further-reading' @click="showCardFull">+</a><a style="cursor:pointer;" @click="showCardFull">Read more</a></p>
                    <button class="closeCardIntro">All cards</button>
                    <button class="copyURLtoClipboard copyURLtoClipboard3">Copy Link</button>
                    <!-- <button class="overlay-fullscreen-close">Close</button> -->
                    <RelatedCards />

                    <SocialMedia />
                </div>
            </div>
        </div>
        <a class="overlay-fullscreen-close">×</a>
    </div>
</div>
</template>

<script>
import SocialMedia from "@/components/SocialMedia.vue";
import RelatedCards from "@/components/RelatedCards.vue";
// import Quiz from "@/components/Quiz.vue";
export default {
    name: "CardIntro",
    mounted: function () {
        this.handleCardIntro();
    },
    components: {
        SocialMedia,
        RelatedCards
        // Quiz
    },
    methods: {
        handleCardIntro() {
            var that = this;
            var container = document.querySelector('div.container'),
                triggerBttn = document.getElementById('trigger-overlay-fullscreen'),
                overlayFullscreen = document.querySelector('div.overlay-fullscreen'),
                closeBttn = document.querySelector('.overlay-fullscreen-close'),
                closeBttn2 = overlayFullscreen.querySelector('button.closeCardIntro'),
                transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'msTransition': 'MSTransitionEnd',
                    'transition': 'transitionend'
                },
                transEndEventName = transEndEventNames[ModernizrForCardIntro.prefixed('transition')],
                support = {
                    transitions: ModernizrForCardIntro.csstransitions
                };
            // TODO: rename, since it is not a toggle anymore
            function toggleOverlayFullscreen() {

                if (sound) dong.play();
                if (overlayFullscreen.classList.contains('open')) {
                    // overlayFullscreen.classList.remove('open');
                    // container.classList.remove('overlay-fullscreen-open');
                    overlayFullscreen.classList.add('close');

                    that.$store.commit("changeCssClassCardIntroState", "");
                    that.$store.commit("changeCssClassCardOverviewState", "");
                    // if you close the intro card, the full card screen should also be closed.
                    // TODO: see also Home.vue, rewrite
                    that.$store.commit('hideModal');

                    that.$router.push("/");
                    var onEndTransitionFn = function (ev) {
                        if (support.transitions) {
                            if (ev.propertyName !== 'visibility') return;
                            this.removeEventListener(transEndEventName, onEndTransitionFn);
                        }
                        overlayFullscreen.classList.remove('close');
                    };
                    if (support.transitions) {
                        overlayFullscreen.addEventListener(transEndEventName, onEndTransitionFn);
                    } else {
                        onEndTransitionFn();
                    }
                } else if (!overlayFullscreen.classList.contains('close')) {
                    overlayFullscreen.classList.add('open');
                    container.classList.add('overlay-fullscreen-open');
                }
            }

            // triggerBttn.addEventListener('click', toggleOverlayFullscreen);
            closeBttn.addEventListener('click', toggleOverlayFullscreen);
            closeBttn2.addEventListener('click', toggleOverlayFullscreen);
        },
        showCardFull(event) {
            // if (sound) tada.play();
            if (sound) whoosh2.play();
            //TODO: why is this working, should mutations be used?
            this.$store.state.cssClassCardFullState = " md-show";
            // this.$store.commit("changeCssClassCardIntroState", " md-show");
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/*! https://tympanus.net/Development/FullscreenOverlayStyles/index7.html# */
/* Overlay style */
.overlay-fullscreen {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    color: $overlayItemText;
    background: $overlayItemBackground;
    padding: 3em;
}

.overlay-fullscreen>div {
    overflow: scroll;
    height: 100%;
}

/* Overlay closing cross */
.overlay-fullscreen .overlay-fullscreen-close {
    position: absolute;
    top: 7px;
    right: 7px;
    border: none;
    display: block;
    font-size: 2.5em;
    line-height: 0.6;
    padding: 0;
    cursor: pointer;
}

// de read more / plus sign on the intro card
a.md-trigger {
    border: 3px solid $menuItemsAndButtonsBorder;
    background: $background;
    color: $linksText;
    border-radius: 50%;
    padding: 0.15em 0.2em 0.25em;
    margin: 0;
    line-height: 0.58;
    font-size: 1.5em;
    vertical-align: middle;
    display: inline-block;
    padding: 0.5em;
    margin: 0.3em;
    margin-left: 0;
    transition: background 0.3s ease-in-out;
    cursor: pointer;
}

.md-trigger:hover {
    background: $linksHoverBackground;
    transition: background 0.3s ease-in-out;
}

.md-trigger {
    transform: translateZ(0);
    animation: background-pulsate 24s ease-out 0s 10;
}

// read more button:
@keyframes background-pulsate {
    0% {
        /*letter-spacing: 1px;*/
        background-color: $background;
        border-color: #444;
        color: #444;
    }

    50% {
        /*letter-spacing: 3px;*/
        background-color: $menuItemsAndButtonsBorder;
        border-color: $menuItemsAndButtonsBorder;
        color: $linksText;
    }

    100% {
        /*letter-spacing: 1px;*/
        background-color: $background;
        border-color: #444;
        color: #444;
    }
}

// cant get this to work
// .overlay-fullscreen .overlay-fullscreen-close:after {
// 	content: "×";
// 	position: fixed;
// 	top: 0px; 
// 	right: 0;
// 	line-height: 1;
// 	font-size: 3px;
// 	padding: 0px;
// 	margin: 0;
// 	width: 40px;
// 	height: 40px;
// 	border: 1px solid red;
// 	color: #222 !important;
// }

/* Effects */
// html,
// body {
//   overflow-x: hidden;
// }

.container.overlay-fullscreen-open::after {
    visibility: visible;
    opacity: 1;
    -webkit-transition: opacity 0.5s;
    transition: opacity 0.5s;
}

// .overlay-fullscreen-contentpush {
//     visibility: hidden;
//     -webkit-backface-visibility: hidden;
//     backface-visibility: hidden;

// }
// .animationEnabled .overlay-fullscreen-contentpush {
//     // slide in from the left
//     -webkit-transform: translateX(-100%);
//     transform: translateX(-100%);

//     // slide in from the right
//     -webkit-transform: translateX(100%);
//     transform: translateX(100%);
//     -webkit-transition: -webkit-transform 0.5s, visibility 0s 0.5s;
//     transition: transform 0.5s, visibility 0s 0.5s;

// }

// .overlay-fullscreen-contentpush.open {
//     visibility: visible;
// }
// .animationEnabled .overlay-fullscreen-contentpush.open {
//     -webkit-transform: translateX(0%);
//     transform: translateX(0%);
//     -webkit-transition: -webkit-transform 0.5s;
//     transition: transform 0.5s;

// }

// Show/Hide card intro
// Opacity effect
.overlay-fullscreen-contentpush {
    visibility: hidden;
    opacity: 0;
    // transition: all 0.3s ease-in-out;
    transition: all 0.2s ease-out;
}

.open {
    visibility: visible;
    opacity: 1;
}

.overlay-fullscreen-contentpush.open {
    // transition: all 0.3s ease-in-out;
    transition: all 0.2s ease-out;
}

.card {
    border: none;
}

.title-on-card {
    // margin-top should be set so it aligns with the right column (answer)
    margin: 1.25em 10% 0 0% !important;
    color: $cardLink;

    // https://stackoverflow.com/a/48830291
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;

    // see also media query (two columns versus one column, determining how many vw it should be)
    min-height: 80vw;

}

.title-on-card img {
    position: absolute;
    margin: 0;
    width: 90%;
}

.title-on-card h2 {
    position: relative;
    margin: 6% 1% 0% 22% !important;
    // padding: 3% 5% 0 16%;

    // should be twice the value of the one inside the media query since this is a one column lay out and…
    font-size: 8vw;

    margin: 0;
    padding: 0;
    text-align: left;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    .title-on-card {
        min-height: 40vw;
    }

    .title-on-card h2 {
        // … this is a two column lay out
        font-size: 4vw;
        margin: 0;
        padding: 0;
    }
}

.closeCardIntro {
    background: transparent url(../assets/img/trivial-pursuit/TrivialPursuit2-stack.png) no-repeat center;
    background-size: contain;
    padding: 3em 1.2em 3em 2em;
    z-index: auto;
    transition: transform 0.3s;
}

.closeCardIntro:hover,
.copyURLtoClipboard:hover {
    transform: rotate(360deg);
    transition: transform 0.3s;
}

// positioning of the card
.overlay-fullscreen,
.overlay-fullscreen .row,
.overlay-fullscreen .row>div,
.overlay-fullscreen .card,
.title-on-card {
    margin: 0;
    padding: 0;
}

.title-on-card {
    padding-left: 1rem !important
}

// alternative design
.design2 {
    .title-on-card {
        // background: yellow;
        padding: 0;
    }

    .title-on-card img {
        opacity: 0;
        background: orange;
        margin: 0;
        padding: 0;
    }

    // https://codepen.io/andybelldesign/pen/MPLzay
    .title-on-card h2 {
        padding: 1em;
        margin: 0 !important;
        font-size: 2.5rem;

    }

    .title-on-card h2 {
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
            transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.9deg);
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
            transform: translate3d(-50%, -50%, 0) scale(1.035) rotate(-0.7deg);
            border-radius: 3% 4% 2% 4% / 4% 6% 1% 4%;
        }

    }

    @keyframes animatedBorder {
        0% {
            border-radius: 3% 6% 5% 4% / 4% 7% 8% 4%;
        }

        14% {
            border-radius: 5% 1% 5% 4% / 2% 1% 2% 4%;
        }

        28% {
            border-radius: 0% 0% 0% 0% / 0% 0% 0% 0%;
        }

        42% {
            border-radius: 4% 12% 15% 7% / 4% 6% 9% 4%;
        }

        70% {
            border-radius: 3% 6% 5% 4% / 4% 7% 8% 4%;
        }
    }

    /* end animate.css */

}
</style>
