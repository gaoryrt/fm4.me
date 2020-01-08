<template>
  <div class="min-height">
    <div class="center">
      <Title
        :title="page.title || 'untitled'"
        :src="page.radio"
        :cover="page.background"
        :artist="page.tags"
      />
      <!-- <div class="pln-meta">
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
      </div> -->
    </div>
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Footer from '../components/footer'
import Meta from '../components/meta'
import Title from '../components/audioTitle'
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
    Meta,
    Title
  },
  mounted() {

  },
  methods: {
    jump
  }
}
</script>

<style scoped>
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
.sections {
  width: 31.25%;
}
.pln-title._untitled {
  opacity: .1
}
@media screen and (max-width: 800px) {
  .center {
    margin-top: -140px;
  }
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
