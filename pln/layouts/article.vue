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
      <div id="disqus_thread"></div>
    </div>
    <Footer/>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
  </div>
</template>

<script>
import Footer from '../components/footer'
import Meta from '../components/meta'
import jump from 'jump.js'

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
    const d = document
    const s = d.createElement('script')
    s.src = 'https://thejungle-1.disqus.com/embed.js'
    s.setAttribute('data-timestamp', +new Date())
    if (d.head) d.head.appendChild(s)
    else d.body.appendChild(s)
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
#disqus_thread {
  margin-left: 34.375%;
  width: 65.625%;
}
@media screen and (max-width: 800px) {
  .content {
    flex-direction: column;
  }
  .sections,
  .main-content,
  #disqus_thread {
    margin-left: 0;
    width: 100%;
  }
}
</style>
