exports.chainWebpack = function(chain) {
  chain.module
      .rule("vue")
      .use("vue-svg-inline-loader")
        .loader("vue-svg-inline-loader")
}
