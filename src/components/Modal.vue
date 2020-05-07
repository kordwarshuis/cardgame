<template>
  <div class="popup md-modal md-effect-1" :class="this.$store.state.modalState" id="modal-1">
    <div class="md-content">
      <h3 class="modal-header"></h3>
      <div>
        <div class="modal-content"></div>
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
    props: {
      msg: String
    },
    methods: {
      hideModal() {
        this.$store.state.modalState = "";
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>