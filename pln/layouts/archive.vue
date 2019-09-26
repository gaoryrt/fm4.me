<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" class="filters" height="0">
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0,0" />
        </filter>
      </defs>
    </svg>
    <div class="center">
      <h1 class="pln-title">Archive</h1>
      <div class="pln-meta">该分类下共有{{page.posts.length}}个帖子</div>

      <div v-for="year in postsByDate" :key="year.y" class="year-sec">
        <h4>{{year.y}}</h4>
        <div v-for="post in year.posts"
          :key="post.permalink"
          class="article"
        >
          <div class="post-time">{{formatDate(post.date)}}</div>
          <div class="title-wrapper">
            <div
              @click="clickPost(post)"
              class="post-title"
              :class="post.title ? '' : '_untitled'"
            >
              <h3>{{post.title || 'untitled'}}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
import reveal from '../utils/hoverReveal'

export const attributes = {
  title: 'archive',
  injectAllPosts: true
}
export default {
  props: ['page'],
  head() {
    return {
      title: `archive - ${this.$siteConfig.title}`
    }
  },
  computed: {
    postsByDate() {
      const yearArr = []
      const rtn = []
      const getYearAndMon = str => str.match(/^(\d+)-(\d+)-(\d+) /)
      this.page.posts.forEach(cur => {
        const [_, y, m, d] = getYearAndMon(cur.date)
        const yIdx = yearArr.indexOf(y)
        if (yIdx < 0) {
          rtn.push({
            y,
            posts: [cur]
          })
          yearArr.push(y)
        } else {
          rtn[yIdx].posts.push(cur)
        }
      })
      return rtn
    }
  },
  mounted() {
    this.$nextTick(() => {
      reveal({
        movinClassname: '.post-title',
        wrapperClassname: '.title-wrapper'
      })
    })
  },
  methods: {
    clickPost(post) {
      if (post.link) location.href = post.link
      else this.$router.push(post.permalink)
    },
    formatDate(str) {
      const [_, m, d] = str.match(/-(\d+)-(\d+)/)
      return `${m}-${d}`
    }
  }
}
</script>

<style scoped>
.year-sec {
  margin-top: 40px;
}
.article {
  display: flex;
  align-items: center;
  margin-top: 20px;
  transition: transform .2s;
}
.post-time {
  text-align: right;
  width: 31.25%;
  flex-shrink: 0;
}
.title-wrapper {
  overflow: hidden;
  margin-left: 3.125%;
  width: 65.625%;
}
.post-title {
  position: relative;
  white-space: nowrap;
  width: fit-content;
  margin-right: 0;
  cursor: pointer;
}
.post-title::after {
  content: '';
  width: 100%;
  height: 3px;
  position: absolute;
  bottom: 12%;
  left: 0;
  background: #000;
  transition: opacity .2s;
  opacity: 0;
}
.post-title:hover::after {
  opacity: 1;
}
.post-title._untitled {
  opacity: .1
}
._untitled {
  opacity: .1
}
</style>
