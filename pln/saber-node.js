exports.chainWebpack = function(chain) {
  chain.module
      .rule("vue")
      .use("vue-svg-inline-loader")
        .loader("vue-svg-inline-loader")
}

exports.getDocument = html => html.replace(
  'width=device-width, initial-scale=1.0',
  'width=device-width,initial-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover'
).replace(
  '<html data-saber-ssr>',
  '<html lang=zh-Hans data-saber-ssr>'
)
