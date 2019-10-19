module.exports = {
  theme: './pln',
  permalinks: {
    page: '/:slug',
    post: '/:year/:month/:day/:slug'
  },
  siteConfig: {
    url: 'https://jungle.fm',
    title: 'theJungle',
    description: '两个年轻人，用声音记录思想和生活',
    author: 'Dannie & Gaoryrt',
    keywords: ['podcast', 'indie', 'blog', 'thejungle', 'the jungle']
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
    },
    {
      resolve: 'saber-plugin-seo'
    },
    {
      resolve: 'saber-plugin-sitemap'
    }
  ],
  build: {
    extractCSS: process.env.NODE_ENV !== 'development'
  }
}
