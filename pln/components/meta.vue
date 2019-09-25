<template>
  <div class="post-meta">
    <div class="post-meta_line">{{ formatDate(post.createdAt) }}</div>
    <div
      class="post-meta_line"
      v-for="(objArr, idx) in [post.tagsInfo, post.categoriesInfo]"
      :key="idx"
    >
      <a
        v-for="(obj, idx) in objArr"
        :key="obj.name"
        @click.stop="$router.push(obj.permalink)"
      >
        <span class="a">{{obj.name}}</span>
        {{idx !== objArr.length - 1 ? ', ' : ''}}
      </a>
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
    font-weight: 600;
  }
  .a {
    position: relative;
    cursor: pointer;
  }
  .a::after {
    content: '';
    width: 100%;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #000;
    transition: opacity .2s;
    opacity: 0;
  }
  .a:hover::after {
    opacity: 1
  }
</style>
