<template>
<div style="animation-duration: 1000s;" class="news-ticker">
    <p>
        <img style="height: 50px;margin-left:500px" src="../assets/img/animated-gif/mens18.gif" alt=""><span style="margin-right: 3000px;">“Bitcoin is for criminals”</span>
        <img style="height: 50px; transform: scaleX(-1);" src="../assets/img/animated-gif/mens71.gif" alt=""><span style="margin-right: 3000px;">“Bitcoin is one big money laundering machine.”</span>
        <img style="height: 50px; transform: scaleX(-1);" src="../assets/img/animated-gif/mens09.gif" alt=""><span style="margin-right: 3000px;">“There are only 21 million bitcoins.”</span>
        <img style="height: 50px;" src="../assets/img/animated-gif/c13.gif" alt=""><span style="margin-right: 3000px;">“Quantum computers will destroy Bitcoin.”</span>
        <img style="height: 50px;" src="../assets/img/animated-gif/webpeople-tweety.gif" alt=""><span style="margin-right: 3000px;">“Bitcoin is a new tulip mania.”</span>
        <img style="height: 50px;" src="../assets/img/animated-gif/mens41.gif" alt=""><span style="margin-right: 3000px;">“Bitcoin has been hacked many times.”</span>
        <img style="height: 50px;" src="../assets/img/animated-gif/birds11.gif" alt=""><span style="margin-right: 3000px;">“Bitcoin is a ponzi scheme.”</span>
    </p>
</div>
</template>

<script>
export default {
    name: "NewsTicker"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/*
 *  BEGIN NEWS TICKER
 */
.news-ticker {
    position: fixed;
    bottom: 0;
    right: 0;
    /*om te overrulen, als je hem buiten de div plaatst, zodat het een section > div is*/
    // left: auto;
    /*om te overrulen, als je hem buiten de div plaatst, zodat het een section > div is*/
    padding: 0;
    /*om te overrulen, als je hem buiten de div plaatst, zodat het een section > div is*/
    margin: 0;
    height: auto !important;
    transform: translateX(100%);
    /* default speed, override via inline style, depending on text length */
    animation-duration: 25s;
    animation-timing-function: linear;
    animation-iteration-count: 30;
    pointer-events: none;
    visibility: visible;
    opacity: 1;
}

/*main .present .news-ticker, */
/*alleen als slide actief is, loopt de animatie*/
.news-ticker {
    /*deze is voor als ie niet binnen de main staat en dus altijd te zien is*/
    animation-name: news-ticker;
}

.news-ticker p {
    white-space: nowrap;
    margin: 0 1em;
}

.news-ticker img {
    vertical-align: baseline;
}

@keyframes news-ticker {
    0% {
        right: 0;
        transform: translateX(100%);
    }

    100% {
        right: 100%;
        transform: translateX(0);
    }
}

.news-ticker p {
    line-height: 1;
}

@media only screen and (max-width: 961px) {
    .news-ticker p {
        line-height: 1;
    }
}

/*
 *  EIND NEWS TICKER
 */
</style>
