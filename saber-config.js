module.exports = {
  theme: './pln',
  permalinks: {
    page: '/:slug',
    post: '/:year/:month/:day/:slug'
  },
  siteConfig: {
    url: 'https://jungle.fm',
    title: 'theJungle',
    description: `The Jungle 由两个（终将不会年轻的）年轻人——王丹妮和高日天于 2017 年 8 月创办，是一档（暂时）没有主题的播客节目，两个人用声音记录他们（非极端）的思想和生活。

The Jungle 的名字来自于「concrete jungle」，有「年轻人在钢筋丛林中求生」之意。当然 The Jungle 也是旺盛的热带雨林，我们希望永远对灿烂广大的生活保持生命力，好奇心。巧合的是，这与枪花乐队的《welcome to the jungle》一曲表达了类似的思想。Welcome to the jungle 正是在欢迎你收听本档节目。也是在欢迎你跟我们一起来到这个人间丛林。

The Jungle 主要使用音频播客为载体，不定期更新图片与文字版本；主要是两个主播在录，不定期邀请朋友同录。

本站使用 Saber (https://saber.land/) 构建，托管于 Github (https://github.com/gaoryrt/fm4.me)，使用 Netlify (https://www.netlify.com/) 持续部署。没有他们就没有这个站，十分感谢。

您可以通过 hi@jungle.fm (mailto://hi@jungle.fm) 联系我们，通过 rss (https://jungle.fm/rss2.xml) 或 atom (https://jungle.fm/atom.xml) 订阅本站, 或者在本页面下方的留言板内留言（如果您能够看到的话），喜欢本节目也可以在这里捐助 (https://jungle.fm/donate) 支持我们。`,
    author: 'Dannie & Gaoryrt',
    keywords: ['podcast', 'indie', 'blog', 'thejungle', 'the jungle'],
    email: 'hi@jungle.fm',
    language: 'zh-Hans',
    itunes: {
      image: '/assets/cover1400.jpg',
      category: [
        {
          _attr: {
            text: 'Society & Culture'
          }
        }
      ],
      explicit: 'true'
    }
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
    },
    {
      resolve: 'saber-plugin-feed',
      options: {
        atomFeed: true,
        rss2Feed: true
      }
    }
  ],
  build: {
    extractCSS: process.env.NODE_ENV !== 'development'
  }
}
