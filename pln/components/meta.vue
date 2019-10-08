<template>
  <div class="post-meta">
    <div class="post-meta_line">
      <img svg-inline class="icon" src="../assets/calendar-line.svg">
      {{ formatDate(post.createdAt) }}
    </div>
    <div
      class="post-meta_line"
      v-for="(objArr, idx) in [post.tagsInfo, post.categoriesInfo]"
      :key="idx"
      v-show ="objArr"
      @click.stop=""
    >
      <img class="icon" svg-inline v-if="idx" src="../assets/folder-3-line.svg">
      <img class="icon" svg-inline v-else src="../assets/price-tag-3-line.svg">
      <saber-link
        v-for="obj in objArr"
        :key="obj.name"
        :to="obj.permalink"
        class="a"
        v-html="obj.name"
      />
    </div>
  </div>
</template>

<script>
import formatDate from '../utils/formatDate'
export default {
  props: ['post'],
  methods: {
    formatDate(v) {
      return formatDate(v)
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
  .post-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .post-meta_line {
    font-size: 18px;
    line-height: 1.4;
  }
  .icon {
    margin: 0;
    background: transparent;
    height: 18px;
    width: 18px;
    display: inline-block;
    vertical-align: middle;
  }
  .a + .a {
    margin-left: 5px;
  }
</style>
