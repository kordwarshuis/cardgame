<template>
<div class="game-instructions-container">
    <p class='visuallyhidden animate__slower animate__animated'><span>1</span> Find A Tweet</p>
    <p class='visuallyhidden animate__slower animate__animated'><span>2</span> Find A Card</p>
    <p class='visuallyhidden animate__slower animate__animated'><span>3</span> Reply With Card</p>
</div>
</template>

<script>
import animated from 'animate.css';
export default {
    name: "GameInstructionsCarousel",
    mounted() {
        this.animate();
    },
    methods: {
        animate() {
            var speed = 5000;
            var animationLength = 2000;
            // var animationName = 'backInLeft';
            var animationName = 'fadeIn';
            var texts = document.querySelectorAll('.game-instructions-container p');
            var i = 0;
            setInterval(function () {
                if (i > texts.length - 1) i = 0;
                texts[i].classList.remove('visuallyhidden');
                texts[i].classList.add('animate__' + animationName);

                (function (i) {
                    setTimeout(function () {
                        texts[i].classList.remove('animate__' + animationName);
                    }, animationLength);

                    setTimeout(function () {
                        texts[i].classList.add('visuallyhidden');
                    }, speed);
                }(i))

                i++;
            }, speed);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
span {
    background: #1D5C81;
    border-radius: 50%;
    display: inline-block;
    width: 2em;
    height: 2em;
    line-height: 1;
    padding: 0.6em;
    text-align: center;
}

.game-instructions-container,
.game-instructions-container p {
    font-size: inherit;
    display: block;
    text-align: center;
    line-height: 2.5em;
    height: 2.5em;
}

/* Medium devices (tablets, 768px and up) The navbar toggle appears at this breakpoint */
@media (min-width: 768px) {

    .game-instructions-container,
    .game-instructions-container p {
        display: inline;
        text-align: left;
    }
}
</style>
