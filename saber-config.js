module.exports = {
  theme: './pln',
  permalinks: {
    page: '/:slug',
    post: '/:year/:month/:day/:slug'
  },
  siteConfig: {
    title: 'theJungle'
  },
  // build: {
  //   extractCSS: true
  // },
  plugins: [
    {
      resolve: 'saber-plugin-query-posts'
    }
  ]
}
