<template>
  <div>
    <div class="container logo-parent" :class="this.$store.state.cardOverviewPageState">
      <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
      <a href=""><img class="logo" alt="logo" src="../assets/img/logo/blockchainbird-logo.png" /></a>
      <Index msg="Bitcoin Card Game" />
    </div>
    <CardIntro />
    <Modal />
  </div>
</template>

<script>
  // @ is an alias to /src
  import Index from "@/components/Index.vue";
  import Modal from "@/components/Modal.vue";
  import CardIntro from "@/components/CardIntro.vue";

  export default {
    name: "Home",
    components: {
      Index,
      Modal,
      CardIntro
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  // https://tympanus.net/Development/FullscreenOverlayStyles/index7.html#
  /* Overlay style */
  .overlay-fullscreen {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(153, 204, 51, 0.9);
  }

  /* Overlay closing cross */
  .overlay-fullscreen .overlay-fullscreen-close {
    cursor: pointer;
    width: 80px;
    height: 80px;
    position: absolute;
    right: 20px;
    top: 20px;
    overflow: hidden;
    border: none;
    background: url(../assets/img/icons/ui/cross.png) no-repeat center center;
    text-indent: 200%;
    color: transparent;
    outline: none;
    z-index: 100;
  }

  /* Menu style */
  .overlay-fullscreen nav {
    text-align: center;
    position: relative;
    top: 50%;
    height: 60%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }

  .overlay-fullscreen ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    display: inline-block;
    height: 100%;
    position: relative;
  }

  .overlay-fullscreen ul li {
    display: block;
    height: 20%;
    height: calc(100% / 5);
    min-height: 54px;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .overlay-fullscreen ul li a {
    font-size: 54px;
    font-weight: 300;
    display: block;
    color: #fff;
    -webkit-transition: color 0.2s;
    transition: color 0.2s;
  }

  .overlay-fullscreen ul li a:hover,
  .overlay-fullscreen ul li a:focus {
    color: #f0f0f0;
  }

  /* Effects */
  // html,
  // body {
  //   overflow-x: hidden;
  // }

  .container {
    overflow-x: hidden;
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
  }

  .container.overlay-fullscreen-open {
    -webkit-transform: translateX(50%);
    transform: translateX(50%);
  }

  .container::after {
    content: '';
    opacity: 0;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    -webkit-transition: opacity 0.5s, visibility 0s 0.5s;
    transition: opacity 0.5s, visibility 0s 0.5s;
  }

  .container.overlay-fullscreen-open::after {
    visibility: visible;
    opacity: 1;
    -webkit-transition: opacity 0.5s;
    transition: opacity 0.5s;
  }

  .overlay-fullscreen-contentpush {
    background: rgba(153, 204, 51, 1);
    visibility: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    -webkit-transition: -webkit-transform 0.5s, visibility 0s 0.5s;
    transition: transform 0.5s, visibility 0s 0.5s;
  }

  .overlay-fullscreen-contentpush.open {
    visibility: visible;
    -webkit-transform: translateX(0%);
    transform: translateX(0%);
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
  }

  @media screen and (max-height: 30.5em) {
    .overlay-fullscreen nav {
      height: 70%;
      font-size: 34px;
    }

    .overlay-fullscreen ul li {
      min-height: 34px;
    }
  }
</style>