module.exports = {

  // https://cli.vuejs.org/config/#publicpath

  //=============
  // BTC version
  // publicPath: process.env.NODE_ENV === 'production' ? '/t/btc/' : '/',
  //=============

  //=============
  // BCB version
  // publicPath: process.env.NODE_ENV === 'production' ? '/t/bcb/' : '/',
  //=============

  //=============
  // Test version
  publicPath: process.env.NODE_ENV === 'production' ? '/t/cardgametest/' : '/',
  //=============


  
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