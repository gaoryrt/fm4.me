<template>
  <posts :page="page"/>
</template>

<script>
import posts from '../components/postByDate'
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
  components: {
    posts
  }
}
</script>
