<template>
<!-- open/close -->
<div class="overlay-fullscreen overlay-fullscreen-contentpush p-0" :class="this.$store.state.cssClassCardIntroState">
    <div class="row m-0 pb-5">
        <div class="col-lg-6 col-sm-6">
            <div class="card h-100 bg-transparent" style="border:none;">
                <div class="card-body" style="border-right: 1px solid #666666;">
                    <h3 class="pt-5">Misconception:</h3>
                    <div class="p-3 mt-2 text-center" style="background-color: #2F3658; min-height: 13em; border-radius: 10px;">
                        <p class="typed mb-5">{{ getPrejudice }} …</p>
                        <button class="btn btn-outline-light mt-5 d-block ml-auto mr-auto" style="cursor:pointer;" @click="showCardFull">Open full card</button>
                    </div>
                    <RelatedCards />
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-sm-6 ">
            <div class="card h-100 bg-transparent" style="border:none;">
                <div class="card-body title-on-card center" style="">
                    <h3 class="pt-5" style="color: #5FE2FC;">Reply:</h3>
                    <h2 class="title-on-card-text">
                        <span class="quote">“</span>
                        <span class="text" style="font-size: 0.6em;">{{ this.$store.state.currentCard["short direct answer"] }}</span>
                        <span class="quote">”</span>
                    </h2>
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

        <div class="col-lg-12 col-sm-12 m-0" style="position: fixed; bottom: 0; left: 0;background: linear-gradient(to right, #5C34A7, #2376D6);">
            <div style="display: inline-block;">
                <SocialMedia />
            </div>
            <button class="copyURLtoClipboard copyURLtoClipboard3 " style="display: inline-block;" title="Copy Link">Copy Link</button>
        </div>
        <a class="overlay-fullscreen-close">×</a>
    </div>
</div>
</template>

<script>
import SocialMedia from "@/components/SocialMedia.vue";
import RelatedCards from "@/components/RelatedCards.vue";
import Quiz from "@/components/Quiz.vue";
import VideoBare from "@/components/VideoBare.vue";
// import Quiz from "@/components/Quiz.vue";

export default {
    name: "CardIntro",
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);
    color: $overlayItemText;
    background: #474E71;
    border-radius: 10px;
    outline: 2000px solid rgba(34, 34, 34, 0.8);
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    #app .overlay-fullscreen {
        height: 70%;
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
    border: 1px solid transparent;
    border-radius: 50%;
    padding: 0.2em;
    display: block;
    font-size: 2.5em;
    line-height: 0.6;
    cursor: pointer;
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

.title-on-card h2 {
    // padding: 1em;
    // margin: 0 !important;
    font-size: 2rem;

}

.social-media-container {
    display: inline-block;
}

.further-reading {
    cursor: pointer;
}
</style>
