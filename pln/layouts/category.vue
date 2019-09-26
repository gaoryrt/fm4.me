<template>
  <posts :page="page"/>
</template>

<script>
import posts from '../components/postByDate'
export default {
  props: ['page'],
  head() {
    return {
      title: `${this.page.slug} - ${this.$siteConfig.title}`
    }
  },
  components: {
    posts
  }
}
</script>
