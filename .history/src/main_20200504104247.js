import Vue from "vue";
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import d3Dsv from "d3-dsv";
import * as d3 from 'd3-dsv';

Vue.use(d3);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// console.log(d3);
var path = "../data-proxy.php";

// var data = d3.csvParse("https://blockchainbird.com/t/cardgame-resources/data/data.csv", d3.autoType);
// console.log('data: ', data);

// d3.csvFormatRows("https://blockchainbird.com/t/cardgame-resources/data/data.csv", function(d) {
//   console.log(d);
//   // return {
//   //   year: new Date(+d.Year, 0, 1), // lowercase and convert "Year" to Date
//   //   make: d.Make, // lowercase
//   //   model: d.Model, // lowercase
//   //   length: +d.Length // lowercase and convert "Length" to number
//   // };
// });


// d3.text("https://blockchainbird.com/t/cardgame-resources/data/data.csv", function(error, raw){
// 	var dsv = d3.dsvFormat(",");
//   var data = dsv.parse(raw);
//   console.log('data: ', data);
//     // do whatever you want with data
// })

// var test = d3.csv("https://blockchainbird.com/t/cardgame-resources/data/data.csv", d3.autoType)
// console.log('test: ', test);

// console.log(d3.csvFormatRows);

// var test = d3.autoType("https://blockchainbird.com/t/cardgame-resources/data/data.csv");
var test = d3.autoType("https://blockchainbird.com/t/cardgame-resources/data/data-proxy.php");
console.log('test: ', test);

// https://itnext.io/anyway-heres-how-to-do-ajax-api-calls-with-vue-js-e71e57d5cf12

// export default {
    // function getScores() {
    //     return axios.get("https://blockchainbird.com/t/cardgame-resources/data/data-proxy.php")
    //         .then(response => {
    //           console.log(response.data);  
    //           // this.results = response.data.gamedata;
    //           //   return this.results;
    //         });
    // }
    // getScores();
  // };


  // axios({
  //   url: "https://blockchainbird.com/t/cardgame-resources/data/data-proxy.php",
  //   // url: "https://blockchainbird.com/t/cardgame-resources/data/data.csv",
  //   // url: "https://blockchainbird.com/t/cardgame-resources/data/data-csv-cors.php",
  //   method: 'GET',
  //   responseType: 'csv', // important
  // }).then((response) => {
  //   console.log('response: ', response);

  // });


  // Promise.all([
  //   "https://blockchainbird.com/t/cardgame-resources/data/data-csv-cors.php"
  // ].map(function(url) {
  //   return fetch(url).then(function(response) {
  //     return response.ok ? response.text() : Promise.reject(response.status);
  //   }).then(function(text) {
  //     return d3.csvParse(text);
  //   });
  // })).then(function(value) {
  //   console.log(value);
  // });