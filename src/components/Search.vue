<template>
  <div class="md:w-1/2 center bg-teal-light min-h-screen overflow-scroll">
    <div class="flex flex-col pt-8">
      <VueFuse placeholder="Search Books of the Bible" event-name="results" :list="books"
        :keys="['Prejudice', 'Prejudice Elaborate']" class="w-64 text-center h-8 border rounded-lg center" />

    </div>
    <div v-for="book in results" :key="book.Prejudice" class="">
      <div>
        <a :href=" '/#/card/' +   book['Unique URL']">
          <h3 class="w-1/4">{{ book.Prejudice }}</h3>
          <p class="ml-4 w-3/4">{{ book['Prejudice Elaborate'] }}</p>
      </a>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    language
  } from "@/assets/js/Language.js";
  import VueFuse from "vue-fuse";

  export default {
    name: "Search",
    components: {
      VueFuse
    },
    data() {
      return {
        results: [],
        books: []
      }
    },
    computed: {
      isJSONloaded() {
        return this.$store.state.isJSONloaded;
      }
    },
    // https://stackoverflow.com/a/44347195
    watch: {
      isJSONloaded: function () {
        console.log("JSON ready");
        console.log(this.$store.state.isJSONloaded);
        if (this.$store.state.isJSONloaded === true) {
          this.books = this.$store.state.theJSON;
        }
      }
    },
    mounted: function () {
      this.$on('results', results => {
        this.results = results
      })
    },
    created() {}
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>