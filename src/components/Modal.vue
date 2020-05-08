<template>
  <div class="popup md-modal md-effect-1" :class="this.$store.state.modalState" id="modal-1">
    <div class="md-content">
      <h3 class="modal-header"></h3>
      <div>
        <div class="modal-content"></div>
        <!-- <h2>{{ this.$store.state.currentTitle }}</h2> -->
        <p>{{ this.$store.state.currentPrejudice.Prejudice }}</p>
        <p>{{ this.$store.state.currentPrejudice["Prejudice Elaborate"] }}</p>
        <p>Hoi</p>
        <p>Hoi</p>
        <p>Hoi</p>
        <p>Hoi</p>
        <p>Hoi</p>
        <p>Hoi</p>
        <p>Hoi</p>
        <p>Hoi</p>
        <p>Hoi</p>
        <p>Hoi</p>
        <!-- Trigger -->
        <!-- <button class="copyURLtoClipboard copyURLtoClipboard1">
          Copy Link
        </button> -->

        <button class="md-close" @click="hideModal">Close</button>
        <a class="md-close md-close-cross">×</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Modal",
    // data() {
    //   return {
    //     modalState: "popup md-modal md-effect-1"
    //   }
    // },
    data: function () {
      return {
        title: this.$store.state.currentTitle
      }
    },
    props: {
      msg: String
    },
    methods: {
      hideModal() {
        //TODO: is this the way to change a store value? Seems not.
        this.$store.state.modalState = "";
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>