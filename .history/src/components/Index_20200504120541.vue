<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ kor }}</p>
    <!-- <ol class="">
      <li v-for="tweet in sortedFavorites" :key="tweet.id">{{ tweet.name }},
        {{ tweet.weekreport[0].favorite_count }} followers.</li>
    </ol> -->


  </div>
</template>

<script>
  import * as d3 from 'd3-dsv';
  export default {
    name: "Index",
    props: {
      msg: String
    },
    data() {
      return {
        kor: "hhihi",
        categories: null
      }
    },
    mounted: function () {
      this.fetchData()
    },
    methods: {
      fetchData() {
        Promise.all([
          "https://blockchainbird.com/t/cardgame-resources/data/data-csv-cors.php"
        ].map(function (url) {
          return fetch(url).then(function (response) {
            return response.ok ? response.text() : Promise.reject(response.status);
          }).then(function (text) {
            return d3.csvParse(text);
          });
        })).then(function (value) {
          console.log(value[0].length);

        });
          console.log(this.createCategoryNames();


      },
      createCategoryNames(dataCardsAll) {
        var categoryNames = [];
        // create array with all categories (to create a menu with all categories):
        for (var i = 0; i < dataCardsAll.length; i++) {
          categoryNames.push(dataCardsAll[i].Cat);
        }
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        // var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
        // remove duplicate entries
        return categoryNames = categoryNames.filter(onlyUnique);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>