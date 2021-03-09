<template>
<!-- Modal -->
<div class="modal fade" id="tweetStreamInfoModal" tabindex="-1" role="dialog" aria-labelledby="tweetStreamInfoModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title" id="tweetStreamInfoModalLabel">Info</h1>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12" v-html="content"></div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "TwitterRealTimeInfoModal",
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
            return axios.get(process.env.VUE_APP_TWEETSTREAM_HELPTEXT + '?timestamp=' + new Date().getTime())
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
// https://github.com/jquery/jquery-mobile/issues/2069
select {
    font-size: 18px;
}

h1,
h2 {
    font-size: 1rem;
}

// https://stackoverflow.com/a/26917844
.close {
    font-size: 2em;
    color: #eee;
}

.close:hover {
    color: #fff;
}
</style>
