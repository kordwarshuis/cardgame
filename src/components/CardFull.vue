<template>
<div class="popup md-modal md-effect-2 mt-3 mb-3 m-0" :class="this.$store.state.cssClassCardFullState" id="modal-6">
    <a @click="$store.commit('hideModal')" class="md-close md-close-cross"><span class="cross">×</span><span class="back-sign">‹</span><span class="back-text">Back</span></a>
    <div class="md-content">
        <!-- <h3 class="modal-header"></h3> -->
        <div>
            <div class="modal-content p-3 pt-5">
                <div class="misconception-short-and-elaborate">
                    <h2 class="title text-center"><span class="quote">“</span>{{ this.$store.state.currentCard.Prejudice }}<span class="quote">”</span></h2>
                    <p class="text-center"><span class="quote">“</span>{{ this.$store.state.currentCard["Prejudice Elaborate"] }}<span class="quote">”</span></p>
                </div>

                <!-- <button class="copyURLtoClipboard copyURLtoClipboard1" title="Copy Link">Copy Link</button> -->

                <div class="content-item border p-3 mb-3 mt-3" v-if="this.$store.state.currentCard['long answer+facts']">

                    <h3 class="longAnswer">Answer</h3>
                    <p v-linkified v-for="item in this.$store.state.currentCard['long answer+facts']" v-bind:key="item">{{ item }}</p>
                </div>

                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Diagram Data']">

                    <h3 class="diagram">Diagram</h3>
                    <p>{{this.$store.state.currentCard["Diagram Description"]}}</p>

                    <div class="ct-chart ct-golden-section " style=" max-width: 50em;margin: auto !important; ">
                    </div>
                </div>

                <Quiz />
                <!-- if there is video -->
                <div class="row" v-if="(this.$store.state.currentCard['Youtube Video Id'])">
                    <div class="col-md-4 mb-3">
                        <Video />
                    </div>
                    <div class="col-md-8 mb-3">
                        <div class="content-item border p-3 " v-if="this.$store.state.currentCard['Read On 1 Text']">
                            <h3 class="readOn">Read More</h3>
                            <p v-linkified>{{this.$store.state.currentCard["Read On 1 Text"]}}</p>
                            <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 1 Link']">Read on</a></p>
                        </div>
                    </div>
                </div>

                <!-- if there is NO video -->
                <div class="row" v-else>
                    <div class="col-md-12 mb-3">
                        <div class="content-item border p-3" v-if="this.$store.state.currentCard['Read On 1 Text']">
                            <h3 class="readOn">Read More</h3>
                            <p v-linkified>{{this.$store.state.currentCard["Read On 1 Text"]}}</p>
                            <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 1 Link']">Read on</a></p>
                        </div>
                    </div>
                </div>

                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Read On 2 Text']">

                    <h3 class="readOn">Read More</h3>
                    <p v-linkified>{{this.$store.state.currentCard["Read On 2 Text"]}}</p>
                    <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 2 Link']">Read on</a></p>
                </div>

                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Read On 3 Text']">
                    <h3 class="readOn">Read More</h3>
                    <p v-linkified>{{this.$store.state.currentCard["Read On 3 Text"]}}</p>
                    <p><a class="btn btn-outline-dark" target="_blank" rel="noopener" :href="this.$store.state.currentCard['Read On 3 Link']">Read on</a></p>
                </div>

                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['wiki - Myths']">
                    <h3 class="WikiMyths">Wiki Myths</h3>
                    <p>This bitcoin misconception cleared up by the bitcoin wiki community: <a target="_blank" rel="noopener" :href="this.$store.state.currentCard['wiki - Myths']">Read</a></p>
                </div>

                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Eric Voskuil']">
                    <h3 class="EricVoskuil">Eric Voskuil</h3>
                    <p v-linkified>{{ this.$store.state.currentCard['Eric Voskuil'] }}</p>
                </div>

                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Counter-questions']">

                    <h3 class="counterQuestion">Counter-questions</h3>
                    <p v-linkified>{{this.$store.state.currentCard["Counter-questions"]}}</p>
                </div>

                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['analogy']">

                    <h3 class="">Analogy</h3>
                    <p v-linkified>{{this.$store.state.currentCard["analogy"]}}</p>
                </div>

                <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['FlowerPower']">

                    <h3 class="flowerPower">Flower Power</h3>
                    <p v-linkified>{{this.$store.state.currentCard["FlowerPower"]}}</p>
                </div>

                <!-- <div class="content-item border p-3 mb-3" v-if="this.$store.state.currentCard['Related']">
                    <h3 class="related">Related</h3>
                    <p>
                        <span v-for="item in this.$store.state.currentCard['Related']" v-bind:key="item" @click="$store.commit('showCardIntroFromURL', item)">
                            <router-link :to="'/card/' + item">{{ item }}</router-link>
                        </span>
                    </p>
                </div> -->
                <RelatedCards />
                <button class="md-close mt-5 btn btn-primary text-right" @click="$store.commit('hideModal')">Close</button>
                <div class="center m-4 mb-0 p-3 " style="border-top: 1px dashed #eee;">
                    <p><a class="btn btn-primary mr-2" style="border: none; background: #373E65;" target="_blank" rel="noopener" href="https://web.telegram.org/#/im?p=@bcbird">Comment in our Telegram group</a></p>
                </div>

                <Person3 />
            </div>
        </div>
        <div class="bottom-bar">
            <div>
                <div style="display: inline-block;">
                    <SocialMedia />
                </div>
                <button class="copyURLtoClipboard copyURLtoClipboard3 " style="display: inline-block;vertical-align: middle;margin-left: 1em !important;" title="Copy Link">Copy Link</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Quiz from "@/components/Quiz.vue";
