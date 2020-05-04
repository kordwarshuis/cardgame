<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ subtext }}</p>
    <!-- <ol class="">
      <li v-for="category in categories" >
        <a href="">
          {{ category }}
        </a>
      </li>
    </ol> -->
    <button v-for="category in categories">{{ category }}</button>

    <div>

    </div>


  </div>
</template>

<script>
  import * as d3 from 'd3-dsv';
  import axios from "axios";
  export default {
    name: "Index",
    props: {
      msg: String
    },
    data() {
      return {
        subtext: "Help us get it right and send a card.",
        categories: null,
        categoryItems: null
      }
    },
    mounted: function () {
      this.fetchData()
    },
    methods: {
      fetchData2() {
        Promise.all([
          "https://blockchainbird.com/t/cardgame-resources/data/data-csv-cors.php"
        ].map(function (url) {
          return fetch(url).then(function (response) {
            return response.ok ? response.text() : Promise.reject(response.status);
          }).then(function (text) {
            return d3.csvParse(text);
          });
        })).then(function (value) {
          // console.log(value[0].length);

          // console.log(this.createCategoryNames(value[0]));
          // console.log(this.a(value[0]));
          a(value[0]);
        });
      },
      fetchData() {
        return axios.get("https://blockchainbird.com/t/cardgame-resources/data/data-csv-cors.php")
          .then(response => {
            // console.log('d3.csvParse(response.data): ', d3.csvParse(response.data));
            this.createCategoryNames(d3.csvParse(response.data));
            // return d3.csvParse(response.data);
          });
      },
      createCategoryNames(dataCardsAll) {
        console.log(dataCardsAll.length);
        var categoryNames = [];

        // make array with all categories
        // https://stackoverflow.com/a/14438954
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }

        // create array with all categories (to create a menu with all categories):
        for (var i = 0; i < dataCardsAll.length; i++) {
          categoryNames.push(dataCardsAll[i].Cat);
        }

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
        // var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
        // remove duplicate entries
        console.log(categoryNames.filter(onlyUnique));
        this.categories = categoryNames.filter(onlyUnique);
        // return categoryNames.filter(onlyUnique);
      },
      showCategoryItems() {

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