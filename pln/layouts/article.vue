<template>
  <div class="min-height">
    <div class="center">
      <h1
        class="pln-title"
        :class="page.title ? '' : '_untitled'"
      >{{page.title || 'untitled'}}</h1>
      <div class="pln-meta">
        <Meta :post="page"/>
      </div>
      <div class="content">
        <div class="sections">
          <div
            class="section"
            v-for="section in page.markdownHeadings"
            :key="section.text"
            @click.stop="jump('#' + section.slug)"
          >{{section.text}}</div>
        </div>
        <div class="main-content">
          <slot name="default"/>
        </div>
      </div>
      <div id="gitalk-container"></div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '../components/footer'
import Meta from '../components/meta'
import jump from 'jump.js'
import 'gitalk/dist/gitalk.css'
import Gitalk from 'gitalk'

export default {
  props: ['page'],
  head() {
    return {
      title: `${this.page.title} - ${this.$siteConfig.title}`
    }
  },
  transition: {
    appear: true
  },
  components: {
    Footer,
    Meta
  },
  mounted() {
    const gitalk = new Gitalk({
      clientID: 'b60be68b269396f59b24',
      clientSecret: '7b79614e73529612360f104d1c479664d3e087ee',
      repo: 'https://github.com/gaoryrt/fm4.me',
      owner: 'gaoryrt',
      admin: ['gaoryrt'],
      id: this.page.permalink,      // Ensure uniqueness and length less than 50
      distractionFreeMode: false  // Facebook-like distraction free mode
    })
    gitalk.render('gitalk-container')
  },
  methods: {
    jump
  }
}
</script>

<style scoped>
.sections {
  width: 31.25%;
}
.section {
  width: fit-content;
  cursor: pointer;
  opacity: .62;
  transition: opacity .2s;
}
.section:hover {
  opacity: 1;
}
.content {
  margin-top: 40px;
  display: flex;
}

.pln-title._untitled {
  opacity: .1
}
.line {
  display: flex;
}
@media screen and (max-width: 800px) {
  .content {
    flex-direction: column;
  }
  .sections,
  .main-content {
    margin-left: 0;
    width: 100%;
  }
}
</style>
