<template>
<div class="popup md-modal md-effect-2 mt-3 mb-3 m-0" :class="this.$store.state.cssClassCardFullState" id="modal-6">
    <a @click="$store.commit('hideModal')" class="md-close md-close-cross"><span class="cross">×</span><span class="back-sign">‹</span><span class="back-text">Back</span></a>
    <div class="md-content">
        <div>
            <div class="modal-content p-3 pt-5">
                <h2 class="mx-auto">{{ misconception }}</h2>
                <div class="misconception-short-and-elaborate">
                    <p class="title text-center"><span class="quote">“</span>{{ this.$store.state.currentCard.Misconception }}<span class="quote">”</span></p>

                    <template v-if="this.$store.state.currentCard['Misconception Elaborate']">
                        <p class="text-center" v-linkified:options="$store.state.linkifyOptions" v-for="item in this.$store.state.currentCard['Misconception Elaborate']" v-bind:key="item"><span class="quote">“</span>{{ item }}<span class="quote">”</span></p>
                    </template>
                </div>

                <h2 class="mx-auto reply">{{ reply }}</h2>
                <div class="content-item border p-3 mb-3 mt-3" v-if="this.$store.state.currentCard['Short Answer']">
                    <h3>{{ shortAnswer }}</h3>
                    <p v-linkified:options="$store.state.linkifyOptions" v-for="item in this.$store.state.currentCard['Short Answer']" v-bind:key="item">{{ item }}</p>
                </div>

                <div class="content-item border p-3 mb-3 mt-3" v-if="this.$store.state.currentCard['Long Answer']">
                    <h3 class="longAnswer">{{ longAnswer }}</h3>
                    <p v-linkified:options="$store.state.linkifyOptions" v-for="item in this.$store.state.currentCard['Long Answer']" v-bind:key="item">{{ item }}</p>
                </div>

                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Diagram Data']">
                    <h3 class="diagram">{{ diagram }}</h3>
                    <p v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard["Diagram Description"]}}</p>
                    <div class="ct-chart ct-golden-section " style=" max-width: 50em;margin: auto !important; "></div>
                </div>

                <Quiz />
                <!-- if there is Youtube video -->
                <div class="row" v-if="(this.$store.state.currentCard['Youtube Video Id'])">
                    <div class="col-md-4 mb-3">
                        <VideoYoutube />
                    </div>
                    <div class="col-md-8 mb-3">
                        <!-- READ MORE 1 -->
                        <div class="content-item border p-3 " v-if="this.$store.state.currentCard['Read On 1 Text']">
                            <h3 class="readOn">{{ readMore }}</h3>
                            <p v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard["Read On 1 Text"]}}</p>
                            <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 1 Link']">{{ readOn }}</a></p>
                        </div>
                    </div>
                </div>

                <!-- if there is NO Youtube video -->
                <div class="row" v-else>
                    <div class="col-md-12 mb-3">
                        <!-- READ MORE 1 -->
                        <div class="content-item border p-3" v-if="this.$store.state.currentCard['Read On 1 Text']">
                            <h3 class="readOn">{{ readMore }}</h3>
                            <p v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard["Read On 1 Text"]}}</p>
                            <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 1 Link']">{{ readOn }}</a></p>
                        </div>
                    </div>
                </div>

                <!-- if there is Self Hosted video -->
                <div class="row" v-if="(this.$store.state.currentCard['Self Hosted Video'])">
                    <div class="col-md-12 mb-3">
                        <VideoSelfHosted />
                    </div>
                </div>

                <!-- READ MORE 2 -->
                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Read On 2 Text']">
                    <h3 class="readOn">{{ readMore }}</h3>
                    <p v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard["Read On 2 Text"]}}</p>
                    <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 2 Link']">{{ readOn }}</a></p>
                </div>

                <!-- READ MORE 3 -->
                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Read On 3 Text']">
                    <h3 class="readOn">{{ readMore }}</h3>
                    <p v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard["Read On 3 Text"]}}</p>
                    <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 3 Link']">{{ readOn }}</a></p>
                </div>

                <!-- EXPERT 1 -->
                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Expert1']">
                    <h3 class="expert1">{{expert1}}</h3>
                    <img v-if='expert1Logo !== ""' class="img-thumbnail rounded float-left mr-3" :src="expert1Logo" alt="portrait of the expert">
                    <p v-linkified:options="$store.state.linkifyOptions">{{ this.$store.state.currentCard['Expert1'] }}</p>
                </div>

                <!-- EXPERT 2 -->
                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Expert2']">
                    <h3 class="expert2">{{expert2}}</h3>
                    <img v-if='expert2Logo !== ""' class="img-thumbnail rounded float-left mr-3" :src="expert2Logo" alt="portrait of the expert">
                    <p v-linkified:options="$store.state.linkifyOptions">{{ this.$store.state.currentCard['Expert2'] }}</p>
                </div>

                <!-- EXPERT 3 -->
                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Expert3']">
                    <h3 class="expert3">{{expert3}}</h3>
                    <img v-if='expert3Logo !== ""' class="img-thumbnail rounded float-left mr-3" :src="expert3Logo" alt="portrait of the expert">
                    <p>{{expert3Description}}<a target="_blank" rel="noopener" :href="this.$store.state.currentCard['Expert3']">Read</a></p>
                </div>

                <!-- COUNTER QUESTIONS -->
                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Counter Questions']">
                    <h3 class="counter-question">{{ counterQuestions }}</h3>
                    <p v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard["Counter Questions"]}}</p>
                </div>

                <!-- ANALOGY -->
                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Analogy']">
                    <h3 class="">{{ analogy }}</h3>
                    <p v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard["Analogy"]}}</p>
                </div>

                <!-- FLOWER POWER -->
                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Flower Power']">
                    <h3 class="flowerPower">{{ flowerPower }}</h3>
                    <p v-linkified:options="$store.state.linkifyOptions">{{this.$store.state.currentCard["Flower Power"]}}</p>
                </div>

                <!-- RELATED CARDS -->
                <RelatedCards />

                <button class="md-close mt-1 btn btn-primary text-right" @click="$store.commit('hideModal')">Close</button>
                <div class="discussion-group-link center m-4 mb-0 p-3 ">
                    <p><a class="btn btn-primary mr-2" style="border: none; background: #373E65;" target="_blank" rel="noopener" :href="discussionLink">{{ discussionLinkDescription }}</a></p>
                </div>

                <Person3 />
            </div>
        </div>
        <div class="bottom-bar">
            <div>
                <div style="display: inline-block;">
                    <SocialMedia />
                </div>
                <button class="copyURLtoClipboard copyURLtoClipboardCardIntroAndFull " style="display: inline-block;vertical-align: middle;margin-left: 1em !important;" title="Copy Link">Copy Link</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Quiz from "@/components/Quiz.vue";
