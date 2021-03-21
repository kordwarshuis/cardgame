<template>
<!-- open/close -->
<div class="overlay-fullscreen overlay-fullscreen-contentpush" :class="this.$store.state.cssClassCardIntroState">
    <div class=columns-layout-container>

        <!-- MISCONCEPTION -->
        <div class="masthead card h-100 mt-5 pb-3" style="height: auto !important;">
            <div class="card-body">
                <!-- <h3 class="pt-sm-2">{{ misconception }}</h3> -->

                <!-- SOCIAL MEDIA IMAGE -->
                <div v-if="showSocialMediaImage === 'true'" class="social-media-image">
                    <img class="mb-3" :src="socialMediaImagesPath + this.$store.state.currentCard['Unique URL'] + '.jpg'" alt="">
                </div>

                <!-- TYPED TEXT -->
                <!-- <span class="quote">“</span> -->
                <p class="misconception-typed typed mb-3">{{ getMisconception }} </p>
                <!-- <span class="quote">”</span> -->
                <!-- <button class="btn btn-primary mt-3 d-block ml-auto mr-auto" style="cursor:pointer;" @click="showCardFull">{{ openFullCard }}</button> -->
            </div>
        </div>

        <div class="columns-layout">
            <!-- MISCONCEPTION ELABORATE-->
            <div class="card h-100" v-if="this.$store.state.currentCard['Misconception Elaborate']">
                <div class="card-body center" style="">
                    <h3>{{ misconception }}</h3>
                    <p v-linkified:options="$store.state.linkifyOptions" v-for="item in this.$store.state.currentCard['Misconception Elaborate']" v-bind:key="item">
                        <!-- <span class="quote">“</span> -->
                        {{ item }}
                        <!-- <span class="quote">”</span> -->
                    </p>
                </div>
            </div>

            <!-- SHORT ANSWER-->
            <div class="card h-100">
                <div class="card-body center" style="">
                    <h3 class="pt-2 reply">{{ reply }}</h3>
                    <time v-if="(this.$store.state.currentCard['Date'])">{{this.$store.state.currentCard['Date']}}</time>

                    <p class="" v-linkified:options="$store.state.linkifyOptions" v-for="item in this.$store.state.currentCard['Short Answer']" v-bind:key="item">{{ item }}
                    </p>
                    <!-- <hr> -->
                </div>
            </div>

            <!-- VIDEO YOUTUBE-->
            <div v-if="(this.$store.state.currentCard['Youtube Video Id'])" class="card h-100">
                <div class="card-body center p-1" style="">
                    <div class="col-lg-12 col-sm-12 p-0 mb-3" style="font-size: 0.9em;">
                        <VideoYoutube />
                    </div>
                </div>
            </div>

            <!-- MEDIA SELF HOSTED-->
            <div v-if="(this.$store.state.currentCard['Self Hosted Video'])" class="card h-100">
                <div class="card-body center p-1" style="">
                    <div class="col-lg-12 col-sm-12 p-0 mb-3" style="font-size: 0.9em;">
                        <MediaSelfHosted />
                    </div>
                </div>
            </div>

            <!-- LONG ANSWER -->
            <div v-if="this.$store.state.currentCard['Long Answer']" class="card h-100 p-3 mb-3">
                <h3 class="longAnswer">{{ longAnswer }}</h3>
                <p v-linkified:options="$store.state.linkifyOptions" v-for="item in this.$store.state.currentCard['Long Answer']" v-bind:key="item">
                    {{ item }}</p>
            </div>

            <!-- DIAGRAM -->
            <div v-if="this.$store.state.currentCard['Diagram Data']" class="card h-100 p-3 mb-3">
                <h3 class="diagram">{{ diagram }}</h3>
                <p v-linkified:options="$store.state.linkifyOptions">
                    {{this.$store.state.currentCard["Diagram Description"]}}</p>
                <div class="ct-chart ct-golden-section " style=" max-width: 50em;margin: auto !important; "></div>
            </div>

            <!-- QUIZ -->
            <Quiz />

            <!-- READ MORE 1 -->
            <div v-if="this.$store.state.currentCard['Read On 1 Text']" class="card h-100 p-3 mb-3">
                <h3 class="readOn">{{ readMore }}</h3>
                <p v-linkified:options="$store.state.linkifyOptions">
                    {{this.$store.state.currentCard["Read On 1 Text"]}}</p>
                <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 1 Link']">{{ readOn }}</a>
                </p>
            </div>

            <!-- READ MORE 2 -->
            <div v-if="this.$store.state.currentCard['Read On 2 Text']" class="card h-100 p-3 mb-3">
                <h3 class="readOn">{{ readMore }}</h3>
                <p v-linkified:options="$store.state.linkifyOptions">
                    {{this.$store.state.currentCard["Read On 2 Text"]}}</p>
                <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 2 Link']">{{ readOn }}</a></p>
            </div>

            <!-- READ MORE 3 -->
            <div v-if="this.$store.state.currentCard['Read On 3 Text']" class="card h-100 p-3 mb-3">
                <h3 class="readOn">{{ readMore }}</h3>
                <p v-linkified:options="$store.state.linkifyOptions">
                    {{this.$store.state.currentCard["Read On 3 Text"]}}</p>
                <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 3 Link']">{{ readOn }}</a></p>
            </div>

            <!-- EXPERT 1 -->
            <div v-if="this.$store.state.currentCard['Expert1']" class="card h-100 p-3 mb-3">
                <h3 class="expert1">{{expert1}}</h3>
                <img v-if='expert1Logo !== ""' class="img-thumbnail rounded float-left mr-3" :src="expert1Logo" alt="portrait of the expert">
                <p v-linkified:options="$store.state.linkifyOptions">
                    {{ this.$store.state.currentCard['Expert1'] }}</p>
            </div>

            <!-- EXPERT 2 -->
            <div v-if="this.$store.state.currentCard['Expert2']" class="card h-100 p-3 mb-3">
                <h3 class="expert2">{{expert2}}</h3>
                <img v-if='expert2Logo !== ""' class="img-thumbnail rounded float-left mr-3" :src="expert2Logo" alt="portrait of the expert">
                <p v-linkified:options="$store.state.linkifyOptions">
                    {{ this.$store.state.currentCard['Expert2'] }}</p>
            </div>

            <!-- EXPERT 3 -->
            <div v-if="this.$store.state.currentCard['Expert3']" class="card h-100 p-3 mb-3">
                <h3 class="expert3">{{expert3}}</h3>
                <img v-if='expert3Logo !== ""' class="img-thumbnail rounded float-left mr-3" :src="expert3Logo" alt="portrait of the expert">
                <p>{{expert3Description}}<a target="_blank" rel="noopener" :href="this.$store.state.currentCard['Expert3']">Read</a></p>
            </div>

            <!-- COUNTER QUESTIONS -->
            <div v-if="this.$store.state.currentCard['Counter Questions']" class="card h-100 p-3 mb-3">
                <h3 class="counter-question">{{ counterQuestions }}</h3>
                <p v-linkified:options="$store.state.linkifyOptions">
                    {{this.$store.state.currentCard["Counter Questions"]}}</p>
            </div>

            <!-- ANALOGY -->
            <div v-if="this.$store.state.currentCard['Analogy']" class="card h-100 p-3 mb-3">
                <h3 class="">{{ analogy }}</h3>
                <p v-linkified:options="$store.state.linkifyOptions">
                    {{this.$store.state.currentCard["Analogy"]}}</p>
            </div>

            <!-- <button class="md-close mt-1 btn btn-primary text-right" @click="$store.commit('hideModal')">Close</button> -->
            <div v-if="discussionLink !== ''" class="discussion-group-link center card h-100 p-3 mb-3 ">
                <p><a class="btn btn-primary mr-2" style="border: none; background: #373E65;" target="_blank" rel="noopener" :href="discussionLink">{{ discussionLinkDescription }}</a></p>
            </div>

            <Person3 />

            <!-- KEYWORDS CARDS -->
            <Keywords />

            <!-- RELATED CARDS -->
            <RelatedCards />

            <RandomCard />
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
import RandomCard from "@/components/RandomCard.vue";
import Quiz from "@/components/Quiz.vue";
import VideoYoutube from "@/components/VideoYoutube.vue";
import VideoYoutubeBare from "@/components/VideoYoutubeBare.vue";
import MediaSelfHosted from "@/components/MediaSelfHosted.vue";
import MediaSelfHostedBare from "@/components/MediaSelfHostedBare.vue";
import ImageSelfHosted from "@/components/ImageSelfHosted.vue";
import ImagesSelfHosted from "@/components/ImagesSelfHosted.vue";
import Keywords from "@/components/Keywords.vue";
import Person3 from "@/components/AnimatedCharacters/Person3.vue";

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
        RandomCard,
        VideoYoutube,
        VideoYoutubeBare,
        ImageSelfHosted,
        MediaSelfHostedBare,
        MediaSelfHosted,
        ImagesSelfHosted,
        Quiz,
        SocialMedia,
        RelatedCards,
        Keywords,
        Person3
    },
    data() {
        return {
            misconception: language.misconception,
            reply: language.reply,
            openFullCard: language.openFullCard,
            backToCards: language.backToCards,
            showSocialMediaImage: process.env.VUE_APP_SHOW_SOCIAL_MEDIA_IMAGE_IN_CARD,
            socialMediaImagesPath: process.env.VUE_APP_SOCIAL_MEDIA_IMAGES_PATH,

            backToCardIntro: language.backToCardIntro,
            expert1: language.expert1,
            expert1Description: language.expert1Description,
            expert1Logo: language.expert1Logo ? process.env.VUE_APP_MEDIA_LOCATION + language.expert1Logo : "",
            expert2: language.expert2,
            expert2Description: language.expert2Description,
            expert2Logo: language.expert2Logo ? process.env.VUE_APP_MEDIA_LOCATION + language.expert2Logo : "",
            expert3: language.expert3,
            expert3Description: language.expert3Description,
            expert3Logo: language.expert3Logo ? process.env.VUE_APP_MEDIA_LOCATION + language.expert3Logo : "",
            shortAnswer: language.shortAnswer,
            longAnswer: language.longAnswer,
            diagram: language.diagram,
            readMore: language.readMore,
            readOn: language.readOn,
            counterQuestions: language.counterQuestions,
            analogy: language.analogy,
            flowerPower: language.flowerPower,
            discussionLink: process.env.VUE_APP_DISCUSSION_LINK,
            discussionLinkDescription: process.env.VUE_APP_DISCUSSION_LINK_DESCRIPTION
        }
    },
    computed: {
        getMisconception: function () {
            return this.$store.state.currentCard["Misconception"];
        }
    },
    watch: {
        getMisconception(newValue, oldValue) {
            this.typeWriter(".typed", newValue, 35);

            setTimeout(() => {
                if (this.$store.state.currentCard['Diagram Data']) {
                    this.createBarGraph();
                }
            }, 1000);

        }
    },
    mounted: function () {
        this.handleCardIntro();
        this.disableBodyScroll(".overlay-fullscreen>div"); //mixin
        // this.showPurringCat();
    },
    methods: {
        typeWriter(selector, misconception, interval) {
            var audioPlaying = false;
            var text = document.querySelector(selector),
                textCopy = "",
                i = 0,
                clear,
                pauseBeforeStart = 600;

            text.innerHTML = "";
            clearInterval(clear);

            function typeText() {
                if (audioPlaying === false) {
                    if (localStorage.getItem("soundOn") === "true") typewriter.play();
                    audioPlaying = true;
                }
                //option 1:
                // text.innerHTML += textCopy[i];
                //option 2:
                // text.insertAdjacentHTML("beforeend", textCopy[i]);
                //option 3:
                text.append(misconception[i]);

                i++;
                if (i === misconception.length) {
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
                // textCopy = misconception;
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
        },

        createBarGraph() {
            var options = {
                seriesBarDistance: 1,
                // divisor: 40,
                // stackBars: true,
                axisX: {
                    offset: 40
                },
                axisY: {
                    offset: 40,
                    onlyInteger: true,
                    // ticks: [1, 10, 20, 30],
                    // position: 'end',
                    labelInterpolationFnc: function (value) {
                        return value;
                    },
                    scaleMinSpace: 15
                }
            };
            var currentCardDiagram = this.$store.state.currentCard['Diagram Data'];
            var data = {};
            var labels = currentCardDiagram.split('|')[0];
            var series = currentCardDiagram.split('|')[1];
            labels = labels.split(',');
            series = series.split(',');
            data.labels = labels;
            data.series = [];
            data.series[0] = series;
            var diagram = new Chartist.Bar('.ct-chart', data, options);

            // https://stackoverflow.com/a/48299759
            diagram.on('draw', function (data) {
                if (data.type == 'bar') {
                    data.element.animate({
                        y2: {
                            dur: '2s',
                            from: data.y1,
                            to: data.y2
                        }
                    });
                }
            });
        },
        showPurringCat() {
            // var inViewport = false;
            var isStarted = false;
            /*!
             * https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/
             * Determine if an element is in the viewport
             * (c) 2017 Chris Ferdinandi, MIT License, https://gomakethings.com
             * @param  {Node}    elem The element
             * @return {Boolean}      Returns true if element is in the viewport
             */
            var isInViewport = function (elem) {
                var distance = elem.getBoundingClientRect();
                return (
                    distance.top >= 0 &&
                    distance.left >= 0 &&
                    distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    distance.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            };

            function check(event) {
                if (isInViewport(object)) {
                    if (!isStarted) {
                        if (localStorage.getItem("soundOn") === "true") pur.play();
                        document.querySelector("body").classList.add("person3");
                        setTimeout(function () {
                            pur.stop();
                            document.querySelector("body").classList.remove("person3");
                            isStarted = false;
                        }, 7000);
                        isStarted = true;
                    }
                }
            }

            var object = document.querySelector('.md-close');
            // window.addEventListener('scroll', _.throttle(check, 1000), false);

            // var interval = setInterval(check, 1000);
        }

    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
// https://www.dev-tips-and-tricks.com/use-bootstrap-4-media-query-mixins
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins/_breakpoints";

/*! https://tympanus.net/Development/FullscreenOverlayStyles/index7.html# */
/* Overlay style */

#app .overlay-fullscreen {
    position: fixed;
    width: 100%;
    max-width: 70em;
    height: 100%;
    // overflow: scroll;
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

.masthead {
    // margin: 0 1em 0;
    min-height: 10em;
    background: #5359a5 !important;
    color: #eee !important;
}

.social-media-image img {
    border-radius: 10px;
    width: 100%;
}

.misconception-typed {
    p {
        font-size: 1.5em;
    }
}

@media (min-width: 768px) {
    .social-media-image {
        margin-right: 2em;
        float: left;
        display: block;
        max-width: 50%;
        width: 100%;
        // border: 3px solid purple;
    }

    .misconception-typed {
        // padding-top: 1em;
        font-size: 2.5em;
    }

    // .card-intro-misconception {
    //     // color: $card-intro-content-item-color;
    //     // background-color: $card-intro-content-item-background;

    //     border-radius: 10px;
    //     // float: right;
    //     // max-width: 45%;
    //     min-width: 2em;
    //     // border: 3px solid green;
    //     display: inline;

    // }
}

.columns-layout-container {
    overflow: scroll;
    height: 100%;
    -webkit-overflow-scrolling: touch; //https://stackoverflow.com/a/41601290
    padding: 0 1em 100px;
}

.columns-layout {
    height: auto;
    column-fill: auto;

    @include media-breakpoint-only(lg) {
        column-count: 2;
        // column-span: all;
    }

    @include media-breakpoint-only(xl) {
        column-count: 2;
        // column-span: none;
    }
}

.card {
    background: $card-full-content-item-background;
    color: $card-full-content-item-color;
    border: $card-intro-border;
    display: inline-block; // this is needed as long as the specs is not fully implemented
    width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
    column-break-inside: avoid;
}

.card>p {
    margin-left: $cardFullTextIndent;
}

h2 {
    margin: 1.5em 0 0.5em; // to keep distance from sec / tert menu
    font-size: 2em;
    color: $misconception-heading-color;
}

h2.reply {
    color: $reply-heading-color;
}

.misconception-short-and-elaborate {
    margin: 0em 0 1em; // to keep distance from sec / tert menu
    padding: 1em 0;
    border-top: 3px dotted #666;
    border-bottom: 3px dotted #666;
    color: $misconception-short-and-elaborate-color;
}

// .modal-content {
//     color: $card-full-color;
//     background: $card-full-background !important; //Suddenly needs important, can't explain why
// }

h3 {
    background-repeat: no-repeat;
    background-size: 0.8em;
    // padding: 0.4em;
    padding-left: 1.1em;
    // padding-bottom: 1em;
    // margin-top: 1em;
}

h3.longAnswer {
    background-image: url(../assets/img/icons/jv-creative/answer.svg);
}

h3.quiz {
    background-image: url(../assets/img/icons/jv-creative/quiz.svg);
    text-align: left;
}

h3.video {
    background-image: url(../assets/img/icons/flat/film.svg);
    text-align: left;
}

h3.flowerPower {
    background-image: url(../assets/img/animated-gif/pink_panther_e0.gif);
}

h3.readOn {
    background-image: url(../assets/img/icons/jv-creative/read-more.svg);

}

h3.counter-question {
    background-image: url(../assets/img/icons/jv-creative/counter-questions.svg);
}

h3.related {
    background-image: url(../assets/img/logo/logo.png);
}

.bottom-bar {
    margin-bottom: 1em; // to make the bottom bar fully visible
    background: $linear-gradient1;
}

// .discussion-group-link {
//     border-top: 1px dashed $card-full-content-item-color;
// }
</style>
