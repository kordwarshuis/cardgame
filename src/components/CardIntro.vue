<template>
<!-- open/close -->
<div class="overlay-fullscreen overlay-fullscreen-contentpush" :class="this.$store.state.cssClassCardIntroState">
    <div class="row m-0 pb-5">
        <div class="col-lg-6 col-sm-6 column1 p-0">
            <div class="card h-100 bg-transparent" style="border:none;">
                <div class="card-body">

                    <h3 class="pt-sm-2">{{ misconception }}</h3>
                    <div class="card-intro-misconception p-3 mt-2 text-center">
                        <!-- <span class="quote">“</span> -->
                        <p class="typed mb-3">{{ getMisconception }} …</p>
                        <!-- <span class="quote">”</span> -->
                        <button class="btn btn-primary mt-3 d-block ml-auto mr-auto" style="cursor:pointer;" @click="showCardFull">{{ openFullCard }}</button>
                    </div>

                </div>
            </div>
        </div>

        <div class="col-lg-6 col-sm-6 column2 p-0">
            <div class="card h-100 bg-transparent" style="border:none;">
                <div class="card-body center" style="">
                    <time v-if="(this.$store.state.currentCard['Date'])">{{this.$store.state.currentCard['Date']}}</time>

                    <h3 class="pt-2 reply">{{ reply }}</h3>

                    <p v-linkified:options="$store.state.linkifyOptions" v-for="item in this.$store.state.currentCard['Short Answer']" v-bind:key="item">{{ item }}</p>
                    <hr>
                    <div v-if="(this.$store.state.currentCard['Youtube Video Id'])" class="col-lg-12 col-sm-12 p-0" style="font-size: 0.9em;">
                        <VideoYoutubeBare />
                    </div>
                    <div v-if="(this.$store.state.currentCard['Self Hosted Video'])" class="col-lg-12 col-sm-12 p-0" style="font-size: 0.9em;">
                        <MediaSelfHostedBare />
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

        <div class="footer col-lg-12 col-sm-12 m-0">
            <div>
                <div>
                    <SocialMedia />
                </div>
                <button class="copyURLtoClipboard copyURLtoClipboardCardIntroAndFull " style="display: inline-block;vertical-align: middle;margin-left: 1em !important;" title="Copy Link">Copy Link</button>
            </div>
        </div>
    </div>
    <a class="overlay-fullscreen-close"><span class="cross">×</span><span class="back-sign">‹</span><span class="back-text"> {{backToCards}}</span></a>
</div>
</template>

<script>
import SocialMedia from "@/components/SocialMedia.vue";
import RelatedCards from "@/components/RelatedCards.vue";
import Quiz from "@/components/Quiz.vue";
import VideoYoutubeBare from "@/components/VideoYoutubeBare.vue";
import MediaSelfHostedBare from "@/components/MediaSelfHostedBare.vue";
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
        VideoYoutubeBare,
        MediaSelfHostedBare
        // Quiz
    },
    data() {
        return {
            misconception: language.misconception,
            reply: language.reply,
            openFullCard: language.openFullCard,
            backToCards: language.backToCards
        }
    },
    computed: {
        getMisconception: function () {
            return this.$store.state.currentCard["Misconception"];
        }
    },
    watch: {
        getMisconception(newValue, oldValue) {
            this.typeWriter(".typed", newValue, 20);
        }
    },
    mounted: function () {
        this.handleCardIntro();
        this.disableBodyScroll(".overlay-fullscreen>div"); //mixin
    },
    methods: {
        typeWriter(selector, misconception, interval) {
            var audioPlaying = false;
            var text = document.querySelector(selector),
                textCopy = misconception,
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
                closeBttn = document.querySelector('.overlay-fullscreen-close');
            // TODO: rename, since it is not a toggle anymore
            function toggleOverlayFullscreen() {

                if (localStorage.getItem("soundOn") === "true") whoosh2.play();
                if (overlayFullscreen.classList.contains('open')) {
                    overlayFullscreen.classList.add('close');

                    that.$store.commit("changeCssClassCardIntroState", "");
                    that.$store.commit("changeCssClassCardOverviewState", "");
                    // if you close the intro card, the full card screen should also be closed.
                    // TODO: see also Home.vue, rewrite
                    that.$store.commit('hideModal');

                    that.$router.push("/");
                    var onEndTransitionFn = function (ev) {
                        if (ev.propertyName !== 'visibility') return;
                        this.removeEventListener('transitionend', onEndTransitionFn);
                        overlayFullscreen.classList.remove('close');
                    };

                    overlayFullscreen.addEventListener('transitionend', onEndTransitionFn);
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

            // stop html video when opening modal. Simply stop all video:
            document.querySelectorAll('video, audio').forEach(function (vid) {
                vid.pause();
            });
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
    box-shadow: $shadow3;
    color: $card-intro-color;
    background: $card-intro-background;
    border-radius: 10px;
    box-shadow: $card-intro-box-shadow;
}

.overlay-fullscreen>div {
    overflow: scroll;
    height: 100%;
    -webkit-overflow-scrolling: touch; //https://stackoverflow.com/a/41601290
}

.footer {
    position: fixed;
    bottom: 0;
    left: 0;
    background: $linear-gradient1;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.footer>div {
    margin: 0 auto;
    text-align: center;
}

.footer>div>div {
    display: inline-block;
}

// hr {

// }

// SECONDARY MENU

.column1 h3 {
    padding-top: 2em;
}

h3.reply {
    color: $reply-heading-color;
}

.overlay-fullscreen .overlay-fullscreen-close {
    cursor: pointer;
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(0, $subMenuOffsetTopOnSmallScreen);
    width: 100%;
    border: none;
    background: $card-intro-back-background;
    color: $card-intro-back-color;
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
        background: $card-intro-back-background-bigscreen;
        // border: 1px solid red;
        // border-radius: 50%;
        color: $card-intro-back-color-bigscreen;
        ;
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
        // height: 70%;
        min-height: 70% !important;
        max-height: 90%;
    }
}

// END SECONDARY MENU

// doesnt seem to serve a purpose
// .container.overlay-fullscreen-open::after {
//     visibility: visible;
//     opacity: 1;
//     -webkit-transition: opacity 0.5s;
//     transition: opacity 0.5s;
// }

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

.card-intro-misconception {
    color: $card-intro-content-item-color;
    background-color: $card-intro-content-item-background;
    min-height: 9em;
    border-radius: 10px;
}
</style>
