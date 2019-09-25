exports.getWebpackConfig = function(config, { type }) {
    // e.g. Adding a webpack plugin
    // config.plugins.push(new SomeWebpackPlugin())
  
    // `type` is either `client` or `server`
    if (type === 'client') {
    //   config.plugins.push(new SomeWebpackPluginForClientBuild())
    }
  
    // You must return the `config`!
    return config
  }
