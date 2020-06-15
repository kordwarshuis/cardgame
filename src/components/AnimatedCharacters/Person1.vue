<template>
<div id='wrap1'>
    <div class='body'>
        <div class='head'>
            <div class='hair'></div>
            <div class='face'>
                <div class='eyes'></div>
                <div class='mouth'></div>
            </div>
        </div>
        <div class='arm'>
            <div class='lower'></div>
        </div>
        <div class='leg'>
            <div class='lower'>
                <div class='foot'></div>
            </div>
        </div>
        <div class='leg right'>
            <div class='lower'>
                <div class='foot'></div>
            </div>
        </div>
        <div class='arm'>
            <div class='lower'></div>
        </div>
        <div class='leg'>
            <div class='lower'>
                <div class='foot'></div>
            </div>
        </div>
        <div class='leg right'>
            <div class='lower'>
                <div class='foot'></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "Person1"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/*! https://codepen.io/cobra_winfrey/pen/oPXRrQ */
$p: #fcdab7;
$w: #fff;
$b: #8ba9ca;
$r: #c43720;
$y: #fadc0b;
$bl: rgba(0, 0, 0, 0.5);

// display: none turns animation off
#wrap1 {
    display: none;
}

.person1 {
    //     width: 100%;
    //     height: 100vh;
    //     overflow: hidden;
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     background: #333;

    #wrap1 {
        display: block;
        width: 350px;
        height: 600px;
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0%) scale(0.65);
        // transform: scale(0.65);
        z-index: 2001;
        pointer-events: none;

        &:before {
            content: '';
            position: absolute;
            bottom: -40px;
            height: 60px;
            width: 200px;
            left: calc(50% - 100px);
            background: $bl;
            border-radius: 100%;
            filter: blur(15px);
            opacity: 0.25;
        }

        .body {
            width: 100px;
            height: 200px;
            position: absolute;
            left: calc(50% - 50px);
            top: 125px;
            box-shadow: none;
            background: transparent;

            &:after {
                content: '';
                position: absolute;
                bottom: 0px;
                left: 0px;
                width: 60px;
                background: $b;
                height: 60px;
                z-index: -1;
                border-radius: 100px;
                box-shadow: 30px 0 0 $b;
                animation: sway3 0.375s ease-in-out infinite alternate;
                transform-origin: 150px 0%;

                @keyframes sway3 {
                    from {
                        transform: translateX(-10px);
                        box-shadow: inset 10px 0 0 darken($b, 5%), 30px 0 0 $b, 40px 0 0 darken($b, 5%);
                    }

                    to {
                        transform: translateX(10px);
                        box-shadow: inset -10px 0 0 darken($b, 5%), 30px 0 0 $b, 40px 0 0 darken($b, 5%);
                    }
                }
            }

            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 1350px 1500px 1350px 1500px / 2000px 2000px 1300px 1300px;
                top: 0;
                left: 0;
                background: radial-gradient(circle at top, $w 80%, $b 80%);
                animation: sway 0.375s ease-in-out infinite alternate;
                transform-origin: 50% 25%;

                @keyframes sway {
                    from {
                        transform: rotate(5deg);
                    }

                    to {
                        transform: rotate(-5deg);
                    }
                }
            }

            .head {
                position: absolute;
                width: 70px;
                height: 80px;
                border-radius: 200px;
                left: calc(50% - 35px);
                top: -80px;
                z-index: 9999;
                background: transparent;

                .hair {
                    animation: bounce 0.375s ease-in-out infinite alternate;
                    position: absolute;
                    width: calc(100% + 5px);
                    height: 50px;
                    z-index: 9;
                    top: -10px;
                    left: -5px;
                    border-radius: 100px 100px 0 0;
                    overflow: hidden;

                    &:before {
                        content: '';
                        position: absolute;
                        width: 50px;
                        height: 50px;
                        background: darken($y, 2.5%);
                        right: -30px;
                        border-radius: 0 200px 200px 200px;
                        top: -5px;
                        animation: bounce2 0.375s ease-in-out infinite alternate;
                    }

                    &:after {
                        content: '';
                        position: absolute;
                        width: 80px;
                        height: 50px;
                        background: $y;
                        left: -20px;
                        border-radius: 200px 0 400px 200px / 200px 0 300px 200px;
                        top: 0;
                        animation: bounce2 0.375s ease-in-out infinite alternate;
                    }
                }

                .face {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    animation: bounce 0.375s ease-in-out infinite alternate;
                    z-index: 9;

                    .mouth {
                        position: absolute;
                        width: 15px;
                        height: 15px;
                        bottom: 12.5px;
                        left: calc(50% - 7.5px);
                        border-radius: 100%;
                        border: 2px solid $bl;
                        border-color: transparent transparent #222 transparent;
                        animation: bounce2 0.375s ease-in-out infinite alternate;
                    }

                    .eyes {
                        position: absolute;
                        width: 7px;
                        height: 2.5px;
                        background: $bl;
                        border-radius: 5px;
                        left: 20px;
                        top: 45px;
                        box-shadow: 25px 0 0 $bl;
                        z-index: 9;
                        animation: bounce2 0.375s ease-in-out infinite alternate;

                        @keyframes bounce2 {
                            from {
                                transform: translateX(15px);
                            }

                            to {
                                transform: translateX(-15px);
                            }
                        }

                        &:before {
                            content: '';
                            position: absolute;
                            width: 10px;
                            height: 20px;
                            background: darken($p, 10%);
                            left: 10px;
                            top: -5px;
                            border-radius: 500px;
                        }
                    }
                }

                &:before {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    z-index: 9;
                    border-radius: 200px;
                    animation: bounce 0.375s ease-in-out infinite alternate;

                    @keyframes bounce {
                        from {
                            transform: translateY(5px);
                        }

                        to {
                            transform: translateY(-5px);
                        }
                    }

                    background:$p;
                }

                &:after {
                    content: '';
                    position: absolute;
                    width: 40%;
                    height: 30px;
                    bottom: -15px;
                    left: 30%;
                    z-index: -1;
                    border-radius: 10px;
                    background: darken($p, 5%);
                }
            }

            .arm {
                position: absolute;
                height: 110px;
                width: 25px;
                left: -10px;
                top: 15px;
                border-radius: 650px 450px 500px 500px / 1600px 450px 1500px 1500px;
                transform-origin: 150% 20%;
                animation: swing 3s ease-in-out infinite;
                z-index: 999;
                background: radial-gradient(circle at top, $w 40%, $p 20%);

                &:before {
                    content: '';
                    position: absolute;
                    width: 60px;
                    height: 50px;
                    background: $w;
                    left: 0;
                    border-radius: 50px;
                    top: -10px;
                }

                @keyframes swing {
                    0% {
                        transform: rotate(-45deg);
                        z-index: 999;
                        filter: brightness(1);
                    }

                    12.5% {
                        transform: rotate(45deg);
                        z-index: 999;
                        filter: brightness(1);
                    }

                    25% {
                        transform: rotate(-45deg);
                        z-index: 999;
                        filter: brightness(1);
                    }

                    37.5% {
                        transform: rotate(45deg);
                        z-index: 999;
                        filter: brightness(1);
                    }

                    50% {
                        transform: rotate(-45deg);
                        z-index: -999;
                        filter: brightness(0.95);
                    }

                    62.5% {
                        transform: rotate(45deg);
                        z-index: -999;
                        filter: brightness(0.95);
                    }

                    75% {
                        transform: rotate(-45deg);
                        z-index: -999;
                        filter: brightness(0.95);
                    }

                    87.5% {
                        transform: rotate(45deg);
                        z-index: -999;
                        filter: brightness(0.95);
                    }

                    100% {
                        transform: rotate(-45deg);
                        z-index: 999;
                        filter: brightness(1);
                    }
                }

                .lower {
                    content: '';
                    position: absolute;
                    width: 80%;
                    height: 90%;
                    bottom: -80%;
                    border-radius: inherit;
                    left: 0;
                    transform-origin: top;
                    animation: sway2 0.375s ease-in-out infinite alternate;
                    background: $p;

                    @keyframes sway2 {
                        from {
                            transform: rotate(-10deg);
                        }

                        to {
                            transform: rotate(10deg);
                        }
                    }

                    &:before {
                        content: '';
                        position: absolute;
                        bottom: -15px;
                        left: calc(50% - 12.5px);
                        width: 25px;
                        height: 35px;
                        border-radius: 100px;
                        transform-origin: top;
                        background: $p;
                    }
                }

                &:nth-of-type(2) {
                    left: auto;
                    right: -10px;
                    border-radius: 450px 650px 500px 500px / 450px 1600px 1500px 1500px;
                    transform-origin: -50% 20%;
                    animation-delay: -1.5s;

                    .lower {
                        left: auto;
                        right: 0;
                    }

                    &:before {
                        left: auto;
                        right: 0px;
                    }
                }
            }

            .leg {
                position: absolute;
                height: 150px;
                width: 35px;
                left: 05px;
                bottom: -120px;
                border-radius: 300px 0px 500px 500px / 1600px 450px 1500px 1500px;
                transform-origin: 100% 0%;
                animation: lift 0.375s ease-in-out infinite alternate;
                background: $b;

                &:before {
                    content: '';
                    position: absolute;
                    width: 30px;
                    height: 35px;
                    bottom: 0px;
                    left: -2.5px;
                    background: $b;
                    border-radius: 100%;
                }

                @keyframes lift {
                    0% {
                        transform: rotate(-5deg);
                    }

                    100% {
                        transform: rotate(5deg);
                    }
                }

                .lower {
                    content: '';
                    position: absolute;
                    width: 80%;
                    height: 90%;
                    bottom: -80%;
                    border-radius: inherit;
                    left: 0px;
                    transform-origin: 50% 0%;
                    animation: lift2 0.375s ease-in-out infinite alternate;
                    z-index: -1;

                    &:before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background: $b;
                        clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
                        border-radius: inherit;
                    }

                    &:after {
                        content: '';
                        position: absolute;
                        bottom: 0;
                        left: 5%;
                        width: 90%;
                        background: darken($b, 5%);
                        height: 17.5px;
                        border-radius: 5px;
                    }

                    @keyframes lift2 {
                        0% {
                            transform: rotate(10deg);
                        }

                        100% {
                            transform: rotate(-10deg);
                        }
                    }

                    .foot {
                        content: '';
                        position: absolute;
                        bottom: -15px;
                        right: 0px;
                        width: 70px;
                        height: 25px;
                        border-radius: 30px;
                        transform-origin: top right;
                        border-radius: 2000px 50px 250px 390px / 500px 280px 290px 500px;
                        animation: lift3 0.375s ease-in-out infinite alternate;
                        background: linear-gradient(to bottom, $r 20px, $w 20px);
                        z-index: -1;

                        @keyframes lift3 {
                            0% {
                                transform: rotate(-5deg) translateY(0px);
                            }

                            100% {
                                transform: rotate(5deg) translateY(5px);
                            }
                        }
                    }
                }

                &.right {
                    left: auto;
                    right: 5px;
                    border-radius: 0px 300px 500px 500px / 450px 1600px 1500px 1500px;
                    transform-origin: 0% 0%;

                    &:before {
                        left: auto;
                        right: -2.5px;
                    }

                    .lower {
                        left: auto;
                        right: 0;

                        .foot {
                            transform-origin: top left;
                            left: 0px;
                            right: auto;
                            border-radius: 50px 2000px 250px 390px / 290px 500px 280px 500px;
                            animation: lift4 0.375s ease-in-out infinite alternate;

                            @keyframes lift4 {
                                0% {
                                    transform: rotate(-5deg) translateY(5px);
                                }

                                100% {
                                    transform: rotate(5deg) translateY(0px);
                                }
                            }
                        }
                    }

                }
            }
        }
    }
}
</style>
