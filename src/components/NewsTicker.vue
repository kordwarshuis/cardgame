<template>
<div style="animation-duration: 1000s;" class="news-ticker-container" v-html="content"></div>
</template>

<script>
import axios from "axios";
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
// see App.vue for css
</style>
