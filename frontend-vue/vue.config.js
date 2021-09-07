module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/scss/_global.scss";
        `
      }
    }
  },

  devServer: {
    disableHostCheck: true,
    sockPath: "/dev/sockjs-node"
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/dev/',

  pluginOptions: {
    i18n: {
      locale: 'es',
      fallbackLocale: 'es',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  }
};
