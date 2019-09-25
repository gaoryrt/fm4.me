<template>
  <div>
    <div class="center">
      <h1 class="pln-title">{{page.category}}</h1>
      <div class="pln-meta">该分类下共有{{page.posts.length}}个帖子</div>

      <div v-for="year in postsByDate" :key="year.y" class="year-sec">
        <h4>{{year.y}}</h4>
        <div v-for="post in year.posts"
          :key="post.permalink"
          class="article"
        >
          <div class="post-time">{{formatDate(post.date)}}</div>
          <h3 @click="clickPost(post)" class="post-title" :class="post.title ? '' : '_untitled'">{{post.title || 'untitled'}}</h3>
        </div>
      </div>


    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  props: ['page'],
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
  overflow: hidden;
  transition: transform .2s;
  border: 1px solid transparent
}
.post-time {
  text-align: right;
  width: 31.25%;
}
.post-title {
  cursor: pointer;
  margin-left: 3.125%;
  max-width: 65.625%;
}
.post-title._untitled {
  opacity: .1
}
</style>
