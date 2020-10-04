<template>
<div>
    
    <div>
<p style="float: left;margin-top: 0.4em;">Share:</p>
        <!-- Sharingbutton Facebook -->
        <a class="resp-sharing-button__link" :href="'https://facebook.com/sharer/sharer.php?u=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL']" target="_blank" rel="noopener" aria-label="">
            <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--small">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11.5" />
                        <path d="M15.84 9.5H13.5V8.48c0-.53.35-.65.6-.65h1.4v-2.3h-2.35c-2.3 0-2.65 1.7-2.65 2.8V9.5h-2v2h2v7h3v-7h2.1l.24-2z" /></svg>
                </div>
            </div>
        </a>

        <!-- Sharingbutton Twitter -->
        <a class="resp-sharing-button__link" :href="'https://twitter.com/intent/tweet/?text=' + this.$store.state.currentCard.Prejudice + '&amp;url=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL']" target="_blank" rel="noopener" aria-label="">
            <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--small">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M18.5 7.4l-2 .2c-.4-.5-1-.8-2-.8C13.3 6.8 12 8 12 9.4v.6c-2 0-4-1-5.4-2.7-.2.4-.3.8-.3 1.3 0 1 .4 1.7 1.2 2.2-.5 0-1 0-1.2-.3 0 1.3 1 2.3 2 2.6-.3.4-.7.4-1 0 .2 1.4 1.2 2 2.3 2-1 1-2.5 1.4-4 1 1.3 1 2.7 1.4 4.2 1.4 4.8 0 7.5-4 7.5-7.5v-.4c.5-.4.8-1.5 1.2-2z" />
                        <circle cx="12" cy="12" r="11.5" /></svg>
                </div>
            </div>
        </a>

        <!-- Sharingbutton E-Mail -->
        <a class="resp-sharing-button__link" :href="'mailto:?subject=' + this.$store.state.currentCard.Prejudice + '&amp;body=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL']" target="_self" rel="noopener" aria-label="">
            <div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--small">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19.5 16c0 .8-.7 1.5-1.5 1.5H6c-.8 0-1.5-.7-1.5-1.5V8c0-.8.7-1.5 1.5-1.5h12c.8 0 1.5.7 1.5 1.5v8zm-2-7.5L12 13 6.5 8.5m11 6l-4-2.5m-7 2.5l4-2.5" />
                        <circle cx="12" cy="12" r="11.5" /></svg>
                </div>
            </div>
        </a>

        <!-- Sharingbutton Pinterest -->
        <a class="resp-sharing-button__link" :href="'https://pinterest.com/pin/create/button/?url=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL'] + '&amp;media=' + '' + '&amp;description=' + this.$store.state.currentCard.Prejudice" target="_blank" rel="noopener" aria-label="">
            <div class="resp-sharing-button resp-sharing-button--pinterest resp-sharing-button--small">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11.5" />
                        <path d="M8 11.2c-.15-.32-.25-.72-.25-1.22 0-2.32 1.74-4.4 4.53-4.4 2.47 0 3.82 1.5 3.82 3.52 0 2.64-1.17 4.88-2.9 4.88-.97 0-1.7-.8-1.46-1.77.28-1.14.8-2.4.8-3.23 0-.76-.4-1.38-1.23-1.38-.95 0-1.74 1-1.74 2.37 0 .86.3 1.45.3 1.45l-1.2 5c-.34 1.5-.04 3.33-.02 3.5.02.1.16.15.22.06.1-.12 1.26-1.56 1.66-3l.66-2.53c.32.6 1.25 1.14 2.24 1.14 2.95 0 4.95-2.7 4.95-6.3 0-2.73-2.3-5.27-5.82-5.27-4.36 0-6.57 3.14-6.57 5.75 0 .85.18 1.64.53 2.28l1.5-.8z" /></svg>
                </div>
            </div>
        </a>

        <!-- Sharingbutton LinkedIn -->
        <a class="resp-sharing-button__link" :href="'https://www.linkedin.com/shareArticle?mini=true&amp;url=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL'] + '&amp;title=' + this.$store.state.currentCard.Prejudice + '&amp;summary=' + this.$store.state.currentCard.Prejudice + '&amp;source=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL']" target="_blank" rel="noopener" aria-label="">
            <div class="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--small">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11.5" />
                        <path d="M15 12.5c-.28 0-.5.22-.5.5v3.5h-3s.03-6.48 0-7h3v.83s.46-.75 1.7-.75c1.56 0 2.3 1.12 2.3 3.3v3.62h-3V13c0-.28-.23-.5-.5-.5zm-7.5-3h2v7h-2z" />
                        <circle cx="8.5" cy="6.5" r="1" /></svg>
                </div>
            </div>
        </a>

    </div>
