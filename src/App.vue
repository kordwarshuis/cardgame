<template>
  <div id="app">
    <Menu />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/twitter-real-time">Realtime Twitter</router-link>
    </div>
    <router-view />
    <NewsTicker />
  </div>
</template>

<script>
  import Menu from "@/components/Menu.vue";
  import NewsTicker from "@/components/NewsTicker.vue";

  export default {
    components: {
      Menu,
      NewsTicker
    }

  }
</script>

<style lang="scss">
// @import '~bootstrap/dist/css/bootstrap.min.css';


  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>