import Video from "@/components/Video.vue";
import SocialMedia from "@/components/SocialMedia.vue";
import RelatedCards from "@/components/RelatedCards.vue";
import Person3 from "@/components/AnimatedCharacters/Person3.vue";
import {
    disableBodyScrollMixin
} from "./mixins/disableBodyScroll";

export default {
    name: "CardFull",
    mixins: [disableBodyScrollMixin],
    components: {
        Quiz,
        Video,
        SocialMedia,
        RelatedCards,
        Person3
    },
    computed: {
        getPrejudice: function () {
            return this.$store.state.currentCard.Prejudice;
        }
    },
    watch: {
        getPrejudice(newValue, oldValue) {
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
    background: linear-gradient(#0745A8, #015DF4);
    color: #eee;
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

    .md-close .cross {
        display: block;
    }

    .md-close .back-sign,
    .md-close .back-text {
        display: none;
    }
}

// END TERTIARY MENU

.misconception-short-and-elaborate {
    margin: 3em 0 1em; // to keep distance from sec / tert menu
    padding: 1em 0;
    border-top: 3px dotted #666;
    border-bottom: 3px dotted #666;
}

.content-item {
    background: #eee;
    color: #0B364D;
    border-radius: 10px;
}

.content-item>p {
    margin-left: $cardFullTextIndent;
}

// .content-item a {
//     color: $cardFullBlockLink;
//     background: $cardFullBlockBackground;

// }

.modal-content {
    // background: $cardFullBackground;
    background: #2F3558;
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

.modal-content h3.counterQuestion {
    // background-image: url(../assets/img/animated-gif/insects15.gif);
    background-image: url(../assets/img/icons/jv-creative/counter-questions.svg);
}

.modal-content h3.related {
    background-image: url(../assets/img/logo/blockchainbird-logo.png);
}

.modal-content h3.libbitcoin {
    background-image: url(../assets/img/logo/libbitcoin.png);
}

.modal-content a.modalbox-iconbackground {
    text-decoration: underline;
}

.md-modal * {
    text-align: left;
}

// /* Content styles */
.md-content {
    box-shadow: 0px 0px 37px 0px rgba(0, 0, 0, 0.75);

}

.md-content button {
    display: block;
    margin: 0 auto;
    font-size: 1em;
}

.bottom-bar {
    margin-bottom: 1em; // to make the bottom bar fully visible
    background: linear-gradient(to right, #5C34A7, #2376D6);
}
</style>
