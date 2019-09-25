<template>
  <div class="audio--ctnr">
    <img class="bg" :src="background">
    <h4 :class="title ? '' : '_untitled'">{{title}}</h4>
    <div class="line">
      <div class="operate" @click="bw">
        <img :src="require('./arrow-go-back-line.svg')">
      </div>
      <div class="operate" @click="pp">
        <img v-if="paused" :src="require('./play-line.svg')">
        <img v-else :src="require('./pause-line.svg')">
      </div>
      <div class="operate" @click="ff">
        <img :src="require('./arrow-go-forward-line.svg')">
      </div>
    </div>
    <div class="curTime" ref="curTime"></div>
  </div>
</template>

<style scoped>
.audio--ctnr {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.bg {
  /* filter: blur(5px); */
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
}
.line {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
h4 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  line-height: 200px;
  text-align: center;
  color: #fff;
  font-weight: 900;
}
.audio--ctnr:hover h4 {
  opacity: 0;
}
.operate img {
  height: 24px;
  width: 24px;
  margin: 0;
  background: transparent;
}
.operate {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-grow: 1;
  height: 200px;
  opacity: 0;
  transition: all .2s
}
.operate:hover {
  backdrop-filter: blur(5px);
  /* background: rgba(0,0,0,.38) */
}
.audio--ctnr:hover .operate {
  opacity: 1;
}
.curTime {
  height: 4px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #282828;
}
@media screen and (max-width: 800px) {
  .audio--ctnr {
    width: 112%;
    margin-left: -6%;
  }
  .operate {
    backdrop-filter: blur(5px);
    opacity: 1;
  }
  h4 {
    opacity: 0;
  }
}
</style>

<script>
  export default {
    props: ['title', 'src', 'background'],
    data() {
      return {
        paused: true,
        audio: null
      }
    },
    components: {},
    mounted() {
      this.audio = new Audio(this.src)
      this.$nextTick(() => {
        this.audio.addEventListener('timeupdate', this.update)
      })
    },
    methods: {
      update() {
        const per = this.audio.currentTime * 100 / this.audio.duration + '%'
        this.$refs.curTime.style.width = per
      },
      ff() {
        this.audio.currentTime += 5
      },
      pp() {
        if (this.paused) {
          this.audio.play()
          this.paused = false
        } else {
          this.audio.pause()
          this.paused = true
        }
      },
      bw() {
        this.audio.currentTime -= 10
      }
    }
  }
</script>
