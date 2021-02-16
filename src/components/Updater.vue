<template>
<div id="updateinfo" style="display: none;">
    <p>Update available <button id="updater" onclick="window.location = window.location;">Update now</button></p>

</div>
</template>

<script>
import axios from "axios";
import publicPath from "../../vue.config";
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
#updateinfo {
    border: 1px solid #eee;
    background: green;
    padding: 1em;
    margin: 1em auto !important;
    display: inline-block;
    width: 30em;
}

#updater {
    display: inline-block;
}
</style>
