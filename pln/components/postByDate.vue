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
      <h1 class="pln-title" v-html="page.title || page.slug"></h1>
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
  computed: {
    postsByDate() {
      const yearArr = []
      const rtn = []
      const getYearAndMon = str => {
        return str
        ? str.match(/^(\d+)-(\d+)-(\d+) /)
        : [0, 'unknown', '', '']
      }
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
      if (str) {
        const [_, m, d] = str.match(/-(\d+)-(\d+)/)
        return `${m}-${d}`
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.pln-title {
  color: #538A18;
}
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
.post-title h3 {
  transition: color .2s;
  font-weight: 400;
}
.post-title:hover h3 {
  color: #538A18
}
.post-title._untitled {
  opacity: .1
}
._untitled {
  opacity: .1
}
@media screen and (max-width: 800px) {
  .article {
    align-items: flex-start;
  }
  .post-title {
    height: auto;
    white-space: normal;
  }
  .post-title::after {
    background: transparent
  }
  .post-time {
    line-height: 34px;
  }
}
</style>
