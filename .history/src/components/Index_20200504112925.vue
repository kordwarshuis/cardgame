<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>



  </div>
</template>

<script>
  export default {
    name: "Index",
    props: {
      msg: String
    },
    mounted: function() {
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
          console.log(value);
        });


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