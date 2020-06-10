module.exports = {
  
  // paths
  // https://cli.vuejs.org/config/#publicpath
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-cardgame/version2/' : '/',
  cardsContent: "https://blockchainbird.com/vue-cardgame/php/cards-csv-cors.php",
  realtimeTweetsScreenMessage: "json/screen-messages.json",
  realTimeTwitterJSON: "https://blockchainbird.com/t/twitter-phirehose/tweets-cors.php",
  scoresJSON: "https://blockchainbird.com/data/cardgamescores.php",

  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/css/_variables.scss";'
      }
    }
  },
  devServer: {//https://github.com/vuejs/vue-cli/issues/2051#issuecomment-420320469
    watchOptions: {
      poll: true
    }
  }
};