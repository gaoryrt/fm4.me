module.exports = {
  theme: './pln',
  permalinks: {
    page: '/:slug',
    post: '/:year/:month/:day/:slug'
  },
  siteConfig: {
    title: 'theJungle'
  },
  themeConfig: {
    nav: [
      {
        text: '关于',
        link: '/about'
      },
      {
        text: '捐助',
        link: '/donate'
      },
      {
        text: '存档',
        link: '/archive'
      }
    ]
  },
  plugins: [
    {
      resolve: 'saber-plugin-query-posts'
    }
  ]
}
