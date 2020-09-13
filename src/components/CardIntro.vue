<template>
<!-- open/close -->
<div class="overlay-fullscreen overlay-fullscreen-contentpush" :class="this.$store.state.cssClassCardIntroState">
    <div class="row">

        <div class="col-lg-12 col-sm-12 ">
            <div class="social-media-container">
                <SocialMedia />
            </div>
            <button class="closeCardIntro" title="All cards">All cards</button>
            <button class="copyURLtoClipboard copyURLtoClipboard3 " title="Copy Link">Copy Link</button>
        </div>

        <div class="col-lg-6 col-sm-6 column2 p-0" style="border-right: 1px solid #ddd;">
            <div class="card h-100 bg-transparent" style="border:none;">
                <div class="card-body">
                    <h3 class="pt-5">Misconception:</h3>
                    <div class="p-3 mt-2" style="background-color: #2F3658; min-height: 13em; border-radius: 10px;">
                        <p>{{ this.$store.state.currentCard["Prejudice"] }} …</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-sm-6 column1 p-0">
            <div class="card h-100 bg-transparent" style="border:none;">
                <div class="card-body title-on-card center">
                    <h3 class="pt-5">Reply:</h3>
                    <h2 class="title-on-card-text animated infinite mb-5">
                        <span class="quote">“</span>
                        <span class="text">{{ getPrejudice }}</span>
                        <span class="quote">”</span>
                    </h2>
                    <button class="btn btn-info mt-5" style="cursor:pointer;" @click="showCardFull">Open full card</button>
                </div>
            </div>
        </div>

        <div class="col-lg-12 col-sm-12 mt-5">
            <RelatedCards />
        </div>

        <div v-if="(this.$store.state.currentCard['Youtube Video Id'])" class="col-lg-12 col-sm-12 mt-5">
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
    // background: $overlayItemBackground;
    background: #474E71;
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

// read more / plus sign on the intro card
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
        border-color: #c70606;
        color: #c70606;
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
        border-color: #c70606;
        color: #c70606;
    }
}

.container.overlay-fullscreen-open::after {
    visibility: visible;
    opacity: 1;
    -webkit-transition: opacity 0.5s;
    transition: opacity 0.5s;
}

// Show/Hide card intro
// Opacity effect
.overlay-fullscreen-contentpush {
    visibility: hidden;
    opacity: 0;
    transition: all 0.2s ease-out;
}

.open {
    visibility: visible;
    opacity: 1;
}

.overlay-fullscreen-contentpush.open {
    transition: all 0.2s ease-out;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {

    .title-on-card h2 {
        // >… this is a two column lay out
        font-size: 4vw;
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

// .title-on-card {
//     padding: 0;
// }

.title-on-card h2 {
    // padding: 1em;
    // margin: 0 !important;
    font-size: 2rem;

}

// .title-on-card h2 {
// border: 2px solid $cardBorder;
// background: $cardBackground;
// }

$column2Border: #2f4fe036;

.social-media-container {
    display: inline-block;
}

.further-reading {
    cursor: pointer;
}
</style>
