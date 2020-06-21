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

.soundToggle {
    position: fixed;
    right: 0;
    top: 0;
    // border: 3px solid #333;
}

.control-me {
    position: absolute;
    right: 0;
    top: 0;
}

.control-me::after {
    content: "";
    margin: 10px 10px 0 0;
    width: 40px;
    height: 40px;
    background: transparent url("../assets/img/icons/flat/soundOff.svg") no-repeat;
    background-size: contain;
    display: inline-block;
}

#soundToggleInput:checked~.control-me::after {
    background: transparent url("../assets/img/icons/flat/soundOn.svg") no-repeat;
}

label {
    // border: 1px solid #333;
    position: relative;
    right: 0;
    top: 0;
    font-size: 20px;
    line-height: 3;
    color: transparent;
    // display: block;
    // z-index: 2;
    cursor: pointer;
}

.visually-hidden {
    position: absolute;
    left: -100vw;

    /* Note, you may want to position the checkbox over top the label and set the opacity to zero instead. It can be better for accessibilty on some touch devices for discoverability. */
}
</style>
