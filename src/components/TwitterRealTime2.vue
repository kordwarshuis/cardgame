<template>
<div class="tweets-container">
    <div style="" id="tweets">

        <!-- <div class="tweet col-md-12">
                <div class="card mb-4 box-shadow">
                    <div class="card-body">
                        <div class="card-text"><img class="img-fluid float-left w-25 mr-3" src="https://pbs.twimg.com/profile_images/1126510995763949568/TIkkcWm1_normal.jpg" alt="">
                            <p>Name: Dirt Adventure 🔴<br>Verified: false<br>Keyword: the</p>
                            <p>RT <a href="http://twitter.com/function(e,t){return new E.fn.init(e,t)}" title="Follow ChainPeople" target="_blank">@ChainPeople</a>: DigiByte claims to have a proven and tested solution that is faster and safer than blockchains like Bitcoin and Ethereum.…</p>
                            <p>Followers: 1022 | <a target="_blank" rel="noopener" href="https://twitter.com/dirt_adventure/status/1305791212029239296">Go to tweet</a></p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center"><small class="text-muted"><span class="tweetNumber">#0</span> <span class="tweetTimeStamp">🕐 10:51:12</span></small></div>
                    </div>
                </div>
            </div>

            <div class="tweet col-md-12">
                <div class="card mb-4 box-shadow">
                    <div class="card-body">
                        <div class="card-text"><img class="img-fluid float-left w-25 mr-3" src="https://pbs.twimg.com/profile_images/1126510995763949568/TIkkcWm1_normal.jpg" alt="">
                            <p>Name: Dirt Adventure 🔴<br>Verified: false<br>Keyword: the</p>
                            <p>RT <a href="http://twitter.com/function(e,t){return new E.fn.init(e,t)}" title="Follow ChainPeople" target="_blank">@ChainPeople</a>: DigiByte claims to have a proven and tested solution that is faster and safer than blockchains like Bitcoin and Ethereum.…</p>
                            <p>Followers: 1022 | <a target="_blank" rel="noopener" href="https://twitter.com/dirt_adventure/status/1305791212029239296">Go to tweet</a></p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center"><small class="text-muted"><span class="tweetNumber">#0</span> <span class="tweetTimeStamp">🕐 10:51:12</span></small></div>
                    </div>
                </div>
            </div>

            <div class="tweet col-md-12">
                <div class="card mb-4 box-shadow">
                    <div class="card-body">
                        <div class="card-text"><img class="img-fluid float-left w-25 mr-3" src="https://pbs.twimg.com/profile_images/1126510995763949568/TIkkcWm1_normal.jpg" alt="">
                            <p>Name: Dirt Adventure 🔴<br>Verified: false<br>Keyword: the</p>
                            <p>RT <a href="http://twitter.com/function(e,t){return new E.fn.init(e,t)}" title="Follow ChainPeople" target="_blank">@ChainPeople</a>: DigiByte claims to have a proven and tested solution that is faster and safer than blockchains like Bitcoin and Ethereum.…</p>
                            <p>Followers: 1022 | <a target="_blank" rel="noopener" href="https://twitter.com/dirt_adventure/status/1305791212029239296">Go to tweet</a></p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center"><small class="text-muted"><span class="tweetNumber">#0</span> <span class="tweetTimeStamp">🕐 10:51:12</span></small></div>
                    </div>
                </div>
            </div>

            <div class="tweet col-md-12">
                <div class="card mb-4 box-shadow">
                    <div class="card-body">
                        <div class="card-text"><img class="img-fluid float-left w-25 mr-3" src="https://pbs.twimg.com/profile_images/1126510995763949568/TIkkcWm1_normal.jpg" alt="">
                            <p>Name: Dirt Adventure 🔴<br>Verified: false<br>Keyword: the</p>
                            <p>RT <a href="http://twitter.com/function(e,t){return new E.fn.init(e,t)}" title="Follow ChainPeople" target="_blank">@ChainPeople</a>: DigiByte claims to have a proven and tested solution that is faster and safer than blockchains like Bitcoin and Ethereum.…</p>
                            <p>Followers: 1022 | <a target="_blank" rel="noopener" href="https://twitter.com/dirt_adventure/status/1305791212029239296">Go to tweet</a></p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center"><small class="text-muted"><span class="tweetNumber">#0</span> <span class="tweetTimeStamp">🕐 10:51:12</span></small></div>
                    </div>
                </div>
            </div>

            <div class="tweet col-md-12">
                <div class="card mb-4 box-shadow">
                    <div class="card-body">
                        <div class="card-text"><img class="img-fluid float-left w-25 mr-3" src="https://pbs.twimg.com/profile_images/1126510995763949568/TIkkcWm1_normal.jpg" alt="">
                            <p>Name: Dirt Adventure 🔴<br>Verified: false<br>Keyword: the</p>
                            <p>RT <a href="http://twitter.com/function(e,t){return new E.fn.init(e,t)}" title="Follow ChainPeople" target="_blank">@ChainPeople</a>: DigiByte claims to have a proven and tested solution that is faster and safer than blockchains like Bitcoin and Ethereum.…</p>
                            <p>Followers: 1022 | <a target="_blank" rel="noopener" href="https://twitter.com/dirt_adventure/status/1305791212029239296">Go to tweet</a></p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center"><small class="text-muted"><span class="tweetNumber">#0</span> <span class="tweetTimeStamp">🕐 10:51:12</span></small></div>
                    </div>
                </div>
            </div> -->

    </div>
</div>
</template>

<script>
import {
    realTimeTweets
} from "@/assets/js/realTimeTweets.js";

export default {
    name: "TwitterRealTime2",
    mounted() {
        realTimeTweets.start({
            source: process.env.VUE_APP_REALTIME_TWITTER_JSON
        });
    },
}
</script>

<style lang="scss">
/* // scoped does not work here */
// @import "~bootstrap/dist/css/bootstrap.min.css";
.tweets-container {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 100px;
    width: 100%;
    margin: 0;
    overflow: scroll;

    font-size: 0.6em;
    color: #000;
    transition: all 0.3s ease-in-out;
}

.tweets-container:hover {
    height: 300px;
    transition: all 0.3s ease-in-out;
}

#tweets {
    width: 100000000000000000000px;
}

.tweet {
    max-width: 300px;
    min-height: 400px;
    float: left;
    display: block;
}

.card {
    min-height: 270px;
}

.tweetNumber {
    position: absolute;
    top: -0.1em;
    left: -0.01em;
    font-size: 2em;
    color: #222;
}
</style>
