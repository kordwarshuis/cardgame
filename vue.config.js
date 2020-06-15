module.exports = {

  // https://cli.vuejs.org/config/#publicpath
  // publicPath: process.env.NODE_ENV === 'production' ? '/vue-cardgame/version2/' : '/',
  publicPath: process.env.NODE_ENV === 'production' ? '/t/btc/' : '/',
  
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