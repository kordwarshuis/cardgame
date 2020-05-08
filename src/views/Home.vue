<template>
  <div class="home logo-parent">
    <a href=""><img class="logo" alt="logo" src="../assets/img/logo/blockchainbird-logo.png" /></a>
    
    <Index msg="Bitcoin Card Game" />
    <Modal />
    
  </div>
</template>

<script>
// @ is an alias to /src
import Index from "@/components/Index.vue";
import Modal from "@/components/Modal.vue";


export default {
  name: "Home",
  components: {
    Index, Modal
  }
};
</script>
