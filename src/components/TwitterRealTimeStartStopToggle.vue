<template>
<div class="twitterRealTimeToggle">
    <input type="checkbox" id="twitterRealTimeToggleInput" class="visuallyhidden" checked>
    <div class="control-me"></div>
    <label for="twitterRealTimeToggleInput">Toggle</label>
</div>
</template>

<script>
import {
    getJSON
} from "@/assets/js/getJSON.js";
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
                    getJSON.stop() :
                    getJSON.start(getJSON.start(process.env.VUE_APP_REALTIME_TWITTER_JSON));
                streamOn = !streamOn;
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
// https://css-tricks.com/the-checkbox-hack/

// $size: 35px;
$size: 100%;
$background-size: 100%;

.twitterRealTimeToggle {
    position: relative;
    left: 0;
    top: 0;
    display: inline-block;
    width: $size;
    height: $size;
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
    background-size: $background-size;
    display: inline-block;
}

#twitterRealTimeToggleInput {
    // border: 1px solid green;
}

#twitterRealTimeToggleInput:checked~.control-me::after {
    background: transparent url("../assets/img/icons/ui/003-stop.svg") no-repeat center center;
    background-size: $background-size;
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
