<template>
<!-- open/close -->
<div class="overlay-fullscreen overlay-fullscreen-contentpush" :class="this.$store.state.cssClassCardIntroState">
    <div class="row m-0 pb-5">
        <div class="col-lg-6 col-sm-6 column1 p-0">
            <div class="card h-100 bg-transparent" style="border:none;">
                <div class="card-body">

                    <h3 class="pt-sm-2">Misconception</h3>
                    <div class="p-3 mt-2 text-center" style="background-color: #2F3658; min-height: 9em; border-radius: 10px;">
                        <span class="quote">“</span>
                        <p class="typed mb-3">{{ getPrejudice }} …</p>
                        <span class="quote">”</span>
                        <button class="btn btn-outline-light mt-3 d-block ml-auto mr-auto" style="cursor:pointer;" @click="showCardFull">Open full card</button>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-lg-6 col-sm-6 column2 p-0">
            <div class="card h-100 bg-transparent" style="border:none;">
                <div class="card-body center" style="">
                    <h3 class="pt-2" style="color: #5FE2FC;">Reply</h3>
                    <p class="">
                        <span class="text" style="">{{ this.$store.state.currentCard["short direct answer"] }}</span>
                    </p>
                    <hr>
                    <div v-if="(this.$store.state.currentCard['Youtube Video Id'])" class="col-lg-12 col-sm-12 p-0" style="font-size: 0.9em;">
                        <VideoBare />
                    </div>

                    <!-- <div v-if="(this.$store.state.currentCard['Quiz'])" class="col-lg-12 col-sm-12">
                        <Quiz />
                    </div> -->

                </div>
            </div>
        </div>

        <div class="col-lg-6 col-sm-6">
            <div class="card h-100 bg-transparent" style="border:none;">
                <div class="card-body p-0" style="">

                </div>
            </div>
        </div>

        <div class="col-lg-6 col-sm-6">
            <div class="card h-100 bg-transparent" style="border:none;">
                <div class="card-body p-0">
                    <RelatedCards />
                </div>
            </div>
        </div>

        <div class="col-lg-12 col-sm-12 m-0" style="position: fixed; bottom: 0; left: 0;background: linear-gradient(to right, #5C34A7, #2376D6);">
            <div>
                <div style="display: inline-block;">
                    <SocialMedia />
                </div>
                <button class="copyURLtoClipboard copyURLtoClipboard3 " style="display: inline-block;vertical-align: middle;margin-left: 1em !important;" title="Copy Link">Copy Link</button>
            </div>
        </div>
    </div>
    <a class="overlay-fullscreen-close"><span class="cross">×</span><span class="back-sign">‹</span><span class="back-text"> Back to cards</span></a>
</div>
</template>

<script>
import SocialMedia from "@/components/SocialMedia.vue";
import RelatedCards from "@/components/RelatedCards.vue";
import Quiz from "@/components/Quiz.vue";
import VideoBare from "@/components/VideoBare.vue";
// import Quiz from "@/components/Quiz.vue";
import {
    disableBodyScrollMixin
} from "./mixins/disableBodyScroll";

export default {
    name: "CardIntro",
    mixins: [disableBodyScrollMixin],
    components: {
        SocialMedia,
        RelatedCards,
        VideoBare
        // Quiz
    },
    data() {
        return {}
    },
    computed: {
        getPrejudice: function () {
            return this.$store.state.currentCard["Prejudice"];
        }
    },
    watch: {
        getPrejudice(newValue, oldValue) {
            this.typeWriter(".typed", newValue, 20);
        }
    },
    mounted: function () {
        this.handleCardIntro();
        this.disableBodyScroll(".overlay-fullscreen>div"); //mixin
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
                // closeBttn2 = overlayFullscreen.querySelector('button.closeCardIntro'),
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
            // closeBttn2.addEventListener('click', toggleOverlayFullscreen);
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
    top: 50%;
    left: 50%;
    padding-top: 60px;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);
    color: $overlayItemText;
    background: #474E71;
    border-radius: 10px;
    outline: 2000px solid rgba(34, 34, 34, 0.8);
}

.overlay-fullscreen>div {
    overflow: scroll;
    height: 100%;
    -webkit-overflow-scrolling: touch; //https://stackoverflow.com/a/41601290
}

// hr {

// }

// SECONDARY MENU

.column1 h3 {
    padding-top: 2em;
}

.overlay-fullscreen .overlay-fullscreen-close {
    cursor: pointer;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(0, $subMenuOffsetTopOnSmallScreen);
    width: 100%;
    border: none;
    background: linear-gradient(#2F3762, #343C6B);
    color: #eee;
    display: block;

    // height of secondary menu bar
    line-height: 1.0;
    font-size: 1.0em;
    padding: 0.6em 0.2em;
}

.overlay-fullscreen .overlay-fullscreen-close:hover {
    text-decoration: none;
}

.overlay-fullscreen .overlay-fullscreen-close .cross {
    display: none;
}

.overlay-fullscreen .overlay-fullscreen-close .back-text {
    font-family: 'poppinsbold';
    font-size: 1.2em;
    vertical-align: middle;
    line-height: 0;
    padding: 0;
    margin: 0;
    // border: 1px solid red;
}

.overlay-fullscreen .overlay-fullscreen-close .back-sign {
    font-size: 3.0em;
    line-height: 0.7; // use this to set height of bar
    vertical-align: middle;
    margin: 0 0.1em 0 0.2em;
    padding: 0;
    // border: 1px solid red;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .overlay-fullscreen .overlay-fullscreen-close {
        position: fixed;
        top: -30px;
        right: 10px;
        left: auto;
        width: 40px;
        border: none;
        background: none;
        // border: 1px solid red;
        // border-radius: 50%;
        color: #eee;
        padding: 0.2em;
        margin-top: 0;
        display: inline-block;
        font-size: 2.5em;
        line-height: 0.6;
        cursor: pointer;
        // z-index: 5;
    }

    .overlay-fullscreen .overlay-fullscreen-close .cross {
        display: block;
    }

    .overlay-fullscreen .overlay-fullscreen-close .back-sign,
    .overlay-fullscreen .overlay-fullscreen-close .back-text {
        display: none;
    }

    .overlay-fullscreen {
        padding-top: 0;
    }

    #app .overlay-fullscreen {
        height: 70%;
    }
}

// END SECONDARY MENU

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

.social-media-container {
    display: inline-block;
}

.further-reading {
    cursor: pointer;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    .column1 .card-body {
        border-right: 1px dashed #A3A8B7;
    }
}
</style>
