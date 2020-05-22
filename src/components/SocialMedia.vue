<template>
<div>
    <div id="socialMediaButtonsTemplate">
        <!-- Sharingbutton Facebook -->
        <a class="resp-sharing-button__link" :href="'https://facebook.com/sharer/sharer.php?u=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL']" target="_blank" rel="noopener" aria-label="Facebook">
            <div class="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--medium">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11.5" />
                        <path d="M15.84 9.5H13.5V8.48c0-.53.35-.65.6-.65h1.4v-2.3h-2.35c-2.3 0-2.65 1.7-2.65 2.8V9.5h-2v2h2v7h3v-7h2.1l.24-2z" /></svg></div>Facebook
            </div>
        </a>

        <!-- Sharingbutton Twitter -->
        
        <a class="resp-sharing-button__link" :href="'https://twitter.com/intent/tweet/?text=' + this.$store.state.currentCard.Prejudice + '&amp;url=' + this.windowLocationOrigin + this.publicPath + 'card/' + this.$store.state.currentCard['Unique URL']" target="_blank" rel="noopener" aria-label="Twitter">
            <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--medium">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M18.5 7.4l-2 .2c-.4-.5-1-.8-2-.8C13.3 6.8 12 8 12 9.4v.6c-2 0-4-1-5.4-2.7-.2.4-.3.8-.3 1.3 0 1 .4 1.7 1.2 2.2-.5 0-1 0-1.2-.3 0 1.3 1 2.3 2 2.6-.3.4-.7.4-1 0 .2 1.4 1.2 2 2.3 2-1 1-2.5 1.4-4 1 1.3 1 2.7 1.4 4.2 1.4 4.8 0 7.5-4 7.5-7.5v-.4c.5-.4.8-1.5 1.2-2z" />
                        <circle cx="12" cy="12" r="11.5" /></svg></div>Twitter
            </div>
        </a>

        <!-- Sharingbutton Tumblr -->
        <!-- <a class="resp-sharing-button__link" href="https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=xxxxx-title&amp;caption=xxxxx-title&amp;content=xxxxx-href&amp;canonicalUrl=xxxxx-href&amp;shareSource=tumblr_share_button" target="_blank" rel="noopener" aria-label="Tumblr">
            <div class="resp-sharing-button resp-sharing-button--tumblr resp-sharing-button--medium">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11.5" />
                        <path d="M12.5 4.5v3h2v2h-2v3.72c0 2.47 1.48 2.7 3 1.7v2.7c-4.1 1.92-6-.62-6-3.6V9.5h-2V8.14c.55-.18 1.24-.43 1.63-.77.4-.33.7-.73.94-1.2.24-.46.4-.95.5-1.67h1.93z" /></svg></div>Tumblr
            </div>
        </a> -->

        <!-- Sharingbutton E-Mail -->
        <!-- <a class="resp-sharing-button__link" href="mailto:?subject=xxxxx-title&amp;body=xxxxx-href" target="_self" rel="noopener" aria-label="E-Mail">
            <div class="resp-sharing-button resp-sharing-button--email resp-sharing-button--medium">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M19.5 16c0 .8-.7 1.5-1.5 1.5H6c-.8 0-1.5-.7-1.5-1.5V8c0-.8.7-1.5 1.5-1.5h12c.8 0 1.5.7 1.5 1.5v8zm-2-7.5L12 13 6.5 8.5m11 6l-4-2.5m-7 2.5l4-2.5" />
                        <circle cx="12" cy="12" r="11.5" /></svg></div>E-Mail
            </div>
        </a> -->

        <!-- Sharingbutton Pinterest -->
        <!-- <a class="resp-sharing-button__link" href="https://pinterest.com/pin/create/button/?url=xxxxx-href&amp;media=xxxxx-href&amp;description=xxxxx-title" target="_blank" rel="noopener" aria-label="Pinterest">
            <div class="resp-sharing-button resp-sharing-button--pinterest resp-sharing-button--medium">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11.5" />
                        <path d="M8 11.2c-.15-.32-.25-.72-.25-1.22 0-2.32 1.74-4.4 4.53-4.4 2.47 0 3.82 1.5 3.82 3.52 0 2.64-1.17 4.88-2.9 4.88-.97 0-1.7-.8-1.46-1.77.28-1.14.8-2.4.8-3.23 0-.76-.4-1.38-1.23-1.38-.95 0-1.74 1-1.74 2.37 0 .86.3 1.45.3 1.45l-1.2 5c-.34 1.5-.04 3.33-.02 3.5.02.1.16.15.22.06.1-.12 1.26-1.56 1.66-3l.66-2.53c.32.6 1.25 1.14 2.24 1.14 2.95 0 4.95-2.7 4.95-6.3 0-2.73-2.3-5.27-5.82-5.27-4.36 0-6.57 3.14-6.57 5.75 0 .85.18 1.64.53 2.28l1.5-.8z" /></svg></div>Pinterest
            </div>
        </a> -->

        <!-- Sharingbutton LinkedIn -->
        <!-- <a class="resp-sharing-button__link" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=xxxxx-href&amp;title=xxxxx-title&amp;summary=xxxxx-title&amp;source=xxxxx-href" target="_blank" rel="noopener" aria-label="LinkedIn">
            <div class="resp-sharing-button resp-sharing-button--linkedin resp-sharing-button--medium">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11.5" />
                        <path d="M15 12.5c-.28 0-.5.22-.5.5v3.5h-3s.03-6.48 0-7h3v.83s.46-.75 1.7-.75c1.56 0 2.3 1.12 2.3 3.3v3.62h-3V13c0-.28-.23-.5-.5-.5zm-7.5-3h2v7h-2z" />
                        <circle cx="8.5" cy="6.5" r="1" /></svg></div>LinkedIn
            </div>
        </a> -->

        <!-- Sharingbutton Reddit -->
        <!-- <a class="resp-sharing-button__link" href="https://reddit.com/submit/?url=xxxxx-href&amp;resubmit=true&amp;title=xxxxx-title" target="_blank" rel="noopener" aria-label="Reddit">
            <div class="resp-sharing-button resp-sharing-button--reddit resp-sharing-button--medium">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11.5" />
                        <ellipse cx="12" cy="14.37" rx="6.2" ry="4.24" />
                        <path d="M14.3 16.25c-.62.36-1.42.57-2.3.57-.88 0-1.7-.2-2.32-.58" />
                        <circle cx="14.61" cy="13.39" r=".98" />
                        <circle cx="9.39" cy="13.39" r=".98" />
                        <path d="M16.4 11.38c.26-.55.82-.92 1.47-.92.9 0 1.63.73 1.63 1.63 0 .8-.6 1.47-1.38 1.6" />
                        <circle cx="17.22" cy="7.52" r="1.63" />
                        <path d="M7.6 11.38c-.26-.54-.82-.92-1.47-.92-.9 0-1.63.73-1.63 1.63 0 .8.6 1.47 1.38 1.6M12 10.12s-.08-4.82 3.6-2.6" /></svg></div>Reddit
            </div>
        </a> -->

        <!-- Sharingbutton WhatsApp -->
        <!-- <a class="resp-sharing-button__link" href="whatsapp://send?text=xxxxx-title%20xxxxx-href" target="_blank" rel="noopener" aria-label="WhatsApp">
            <div class="resp-sharing-button resp-sharing-button--whatsapp resp-sharing-button--medium">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle xmlns="http://www.w3.org/2000/svg" cx="12" cy="12" r="11.5" />
                        <path stroke-width="1px" d="M17.6 6.2c-1.5-1.5-3.4-2.3-5.5-2.3-4.3 0-7.8 3.5-7.8 7.8 0 1.4.4 2.7 1 3.9l-1.1 4 4.1-1.1c1.1.6 2.4.9 3.7.9 4.3 0 7.8-3.5 7.8-7.8.1-2-.7-3.9-2.2-5.4zm-5.5 11.9c-1.2 0-2.3-.3-3.3-.9l-.2-.1-2.4.6.7-2.4-.2-.2c-.6-1-1-2.2-1-3.4 0-3.6 2.9-6.5 6.5-6.5 1.7 0 3.3.7 4.6 1.9 1.2 1.2 1.9 2.8 1.9 4.6-.1 3.5-3 6.4-6.6 6.4zm3.5-4.8c-.2-.1-1.1-.6-1.3-.6-.2-.1-.3-.1-.4.1-.1.2-.5.6-.6.8-.1.1-.2.1-.4 0s-.8-.3-1.6-1c-.6-.5-1-1.2-1.1-1.3-.1-.2 0-.3.1-.4l.3-.3s.1-.2.2-.3c.1-.1 0-.2 0-.3s-.4-1.1-.6-1.4c-.2-.4-.3-.3-.4-.3h-.4s-.3 0-.5.2-.7.7-.7 1.6c0 1 .7 1.9.8 2s1.4 2.1 3.3 2.9c.5.2.8.3 1.1.4.5.1.9.1 1.2.1.4-.1 1.1-.5 1.3-.9.2-.5.2-.8.1-.9 0-.2-.2-.3-.4-.4z" /></svg></div>WhatsApp
            </div>
        </a> -->

        <!-- Sharingbutton Hacker News -->
        <!-- <a class="resp-sharing-button__link" href="https://news.ycombinator.com/submitlink?u=xxxxx-href&amp;t=xxxxx-title" target="_blank" rel="noopener" aria-label="Hacker News">
            <div class="resp-sharing-button resp-sharing-button--hackernews resp-sharing-button--medium">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <circle cx="128" cy="128" r="122.5" />
                        <path fill-rule="evenodd" stroke-width="10px" d="M128 256c70.692 0 128-57.308 128-128C256 57.308 198.692 0 128 0 57.308 0 0 57.308 0 128c0 70.692 57.308 128 128 128zm-9.06-113.686L75 60h20.08l25.85 52.093c.397.927.86 1.888 1.39 2.883.53.994.995 2.02 1.393 3.08.265.4.463.764.596 1.095.13.334.262.63.395.898.662 1.325 1.26 2.618 1.79 3.877.53 1.26.993 2.42 1.39 3.48 1.06-2.254 2.22-4.673 3.48-7.258 1.26-2.585 2.552-5.27 3.877-8.052L161.49 60h18.69l-44.34 83.308v53.087h-16.9v-54.08z" /></svg></div>Hacker News
            </div>
        </a> -->

        <!-- Sharingbutton Telegram -->
        <!-- <a class="resp-sharing-button__link" href="https://telegram.me/share/url?text=xxxxx-title&amp;url=xxxxx-href" target="_blank" rel="noopener" aria-label="Telegram">
            <div class="resp-sharing-button resp-sharing-button--telegram resp-sharing-button--medium">
                <div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="11.5" />
                        <path d="M2.505 11.053c-.31.118-.505.738-.505.738s.203.62.513.737l3.636 1.355 1.417 4.557a.787.787 0 0 0 1.25.375l2.115-1.72a.29.29 0 0 1 .353-.01L15.1 19.85a.786.786 0 0 0 .746.095.786.786 0 0 0 .487-.573l2.793-13.426a.787.787 0 0 0-1.054-.893l-15.568 6z" /></svg></div>Telegram
            </div>
        </a> -->
    </div>
