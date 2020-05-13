module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-cardgame/' : '/',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/css/_variables.scss";'
      }
    }
  }
};