</div>
</template>

<script>
import publicPath from "../../vue.config";
export default {
    name: "SocialMedia",
    data: function () {
        return {
            publicPath: publicPath.publicPath,
            windowLocationOrigin: window.location.origin
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.socialMediaButtonsContainer {
    text-align: center;
    // margin-bottom: 1em;
}

.resp-sharing-button__link,
.resp-sharing-button__icon {
    display: inline-block
}

.resp-sharing-button__link {
    text-decoration: none;
    color: #fff;
    margin: 0.5em
}

.resp-sharing-button {
    border-radius: 5px;
    transition: 25ms ease-out;
    padding: 0.2em 0.45em;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif
}

.resp-sharing-button__icon svg {
    width: 1em;
    height: 1em;
    margin-right: 0.4em;
    vertical-align: top
}

.resp-sharing-button--small svg {
    margin: 0;
    vertical-align: middle
}

/* Non solid icons get a stroke */
.resp-sharing-button__icon {
    stroke: #fff;
    fill: none
}

/* Solid icons get a fill */
.resp-sharing-button__icon--solid,
.resp-sharing-button__icon--solidcircle {
    fill: #fff;
    stroke: none
}

.resp-sharing-button--twitter {
    background-color: #55acee
}

.resp-sharing-button--twitter:hover {
    background-color: #2795e9
}

.resp-sharing-button--pinterest {
    background-color: #bd081c
}

.resp-sharing-button--pinterest:hover {
    background-color: #8c0615
}

.resp-sharing-button--facebook {
    background-color: #3b5998
}

.resp-sharing-button--facebook:hover {
    background-color: #2d4373
}

.resp-sharing-button--tumblr {
    background-color: #35465C
}

.resp-sharing-button--tumblr:hover {
    background-color: #222d3c
}

.resp-sharing-button--reddit {
    background-color: #5f99cf
}

.resp-sharing-button--reddit:hover {
    background-color: #3a80c1
}

.resp-sharing-button--google {
    background-color: #dd4b39
}

.resp-sharing-button--google:hover {
    background-color: #c23321
}

.resp-sharing-button--linkedin {
    background-color: #0077b5
}

.resp-sharing-button--linkedin:hover {
    background-color: #046293
}

.resp-sharing-button--email {
    background-color: #777
}

.resp-sharing-button--email:hover {
    background-color: #5e5e5e
}

.resp-sharing-button--xing {
    background-color: #1a7576
}

.resp-sharing-button--xing:hover {
    background-color: #114c4c
}

.resp-sharing-button--whatsapp {
    background-color: #25D366
}

.resp-sharing-button--whatsapp:hover {
    background-color: #1da851
}

.resp-sharing-button--hackernews {
    background-color: #FF6600
}

.resp-sharing-button--hackernews:hover,
.resp-sharing-button--hackernews:focus {
    background-color: #FB6200
}

.resp-sharing-button--vk {
    background-color: #507299
}

.resp-sharing-button--vk:hover {
    background-color: #43648c
}

.resp-sharing-button--facebook {
    background-color: #3b5998;
    border-color: #3b5998;
}

.resp-sharing-button--facebook:hover,
.resp-sharing-button--facebook:active {
    background-color: #2d4373;
    border-color: #2d4373;
}

.resp-sharing-button--twitter {
    background-color: #55acee;
    border-color: #55acee;
}

.resp-sharing-button--twitter:hover,
.resp-sharing-button--twitter:active {
    background-color: #2795e9;
    border-color: #2795e9;
}

.resp-sharing-button--email {
    background-color: #777777;
    border-color: #777777;
}

.resp-sharing-button--email:hover,
.resp-sharing-button--email:active {
    background-color: #5e5e5e;
    border-color: #5e5e5e;
}

.resp-sharing-button--pinterest {
    background-color: #bd081c;
    border-color: #bd081c;
}

.resp-sharing-button--pinterest:hover,
.resp-sharing-button--pinterest:active {
    background-color: #8c0615;
    border-color: #8c0615;
}

.resp-sharing-button--linkedin {
    background-color: #0077b5;
    border-color: #0077b5;
}

.resp-sharing-button--linkedin:hover,
.resp-sharing-button--linkedin:active {
    background-color: #046293;
    border-color: #046293;
}
</style>
