<template>
  <div class="min-height">
    <div class="center">
      <h1 class="pln-title">{{ page.title }}</h1>
      <nav class="pln-meta"><p><b>{{ page.date }}</b></p></nav>
      <div style="margin-top: 40px">
        <slot name="default"/>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Footer from '../components/footer'

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
    Footer
  },
  mounted() {
    if (this.page.photos) {
      this.page.photos.forEach(imgSrc => {
        const el = document.querySelector('.center')
        const imgEl = document.createElement('IMG')
        imgEl.src = imgSrc
        el.appendChild(imgEl)

      })
    }
  }
}
</script>

<style scoped>

</style>
