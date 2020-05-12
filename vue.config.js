module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/test1310/cardgame-test/' : '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/css/_variables.scss";'
      }
    }
  }
};
