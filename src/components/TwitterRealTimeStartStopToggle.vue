<template>
<div class="twitterRealTimeToggle">
    <input type="checkbox" id="twitterRealTimeToggleInput" class="visually-hidden" checked>
    <div class="control-me"></div>
    <label for="twitterRealTimeToggleInput">Toggle</label>
</div>
</template>

<script>
import {
    realTimeTweets
} from "@/assets/js/realTimeTweets.js";
export default {
    name: "TwitterRealTimeStartStopToggle",
    mounted: function () {
        this.streamOnOffSetting();
    },
    methods: {
        streamOnOffSetting() {
            var twitterRealTimeToggleInput = document.querySelector("#twitterRealTimeToggleInput");
            var streamOn = true;

            // toggle between stream is on and stream is off
            twitterRealTimeToggleInput.addEventListener('change', function () {
                streamOn ?
                    realTimeTweets.stop() :
                    realTimeTweets.start({
                        source: process.env.VUE_APP_REALTIME_TWITTER_JSON,
                        tweetHook: ".tweets-realtime .tweets"
                    });
                streamOn = !streamOn;
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
// https://css-tricks.com/the-checkbox-hack/

$size: 30px;
$padding: 70%;

.twitterRealTimeToggle {
    position: relative;
    left: 0;
    top: 0;

    // padding: 10px;

    width: $size;
    height: $size;
}

.control-me {
    // border: 1px solid purple;
}

.control-me::after {
    position: absolute;
    left: 0;
    top: 0;

    // border: 1px solid yellow;
    content: "";

    width: $size;
    height: $size;
    background: transparent url("../assets/img/icons/ui/013-play.svg") no-repeat center center;
    background-size: $padding;
    display: inline-block;
}

#twitterRealTimeToggleInput {
    // border: 1px solid green;
}

#twitterRealTimeToggleInput:checked~.control-me::after {
    background: transparent url("../assets/img/icons/ui/003-stop.svg") no-repeat center center;
    background-size: $padding;
}

label {
    // border: 1px solid red;
    position: absolute;
    left: 0;
    top: 0;

    width: $size;
    height: $size;
    color: transparent;
    cursor: pointer;
}

.visually-hidden {
    position: absolute;
    left: -100vw;

    /* Note, you may want to position the checkbox over top the label and set the opacity to zero instead. It can be better for accessibilty on some touch devices for discoverability. */
}
</style>
