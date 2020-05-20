<template>
  <!-- negate doesnt seem to work -->
  <div v-if="(this.$store.state.currentCard['Youtube Video Id'] === '')"></div>
  
  <div v-else>
    <h3 class="video">Video</h3>

    <p>{{this.$store.state.currentCard["Youtube Video Description"]}}</p>

    <div class="videoWrapper">
      <iframe class="youtube"
        :src="'https://www.youtube.com/embed/' + this.$store.state.currentCard['Youtube Video Id'] + '?start=' + this.$store.state.currentCard['Youtube Video Start'] + '&end=' + this.$store.state.currentCard['Youtube Video End'] + '&playsinline=1'"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture">
      </iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Video"
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>