import VideoYoutube from "@/components/VideoYoutube.vue";
import VideoSelfHosted from "@/components/VideoSelfHosted.vue";
import SocialMedia from "@/components/SocialMedia.vue";
import RelatedCards from "@/components/RelatedCards.vue";
import Person3 from "@/components/AnimatedCharacters/Person3.vue";
import {
    disableBodyScrollMixin
} from "./mixins/disableBodyScroll";

export default {
    name: "CardFull",
    data: function () {
        return {
            misconception: language.misconception,
            reply: language.reply,
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
    mixins: [disableBodyScrollMixin],
    components: {
        Quiz,
        VideoYoutube,
        VideoSelfHosted,
        SocialMedia,
        RelatedCards,
        Person3
    },
    computed: {
        getMisconception: function () {
            return this.$store.state.currentCard.Misconception;
        }
    },
    watch: {
        getMisconception(newValue, oldValue) {
            setTimeout(() => {
                if (this.$store.state.currentCard['Diagram Data']) {
                    this.createBarGraph();
                }
            }, 1000);

        }
    },

    mounted() {
        this.showPurringCat();
        this.disableBodyScroll(".md-content"); //mixin
    },
    props: {
        msg: String
    },
    methods: {
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

<style lang="scss">
/*! https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/ */
@import "../assets/css/card-full-open-close.scss";

.title {
    font-size: 1.2em;
}

.md-content {
    -webkit-overflow-scrolling: touch; //https://stackoverflow.com/a/41601290
}

// TERTIARY MENU
.md-close.md-close-cross {
    cursor: pointer;
    position: fixed;
    top: 0;
    margin-top: calc(#{$subMenuOffsetTopOnSmallScreen - 16px});
    // right: 10px;
    left: 0;
    width: 100%;
    border: none;
    background: $card-full-back-background;
    color: $card-full-back-color;
    display: block;
    z-index: 1;

    // height of tertiary menu bar
    line-height: 1.2;
    font-size: 1.0em;
    padding: 0.2em 0.2em;
}

.md-close.md-close-cross {
    text-decoration: none;
}

.md-close .cross {
    display: none;
}

.md-close .back-text {
    font-family: 'poppinsbold';
    font-size: 1.2em;
    vertical-align: middle;
    line-height: 0;
    padding: 0;
    margin: 0;
    // border: 1px solid red;
}

.md-close .back-sign {
    font-size: 3.0em;
    line-height: 0.9; // use this to set height of bar
    vertical-align: middle;
    margin: 0 0.1em 0 0.2em;
    padding: 0 0 0 0;
    // border: 1px solid red;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .md-close.md-close-cross {
        position: fixed;
        top: 20px;
        right: 10px;
        left: auto;
        width: 40px;
        border: none;
        background: $card-full-back-background-bigscreen;
        // border: 1px solid red;
        // border-radius: 50%;
        color: $card-full-back-color-bigscreen;
        padding: 0.2em;
        margin-top: 0;
        display: inline-block;
        font-size: 2.5em;
        line-height: 0.6;
        cursor: pointer;
        // z-index: 5;
    }

    .md-close .cross {
        display: block;
    }

    .md-close .back-sign,
    .md-close .back-text {
        display: none;
    }
}

// END TERTIARY MENU

.modal-content h2 {
    margin: 1.5em 0 0.5em; // to keep distance from sec / tert menu
    font-size: 2em;
    color: $misconception-heading-color;
}

.modal-content h2.reply {
    color: $reply-heading-color;
}

.misconception-short-and-elaborate {
    margin: 0em 0 1em; // to keep distance from sec / tert menu
    padding: 1em 0;
    border-top: 3px dotted #666;
    border-bottom: 3px dotted #666;
    color: $misconception-short-and-elaborate-color;
}

.content-item {
    background: $card-full-content-item-background;
    color: $card-full-content-item-color;
    border-radius: 10px;
}

.content-item>p {
    margin-left: $cardFullTextIndent;
}

.modal-content {
    color: $card-full-color;
    background: $card-full-background !important; //Suddenly needs important, can't explain why
}

.modal-content h3 {
    background-repeat: no-repeat;
    background-size: 0.8em;
    // padding: 0.4em;
    padding-left: 1.1em;
    // padding-bottom: 1em;
    // margin-top: 1em;
}

.modal-content h3.longAnswer {
    background-image: url(../assets/img/icons/jv-creative/answer.svg);
}

.modal-content h3.quiz {
    background-image: url(../assets/img/icons/jv-creative/quiz.svg);
    text-align: left;
}

.modal-content h3.video {
    background-image: url(../assets/img/icons/flat/film.svg);
    text-align: left;
}

.modal-content h3.flowerPower {
    background-image: url(../assets/img/animated-gif/pink_panther_e0.gif);
}

.modal-content h3.readOn {
    background-image: url(../assets/img/icons/jv-creative/read-more.svg);

}

.modal-content h3.counter-question {
    background-image: url(../assets/img/icons/jv-creative/counter-questions.svg);
}

.modal-content h3.related {
    background-image: url(../assets/img/logo/logo.png);
}

.modal-content a.modalbox-iconbackground {
    text-decoration: underline;
}

.md-modal * {
    text-align: left;
}

// /* Content styles */
.md-content {
    box-shadow: $shadow3;
}

.md-content button {
    display: block;
    margin: 0 auto;
    font-size: 1em;
}

.bottom-bar {
    margin-bottom: 1em; // to make the bottom bar fully visible
    background: $linear-gradient1;
}

.discussion-group-link {
    border-top: 1px dashed $card-full-content-item-color;
}
</style>
