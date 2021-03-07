<template>
  <div>
    <v-tour name="myTour" :steps="steps"></v-tour>
  </div>
</template>

<script>
  export default {
    name: 'my-tour',
    data () {
      return {
        steps: tour // reading from script imported via index.html TODO: make more robust
      }
    },
    mounted: function () {
      this.$tours['myTour'].start()
    }
  }
</script>