</div>
</template>

<script>
import publicPath from "../../vue.config";
export default {
    name: "SocialMedia",
    data: function () {
        return {
            // socialMediaButtonsTitle: "",
            // socialMediaButtonsURL: ""
            publicPath: publicPath.publicPath,
            windowLocationOrigin: window.location.origin
}
    },
    mounted: function () {
        this.createSocialMediaButtons();
    },
    methods: {
        createSocialMediaButtons() {

          // console.log('this.$store.state.currentCard.name: ', this.$store.state.currentCard);
          // this.socialMediaButtonsTitle = this.$store.state.currentCard.Prejudice;
          // this.socialMediaButtonsURL = "blockchainbird.com/vue-cardgame/card/" + this.$store.state.currentCard["Unique URL"];
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
.socialMediaButtonsContainer {
    text-align: center;
    margin-bottom: 1em;
}

.resp-sharing-button__link {
    border: none !important;
}

.resp-sharing-button__link,
.resp-sharing-button__icon {
    display: inline-block
}

.modal-content .resp-sharing-button__link {
    text-decoration: none;
    color: #fff;
    margin: 0.2em;
    padding: 0.1em;
}

.resp-sharing-button {
    border-radius: 5px;
    transition: 25ms ease-out;
    padding: 0.5em 0.75em;
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

.resp-sharing-button--tumblr {
    background-color: #35465C;
    border-color: #35465C;
}

.resp-sharing-button--tumblr:hover,
.resp-sharing-button--tumblr:active {
    background-color: #222d3c;
    border-color: #222d3c;
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

.resp-sharing-button--reddit {
    background-color: #5f99cf;
    border-color: #5f99cf;
}

.resp-sharing-button--reddit:hover,
.resp-sharing-button--reddit:active {
    background-color: #3a80c1;
    border-color: #3a80c1;
}

.resp-sharing-button--whatsapp {
    background-color: #25D366;
    border-color: #25D366;
}

.resp-sharing-button--whatsapp:hover,
.resp-sharing-button--whatsapp:active {
    background-color: #1DA851;
    border-color: #1DA851;
}

.resp-sharing-button--hackernews {
    background-color: #FF6600;
    border-color: #FF6600;
}

.resp-sharing-button--hackernews:hover .resp-sharing-button--hackernews:active {
    background-color: #FB6200;
    border-color: #FB6200;
}

.resp-sharing-button--telegram {
    background-color: #54A9EB;
}

.resp-sharing-button--telegram:hover {
    background-color: #4B97D1;
}
</style>
