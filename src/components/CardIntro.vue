<template>
<!-- open/close -->
<div class="row pr-0 pl-0 pt-0 pb-0 mr-0 ml-0 mt-0 mb-0 overlay-fullscreen overlay-fullscreen-contentpush" :class="this.$store.state.cssClassCardIntroState">
    <div class="col-lg-6 col-sm-6 pr-0 pl-0 pt-0 pb-0 mr-0 ml-0 mt-0 mb-0">
        <div style="border: none;" class="card h-100 bg-transparent pr-0 pl-0 pt-0 pb-0 mr-0 ml-0 mt-0 mb-0">
            <div class="card-body title-on-card center pr-0 pl-0 pt-0 pb-0 mr-1 ml-1 mt-5 mb-5">
                <h2 class="ml-5">{{ this.$store.state.currentCard.Prejudice }}</h2>
            </div>
        </div>
    </div>

    <div class="col-lg-6 col-sm-6 pr-0 pl-0 pt-0 pb-0 mr-0 ml-0 mt-0 mb-0">
        <div class="card h-100 pr-0 pl-0 pt-0 pb-0 mr-0 ml-0 mt-0 mb-0">
            <div class="card-body">
                <h3 class="">
                    Answer
                </h3>
                <p>{{ this.$store.state.currentCard["Prejudice Elaborate"] }} …<a data-modal='modal-1' class='md-trigger further-reading' @click="showCardFull">+</a></p>
                <button class="closeCardIntro">All cards</button>
                <button class="copyURLtoClipboard copyURLtoClipboard3">Copy Link</button>
                <button type="button" class="overlay-fullscreen-close">Close</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "CardIntro",
    mounted: function () {
        this.handleCardIntro();
        // textFit(document.getElementsByClassName("title-on-card"), {
        // 	alignVert: true,
        // 	multiLine: true
        // });
    },

    methods: {
        // hideCardIntro() {
        //     this.$store.commit("changeCssClassCardIntroState", "");
        // },
        handleCardIntro() {
            var that = this;
            var container = document.querySelector('div.container'),
                triggerBttn = document.getElementById('trigger-overlay-fullscreen'),
                overlayFullscreen = document.querySelector('div.overlay-fullscreen'),
                closeBttn = document.querySelector('button.overlay-fullscreen-close'),
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
                if (overlayFullscreen.classList.contains('open')) {
                    // overlayFullscreen.classList.remove('open');
                    // container.classList.remove('overlay-fullscreen-open');
                    overlayFullscreen.classList.add('close');

                    that.$store.commit("changeCssClassCardIntroState", "");
                    that.$store.commit("changeCssClassCardOverviewState", "");
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
            //TODO: why is this working, should mutations be used?
            this.$store.state.cssClassCardFullState = " md-show";
            // this.$store.commit("changeCssClassCardIntroState", " md-show");
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
// https://tympanus.net/Development/FullscreenOverlayStyles/index7.html#
/* Overlay style */
.overlay-fullscreen {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: $overlayItemBackground2;
    padding: 3em;
}

.overlay-fullscreen>div {
    // height: 100%;
    overflow: scroll;
}

/* Overlay closing cross */
.overlay-fullscreen .overlay-fullscreen-close {
    cursor: pointer;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 5px;
    top: 5px;
    overflow: hidden;
    border: none;
    background: url(../assets/img/icons/ui/cross-black.png) no-repeat center center;
    text-indent: 200%;
    color: transparent;
    outline: none;
    z-index: 100;
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

.container {
    overflow-x: hidden;
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
}

.container.overlay-fullscreen-open {
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
}

.container::after {
    content: '';
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    -webkit-transition: opacity 0.5s, visibility 0s 0.5s;
    transition: opacity 0.5s, visibility 0s 0.5s;
}

.container.overlay-fullscreen-open::after {
    visibility: visible;
    opacity: 1;
    -webkit-transition: opacity 0.5s;
    transition: opacity 0.5s;
}

.overlay-fullscreen-contentpush {
    background: $overlayItemBackground2;
    visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    -webkit-transition: -webkit-transform 0.5s, visibility 0s 0.5s;
    transition: transform 0.5s, visibility 0s 0.5s;
}

.overlay-fullscreen-contentpush.open {
    visibility: visible;
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
}

.title-on-card {
    margin: 0 1em 0 0;
    padding: 1em;
    padding-left: 5em;
    // font-size: 1.7em;
    // font-size: calc(1vw + 1vh + .5vmin);

    background: transparent url(../assets/img/trivial-pursuit/TrivialPursuit2.png) no-repeat top center !important;
    // background-size: 100% auto;
    background-size: contain !important;
}

.title-on-card h2 {
    font-size: 6vw;
    margin: 0;
    padding: 0;

}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
    .title-on-card h2 {
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
</style>
