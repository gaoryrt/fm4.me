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
      <h1 class="pln-title">the<span class="_green">Jungle</span></h1>
      <nav class="pln-meta">
        <saber-link class="a" to="/about">关于</saber-link>
        <saber-link class="a" to="/donate">捐助</saber-link>
        <saber-link class="a" to="/archive">存档</saber-link>
      </nav>
      <div v-if="page.posts">
        <div v-for="post in page.posts"
          :key="post.permalink"
          class="article"
          @click="clickPost(post)"
        >
          <h2
            class="post-title"
            :class="post.title ? '' : '_untitled'"
          >{{post.title || 'untitled'}}</h2>
          <div class="post-info">
            <Meta class="post-meta" :post="post"/>
            <div class="post-excerpt" v-html="post.excerpt"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Meta from '../components/meta'
import reveal from '../utils/hoverReveal'
import curDot from 'cursor-dot'

export default {
  props: ['page'],
  head() {
    return {
      title: `${this.$siteConfig.title}`
    }
  },
  mounted() {
    this.$nextTick(() => {
      reveal({
        movinClassname: '.post-title',
        wrapperClassname: '.article'
      })
    })
  },
  components: {
    Meta
  },
  methods: {
    clickPost(post) {
      if (post.link) location.href = post.link
      else this.$router.push(post.permalink)
    }
  }
}
</script>

<style scoped>
  ._green {
    color: #538A18
  }
  .article {
    margin-top: 80px;
    min-height: 200px;
    cursor: pointer;
    overflow: hidden;
    margin-left: 34.375%;
    width: 65.625%;
    transition: transform .2s;
    border: 1px solid transparent
  }
  .article:first-of-type {
    margin-top: 40px;
  }
  .post-title {
    position: relative;
    white-space: nowrap;
    width: fit-content;
    height: 96px;
    transition: color .2s;
  }
  .article:hover .post-title {
    color: #538A18
  }
  .post-title._untitled {
    opacity: .1
  }
  .post-info {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .post-meta, .post-excerpt {
    width: 47.62%;
  }
  @media screen and (max-width: 800px) {
    .article {
      margin-left: 0;
      width: 100%;
    }
    .post-meta {
      width: 31.25%;
    }
    .post-excerpt {
      margin-left: 3.125%;
      width: 65.625%;
    }
    .post-title {
      height: auto;
      white-space: normal;
    }
    .post-title::after {
      background: transparent
    }
  }
</style>
