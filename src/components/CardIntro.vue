<template>
<!-- open/close -->
<div class="overlay-fullscreen overlay-fullscreen-contentpush " :class="this.$store.state.cssClassCardIntroState">
    <div class="row">

        <div class="col-lg-12 col-sm-12 ">
            <div class="social-media-container">
                <SocialMedia />
            </div>
            <button class="closeCardIntro" title="All cards">All cards</button>
            <button class="copyURLtoClipboard copyURLtoClipboard3 " title="Copy Link">Copy Link</button>
        </div>

        <div class="col-lg-6 col-sm-6 column1">
            <div class="card h-100 bg-transparent">
                <div class="card-body title-on-card center">
                    <h3 class="pt-5">Reply:</h3>
                    <img class="title-on-card-background-image" src="@/assets/img/dummy.png" alt="">
                    <!-- <h2 class="title-on-card-text animated infinite"><span class="quote">“</span><span class="text">{{ this.$store.state.currentCard.Prejudice }}</span><span class="quote">”</span></h2> -->

                    <h2 class="title-on-card-text animated infinite"><span class="quote">“</span><span class="text">{{ getPrejudice }}</span><span class="quote">”</span></h2>
                </div>
            </div>
        </div>

        <div class="col-lg-6 col-sm-6 column2">
            <div class="card h-100 bg-transparent">
                <div class="card-body text-center">
                    <h3 class="pt-5">Misconception:</h3>
                    <div class="p-3">
                        <p>{{ this.$store.state.currentCard["Prejudice"] }} …</p>
                        <!-- TODO: make the <a> better accessible -->
                        <p><a data-modal='modal-1' class='md-trigger further-reading' @click="showCardFull">+</a><a style="cursor:pointer;" @click="showCardFull">Open full card</a></p>
                        
                        <RelatedCards />

                    </div>
                </div>
            </div>
        </div>
        

        <div v-if="(this.$store.state.currentCard['Youtube Video Id'])" class="col-lg-12 col-sm-12">
            <Video />
        </div>
        <div v-if="(this.$store.state.currentCard['Quiz'])" class="col-lg-12 col-sm-12">
            <Quiz />
        </div>



        <a class="overlay-fullscreen-close">×</a>
    </div>
</div>
</template>

<script>
import SocialMedia from "@/components/SocialMedia.vue";
import RelatedCards from "@/components/RelatedCards.vue";
import Quiz from "@/components/Quiz.vue";
import Video from "@/components/Video.vue";

// import Quiz from "@/components/Quiz.vue";
export default {
    name: "CardIntro",
    data() {
        return {}
    },
    computed: {
        getPrejudice: function () {
            return this.$store.state.currentCard["short direct answer"];
        }
    },
    watch: {
        getPrejudice(newValue, oldValue) {
            this.typeWriter(".title-on-card-text .text", newValue, 20);
        }
    },
    mounted: function () {
        this.handleCardIntro();
    },
    components: {
        SocialMedia,
        RelatedCards,
        Quiz,
        Video
    },
    methods: {
        typeWriter(selector, prejudice, interval) {
            var audioPlaying = false;
            var text = document.querySelector(selector),
                textCopy = prejudice,
                i = 0,
                clear,
                pauseBeforeStart = 600;

            text.innerHTML = "";

            function typeText() {
                if (audioPlaying === false) {
                    if (localStorage.getItem("soundOn") === "true") typewriter.play();
                    audioPlaying = true;
                }
                text.innerHTML += textCopy[i];
                i++;
                if (i === textCopy.length) {
                    if (localStorage.getItem("soundOn") === "true") typewriter.stop();
                    clearInterval(clear);
                    setTimeout(function () {
                        text.style.display = "none";
                    }, 10);
                    setTimeout(function () {
                        text.style.display = "inline";
                    }, 20);
                }
            }

            text.innerHTML = "";

            setTimeout(function () {
                clear = setInterval(typeText, interval);
            }, pauseBeforeStart);
        },
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

                if (localStorage.getItem("soundOn") === "true") whoosh2.play();
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

            // setTimeout(function () {
            //     that.typeWriter(".title-on-card-text .text", 200);
            // }, 1000);
            // that.typeWriter(".title-on-card-text .text",600);
        },
        showCardFull(event) {
            if (localStorage.getItem("soundOn") === "true") whoosh2.play();
            //TODO: why is this working, should mutations be used?
            this.$store.state.cssClassCardFullState = " md-show";
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/*! https://tympanus.net/Development/FullscreenOverlayStyles/index7.html# */
/* Overlay style */
#app .overlay-fullscreen {
    position: fixed;
    width: 100%;
    max-width: 70em;
    height: 100%;
    // top: 0;
    // left: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);
    color: $overlayItemText;
    background: $overlayItemBackground;
    padding: 0em;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    #app .overlay-fullscreen {
        padding-left: 2em;
        padding-right: 2em;
    }
}

.overlay-fullscreen>div {
    overflow: scroll;
    height: 100%;
}

/* Overlay closing cross */
.overlay-fullscreen .overlay-fullscreen-close {
    position: fixed;
    top: 10px;
    right: 20px;
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
        border-color: #ccc9c9;
        color: #ccc9c9;
    }

    50% {
        /*letter-spacing: 3px;*/
        background-color: $cardBackground;
        border-color: $menuItemsAndButtonsBorder;
        color: $linksText;
    }

    100% {
        /*letter-spacing: 1px;*/
        background-color: $background;
        border-color: #ccc9c9;
        color: #ccc9c9;
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
    // margin: 1.25em 10% 0 0% !important;
    margin: 1.25em 5% 0 0% !important;
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
    // border: 3px solid red;
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

    // should be twice the value of the one inside the media query since this is a one column lay out and…>
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
        // >… this is a two column lay out
        font-size: 4vw;
        margin: 0;
        padding: 0;
    }
}

.closeCardIntro {
    background: transparent url(../assets/img/icons/flat/grid.svg) no-repeat center;
    background-size: contain;
    // padding: 3em 1.2em 3em 2em;
    padding: 0.7em;
    margin-bottom: 1em;
    z-index: auto;
    transition: transform 0.3s;
    color: transparent;
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
    font-size: 2rem;

}

.title-on-card h2 {
    min-height: 40%;
}

.column2 .card-body>div {
    min-height: 40%;
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
        z-index: -1;
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
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0) scale(1.035) rotate(-0.7deg);
        border-radius: 3% 4% 2% 4% / 4% 6% 1% 4%;
    }
}

$column2Border: #2f4fe036;

.column2 .card-body>div {
    border: 2px solid $column2Border;
    border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
    // display: inline-block;
    position: relative;

    &::before {
        content: '';
        border: 2px solid $column2Border;
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.9deg);
        border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
    }

    &::after {
        content: '';
        border: 2px solid $column2Border;
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
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

.social-media-container {
    display: inline-block;
}
</style>
