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
                        <div class="col-md-12">
                            <p>This is the place where real time tweets will stream. All tweets with keyword “bitcoin” will be loaded but which tweets are shown depends on your configuration.</p>

                            <p>The default configuration will not show many tweets.</p>

                            <p>The “clear” button will remove all tweets that are shown and wait for new tweets.</p>
                            <p>
                                <img style="width: 20px;" src="@/assets/img/icons/ui/configuration.svg" alt="" /> = to configuration panel where you can configure your tweet stream.
                            </p>
                            <p>
                                <img style="width: 20px;" src="@/assets/img/icons/ui/003-stop.svg" alt="" /> will stop the tweet stream.
                            </p>
                            <p>
                                <img style="width: 20px;" src="@/assets/img/icons/ui/013-play.svg" alt="" /> will start the tweet stream.
                            </p>

                        </div>

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
export default {
    name: "TwitterRealTimeInfoModal"
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
</style>
