<template>
  <footer>
    <div class="section">
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
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .footer-wave {
    display: block;
    width: 100%;
    margin: 0;
  }
  .section {
    border-top: 1px solid rgba(255,255,255,.5);
    box-shadow: inset 0 3px 8px rgba(16, 16, 16, .1);
    background: #A8C885;
    padding: 40px 0;
  }
  .doodle {
    position: absolute;
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
    transform: translate(-50%, 0);
  }
</style>
