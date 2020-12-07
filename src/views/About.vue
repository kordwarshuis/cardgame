<template>
<div class="about pb-5">
    <div class="container " v-html="content"></div>
</div>
</template>

<script>
import axios from "axios";
export default {
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
            return axios.get(process.env.VUE_APP_ABOUT_PAGE_SOURCE)
                .then(response => {
                    this.content = response.data;
                }).catch(function (error) {
                    console.log("We have a problem: " + error);
                });
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
