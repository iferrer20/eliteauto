module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/scss/_global.scss";
        @import "@/scss/_global.scss";
        `
      }
    }
  },
  devServer: {
    disableHostCheck: true,
    sockPath: "/dev/sockjs-node"
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/dev/'
};
