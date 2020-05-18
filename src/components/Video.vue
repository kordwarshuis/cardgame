<template>
  <div v-if="(this.$store.state.currentCard['Youtube Video Id'] === '')"></div>
  
  <div v-else>
    <h2>Video</h2>

    <p>{{this.$store.state.currentCard["Youtube Video Id"]}}</p>

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