<template>
  <posts :page="page"/>
</template>

<script>
import posts from '../components/postByDate'
export default {
  props: ['page'],
  head() {
    return {
      title: `${this.page.title} - ${this.$siteConfig.title}`
    }
  },
  components: {
    posts
  }
}
</script>
