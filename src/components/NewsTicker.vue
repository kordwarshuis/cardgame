<template>
<div style="animation-duration: 1000s;" class="news-ticker-container" v-html="content"></div>
</template>

<script>
export default {
    name: "NewsTicker",
    data: function () {
        return {
            content: ""
        }
    },
    mounted() {
        this.getContent();
    },
    methods: {
        getContent() {
            return axios.get(process.env.VUE_APP_NEWSTICKER_SOURCE)
                .then(response => {
                    this.content = response.data;
                }).catch(function (error) {
                    console.log("We have a problem: " + error);
                });
        }
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.news-ticker-container .news-ticker {
    display: none;
}

.btc .news-ticker-container .news-ticker-btc,
.bcb .news-ticker-container .news-ticker-bcb,
.ssi .news-ticker-container .news-ticker-ssi {
    display: block;
}

/*
 *  BEGIN NEWS TICKER
 */
.news-ticker-container {
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

/*main .present .news-ticker-container, */
/*alleen als slide actief is, loopt de animatie*/
.news-ticker-container {
    /*deze is voor als ie niet binnen de main staat en dus altijd te zien is*/
    animation-name: news-ticker;
}

.news-ticker-container p {
    white-space: nowrap;
    margin: 0 1em;
}

.news-ticker-container p span {
    background: linear-gradient(to right, #5C34A7, #2376D6);
    color: #eee;
    padding: 0 2em;
}

.news-ticker-container img {
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

.news-ticker-container p {
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
