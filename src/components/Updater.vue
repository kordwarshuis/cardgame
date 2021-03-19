<template>
<div id="updateinfo" class="alert alert-info m-5 " style="display: none;">
    <div role="alert">
        <p class="text-center">Speed Update Available <button id="updater" @click="update">Update now</button></p>
    </div>

    <div class="spinner-border-container mx-auto" style="display: none; width: 1em;">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import publicPath from "../../vue.config";
import {
    versionCurrent
} from "../assets/js/updater";
export default {
    name: "Updater",
    mounted: function () {
        this.updater();
    },
    methods: {
        update() {
            window.location = window.location;
            document.querySelector(".spinner-border-container").style.display = "block";
        },
        updater() {
            let one = window.location.protocol + "//" + window.location.host + publicPath.publicPath + "updater.php";

            var getUpdateInfo = function () {
                const requestOne = axios.get(one + '?timestamp=' + new Date().getTime());

                return axios.all([requestOne]).then(axios.spread((...responses) => {
                    const responseOne = responses[0]
                    processUpdateInfo(responseOne.data.versionNew);

                })).catch(errors => {
                    // react on errors.
                    console.log('errors: ', errors);
                    console.log("something goes wrong fetching the data");
                })

            };

            function processUpdateInfo(versionNew) {
                // search for updater.js and updater.json
                if (versionCurrent !== versionNew) {
                    document.querySelector('#updateinfo').style.display = "block";
                }
            }

            setInterval(getUpdateInfo, 60000);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
</style>
