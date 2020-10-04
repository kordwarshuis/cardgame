<template>
<div class="soundToggle">
    <input type="checkbox" id="soundToggleInput" class="visually-hidden" checked>
    <div class="control-me"></div>
    <label for="soundToggleInput">Toggle</label>
</div>
</template>

<script>
export default {
    name: "SoundToggle",
    mounted: function () {
        this.soundSetting();
    },
    methods: {
        soundSetting() {
            var soundToggleInput = document.querySelector("#soundToggleInput");

            // check if sound-localStorage is set (can be null, or true or false):
            if (localStorage.getItem("soundOn") !== null) {
                // if localStorage is set, get the value and set the toggle:

                // https://stackoverflow.com/a/264037 LocalStorage is storing string not boolean
                soundToggleInput.checked = (localStorage.getItem("soundOn") === "true");
            } else {
                // sound off after first time loading
                // localStorage.setItem("soundOn", "false");

                // sound on after first time loading
                localStorage.setItem("soundOn", "true");
            }
            // set localStorage on toggle change:
            soundToggleInput.addEventListener('change', function () {

                // the boolean is converted to a string
                localStorage.setItem("soundOn", this.checked);
            });

            // setInterval(function () {
            //     console.clear();
            //     console.log('soundToggleInput.checked: ', soundToggleInput.checked);
            //     console.log('localStorage.getItem("soundOn") : ', localStorage.getItem("soundOn"));
            // }, 4000);

        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
// https://css-tricks.com/the-checkbox-hack/

$size: 40px;
$padding: 70%;

.soundToggle {
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
    background: transparent url("../assets/img/icons/flat/soundOff.svg") no-repeat center center;
    background-size: $padding;
    display: inline-block;
}

#soundToggleInput {
    // border: 1px solid green;
}

#soundToggleInput:checked~.control-me::after {
    background: transparent url("../assets/img/icons/flat/soundOn.svg") no-repeat center center;
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
