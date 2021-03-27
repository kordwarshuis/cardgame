<template>
<div class="typewriter-container" style="">
    <div class="typewriter ">
        <div class="slide"><i></i></div>
        <div class="paper"></div>
        <div class="keyboard"></div>
    </div>
    <p class="typewriter-message">Important tweets incoming</p>
</div>
</template>

<script>
export default {
    name: "Typewriter",
    mounted() {
        window.cardgameEvent.$on('startTypewriter', (item, response) => {
                this.startTypewriter();
            }),
            window.cardgameEvent.$on('stopTypewriter', (item, response) => {
                this.stopTypewriter();
            }),
            window.cardgameEvent.$on('startStopTypewriter', (item, response) => {
                var that = this;
                this.startTypewriter();
                setTimeout(function () {
                    that.stopTypewriter();
                }, 3000);
            })
    },
    methods: {
        startTypewriter() {
            document.querySelector('.typewriter-container').classList.remove('bounceOutRight');
            document.querySelector('.typewriter-container').classList.add('bounceInRight');
            document.querySelector('.typewriter').classList.add('start');
            if (localStorage.getItem("soundOn") === "true") {
                setTimeout(function () {
                    typewriter.play();
                }, 1000);
            }
        },
        stopTypewriter() {
            document.querySelector('.typewriter-container').classList.remove('bounceInRight');
            document.querySelector('.typewriter-container').classList.add('bounceOutRight');
            document.querySelector('.typewriter').classList.remove('start');
            if (localStorage.getItem("soundOn") === "true") {
                typewriter.stop();
            }
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.typewriter-container {
    position: absolute;
    top: calc(50% - 50px);
    left: -200px;
    transform: translate3d(3000px, 0, 0) scaleX(3); // same as in the bounceInRight keyframe animation
    display: none;
    width: 100px;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {
    .typewriter-container {
        display: block;
    }
}

.typewriter-message {
    margin-top: 0.5em;
    font-size: 0.8em;
    ;
    text-align: center;
    background: yellow;
}

// https://codepen.io/aaroniker/pen/XWWPbep

@mixin keyboard($position: 0, $value: 0) {
    $keys: map-merge((0: '0', 1: '0', 2: '0', 3: '0', 4: '0', 5: '0', 6: '10px', 7: '10px', 8: '10px', 9: '10px'), ($position: $value));
    box-shadow: 15px #{map-get($keys, 0)} 0 var(--key),
    30px #{map-get($keys, 1)} 0 var(--key),
    45px #{map-get($keys, 2)} 0 var(--key),
    60px #{map-get($keys, 3)} 0 var(--key),
    75px #{map-get($keys, 4)} 0 var(--key),
    90px #{map-get($keys, 5)} 0 var(--key),
    22px #{map-get($keys, 6)} 0 var(--key),
    37px #{map-get($keys, 7)} 0 var(--key),
    52px #{map-get($keys, 8)} 0 var(--key),
    60px #{map-get($keys, 8)} 0 var(--key),
    68px #{map-get($keys, 8)} 0 var(--key),
    83px #{map-get($keys, 9)} 0 var(--key);
}

// add class .start to start animation
.typewriter.start {
    animation: bounce var(--duration) linear infinite;
}

.typewriter.start .slide {
    animation: slide var(--duration) ease infinite;
}

.typewriter.start .paper {
    animation: paper var(--duration) linear infinite;
}

.typewriter.start .keyboard {
    &:after {
        animation: keyboard var(--duration) linear infinite;
    }
}

.typewriter {
    --blue: #40b1f7;
    --blue-dark: #1CA1F2;
    --key: #fff;
    --paper: #EEF0FD;
    --text: #D3D4EC;
    --tool: #FBC56C;
    --duration: 3s;
    position: relative;

    .slide {
        width: 92px;
        height: 20px;
        border-radius: 3px;
        margin-left: 14px;
        transform: translateX(14px);
        background: linear-gradient(var(--blue), var(--blue-dark));

        &:before,
        &:after,
        i:before {
            content: '';
            position: absolute;
            background: var(--tool);
        }

        &:before {
            width: 2px;
            height: 8px;
            top: 6px;
            left: 100%;
        }

        &:after {
            left: 94px;
            top: 3px;
            height: 14px;
            width: 6px;
            border-radius: 3px;
        }

        i {
            display: block;
            position: absolute;
            right: 100%;
            width: 6px;
            height: 4px;
            top: 4px;
            background: var(--tool);

            &:before {
                right: 100%;
                top: -2px;
                width: 4px;
                border-radius: 2px;
                height: 14px;
            }
        }
    }

    .paper {
        position: absolute;
        left: 24px;
        top: -26px;
        width: 40px;
        height: 46px;
        border-radius: 5px;
        background: var(--paper);
        transform: translateY(46px);

        &:before {
            content: '';
            position: absolute;
            left: 6px;
            right: 6px;
            top: 7px;
            border-radius: 2px;
            height: 4px;
            transform: scaleY(.8);
            background: var(--text);
            box-shadow: 0 12px 0 var(--text), 0 24px 0 var(--text), 0 36px 0 var(--text);
        }
    }

    .keyboard {
        width: 120px;
        height: 56px;
        margin-top: -10px;
        z-index: 1;
        position: relative;

        &:before,
        &:after {
            content: '';
            position: absolute;
        }

        &:before {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border-radius: 7px;
            background: linear-gradient(135deg, var(--blue), var(--blue-dark));
            transform: perspective(10px) rotateX(2deg);
            transform-origin: 50% 100%;
        }

        &:after {
            left: 2px;
            top: 25px;
            width: 11px;
            height: 4px;
            border-radius: 2px;
            @include keyboard;
        }
    }
}

@keyframes bounce {

    85%,
    92%,
    100% {
        transform: translateY(0);
    }

    89% {
        transform: translateY(-4px);
    }

    95% {
        transform: translateY(2px);
    }
}

@keyframes slide {
    5% {
        transform: translateX(14px);
    }

    15%,
    30% {
        transform: translateX(6px);
    }

    40%,
    55% {
        transform: translateX(0);
    }

    65%,
    70% {
        transform: translateX(-4px);
    }

    80%,
    89% {
        transform: translateX(-12px);
    }

    100% {
        transform: translateX(14px);
    }
}

@keyframes paper {
    5% {
        transform: translateY(46px);
    }

    20%,
    30% {
        transform: translateY(34px);
    }

    40%,
    55% {
        transform: translateY(22px);
    }

    65%,
    70% {
        transform: translateY(10px);
    }

    80%,
    85% {
        transform: translateY(0);
    }

    92%,
    100% {
        transform: translateY(46px);
    }
}

@keyframes keyboard {

    5%,
    12%,
    21%,
    30%,
    39%,
    48%,
    57%,
    66%,
    75%,
    84% {
        @include keyboard;
    }

    9% {
        @include keyboard(0, 2px);
    }

    18% {
        @include keyboard(3, 2px);
    }

    27% {
        @include keyboard(6, 12px);
    }

    36% {
        @include keyboard(8, 12px);
    }

    45% {
        @include keyboard(5, 2px);
    }

    54% {
        @include keyboard(1, 2px);
    }

    63% {
        @include keyboard(9, 12px);
    }

    72% {
        @include keyboard(2, 2px);
    }

    81% {
        @include keyboard(7, 12px);
    }
}

// from: https://animate.style
.bounceInRight {
    animation-name: bounceInRight;
    animation-duration: 1s;
    animation-fill-mode: both;
}

@keyframes bounceInRight {

    from,
    60%,
    75%,
    90%,
    to {
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    from {
        transform: translate3d(3000px, 0, 0);
    }

    60% {
        transform: translate3d(-25px, 0, 0);
    }

    75% {
        transform: translate3d(10px, 0, 0);
    }

    90% {
        transform: translate3d(-5px, 0, 0);
    }

    to {
        transform: translate3d(0, 0, 0);
    }
}

.bounceOutRight {
    animation-name: bounceOutRight;
    animation-duration: 1s;
    animation-fill-mode: both;
}

@keyframes bounceOutRight {
    from {
        transform: translate3d(0, 0, 0);
    }

    20% {
        transform: translate3d(-20px, 0, 0);
    }

    to {
        transform: translate3d(2000px, 0, 0);
    }
}
</style>
