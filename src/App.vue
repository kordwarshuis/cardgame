<template>
  <div id="app">
    <Menu />
    <router-view />
    <NewsTicker />
    
  </div>
</template>

<script>
  import Menu from "@/components/Menu.vue";
  import NewsTicker from "@/components/NewsTicker.vue";

export default {
  components: {
    Menu, NewsTicker
  }

}
</script>

<style lang="scss">
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
