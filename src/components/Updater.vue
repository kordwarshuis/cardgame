<template>
<div id="updateinfo" class="alert alert-info m-5" role="alert" style="display: none;">
    <p class="text-center">Speed Update Available <button id="updater" onclick="window.location = window.location;">Update now</button></p>
</div>
</template>

<script>
import axios from "axios";
import publicPath from "../../vue.config";
import {versionCurrent} from "../assets/js/updater";
export default {
    name: "Updater",
    mounted: function () {
        this.updater();
    },
    methods: {
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
                // see updater.js and updater.json in /public
                    console.log('versionNew: ', versionNew);
                    console.log('versionCurrent: ', versionCurrent);
                if (versionCurrent !== versionNew) {
                    document.querySelector('#updateinfo').style.display = "block";
                }
            }

            setInterval(getUpdateInfo, 6000);
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
</style>
