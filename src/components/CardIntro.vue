<template>
<!-- open/close -->
<div class="row pr-0 pl-0 pt-0 pb-0 mr-0 ml-0 mt-0 mb-0 overlay-fullscreen overlay-fullscreen-contentpush" :class="this.$store.state.cssClassCardIntroState">
    <div class="col-lg-6 col-sm-6 pr-0 pl-0 pt-0 pb-0 mr-0 ml-0 mt-0 mb-0">
        <div class="card h-100 bg-transparent pr-0 pl-0 pt-0 pb-0 mr-0 ml-0 mt-0 mb-0">
            <div class="card-body title-on-card center">
                <h2 class="">{{ this.$store.state.currentCard.Prejudice }}</h2>
            </div>
        </div>
    </div>

    <div class="col-lg-6 col-sm-6 pr-0 pl-0 pt-0 pb-0 mr-0 ml-0 mt-0 mb-0">
        <div class="card h-100 bg-transparent pr-0 pl-0 pt-0 pb-0 mr-0 ml-0 mt-0 mb-0">
            <div class="card-body">
                <h3 class="">
                    Answer
                </h3>
                <p>{{ this.$store.state.currentCard["Prejudice Elaborate"] }} …<a data-modal='modal-1' class='md-trigger further-reading' @click="showCardFull">+</a></p>
                <button class="closeCardIntro">All cards</button>
                <button class="copyURLtoClipboard copyURLtoClipboard3">Copy Link</button>
                <!-- <button type="button" class="overlay-fullscreen-close">Close</button> -->
            </div>
        </div>
    </div>
<a type="button" class="overlay-fullscreen-close">×</a>
</div>
</template>

<script>
export default {
    name: "CardIntro",
    mounted: function () {
        this.handleCardIntro();
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
    background: $overlayItemBackground;
    padding: 3em;
}

.overlay-fullscreen>div {
    // height: 100%;
    overflow: scroll;
}

/* Overlay closing cross */
.overlay-fullscreen .overlay-fullscreen-close {
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    display: block;
    font-size: 2.5em;
    line-height: 0.6;
    padding: 0;
}

// de read more / plus sign on the intro card
a.md-trigger {
    border: 3px solid $borderMenuItemsAndButtons;
    background: $background;
    color: $linksText;
    border-radius: 50%;
    padding: 0.15em 0.2em 0.25em;
    margin: 0;
    line-height: 0.58;
    font-size: 2em;
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

.overlay-fullscreen-contentpush {
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

.card {
    border: none;
}

.title-on-card {
    margin: 10% 10% 0 10% !important;
    padding: 3% 5% 0 16%;
    background: transparent url(../assets/img/trivial-pursuit/TrivialPursuit2.png) no-repeat top center !important;
    // background-size: 100% auto;
    background-size: contain !important;
    color: $textOnCard;

    // https://stackoverflow.com/a/48830291
    overflow-wrap: break-word;
    word-wrap: break-word;
    -ms-word-break: break-all;
    word-break: break-word;
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;

}

.title-on-card h2 {
    font-size: 6vw;
    margin: 0;
    padding: 0;
    text-align: left;
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
