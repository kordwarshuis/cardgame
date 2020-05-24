<template>
<!-- negate doesnt seem to work -->
<div v-if="(this.$store.state.currentCard['Youtube Video Id'] === '')"></div>

<div class="border p-3 mb-3" v-else>

    <h3 class="video">Video</h3>

    <p>{{this.$store.state.currentCard["Youtube Video Description"]}}</p>

    <div class="videoWrapper">
        <iframe class="youtube" :src="'https://www.youtube.com/embed/' + this.$store.state.currentCard['Youtube Video Id'] + '?start=' + this.$store.state.currentCard['Youtube Video Start'] + '&end=' + this.$store.state.currentCard['Youtube Video End'] + '&playsinline=1&enablejsapi=1'" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
        </iframe>
    </div>
        <!-- <button @click="this.stopIt">stop</button> -->
</div>
</template>

<script>
export default {
    name: "Video",
    mounted: function () {
        // console.log("mounted");
        
    },
    methods: {
        stopIt() {
            document.querySelector(".youtube").stopVideo();
        } 
    },
    beforeUpdate() {
        // console.log('beforeUpdate')
    },
    beforeDestroy() {
        // console.log('beforeDestroy')
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
/* https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php */
.videoWrapper {
    position: relative;
    padding-bottom: 56.25%;
    /* 16:9 */
    padding-top: 25px;
    height: 0;
    margin-bottom: 3em;
}

.videoWrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
</style>
