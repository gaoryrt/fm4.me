<template>
  <div class="post-meta">
    <div class="post-meta_line"><img :src="require('./calendar-line.svg')" class="icon"> {{ formatDate(post.createdAt) }}</div>
    <div
      class="post-meta_line"
      v-for="(objArr, idx) in [post.tagsInfo, post.categoriesInfo]"
      :key="idx"
      v-show ="objArr"
    >
      <img :src="idx ? require('./price-tag-3-line.svg') : require('./folder-3-line.svg')" class="icon">
      <a
        v-for="obj in objArr"
        :key="obj.name"
        @click.stop="$router.push(obj.permalink)"
      >
        <span class="a">{{obj.name}} </span>
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
  .post-meta_line {
    height: 24px;
    line-height: 24px;
  }
  .icon {
    margin: 0;
    background: transparent;
    height: 18px;
    width: 18px;
    display: inline-block;
    vertical-align: middle;
  }
</style>
