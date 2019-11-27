<template>
  <footer>
    <img class="footer-wave" :src="require('../assets/footer-wave.svg')">
    <div class="section">
      <img :src="require('../assets/doodle1.svg')" class="doodle d1">
      <img :src="require('../assets/doodle2.svg')" class="doodle d2">
      <div class="center">
        <h3 class="a" @click="$router.push('/')">the<span class="_green">Jungle</span></h3>
        <div class="links">
          <saber-link
            v-for="o in $themeConfig.nav"
            :key="o.text"
            v-html="o.text"
            class="a"
            :to="o.link"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  footer {
    position: relative;
    width: 100%;
    margin-top: 40px;
  }
  img.footer-wave {
    display: block;
    width: 100%;
    margin: 0;
  }
  .section {
    margin: -1px 0;
    background: #A8C885;
    padding-bottom: 20px;
  }
  .doodle {
    position: absolute;
  }
  .d1 {
    top: -2vw;
    left: 7vw;
    width: 45vw;
    max-width: 450px;
    mix-blend-mode: soft-light
  }
  .d2 {
    right: 5vw;
    bottom: 3vw;
    width: 20vw;
    max-width: 200px;
    mix-blend-mode: soft-light
  }
  h3 {
    margin-top: 0
  }
  .a:hover {
    cursor: pointer;
  }
  .a:hover ._green {
    transition: all .2s;
    color: #A8C885;
  }
  .center {
    transform: translate(-50%, -3vw);
  }
</style>
