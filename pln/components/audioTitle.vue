<template>
  <div class="audio--ctnr">
    <img class="cover" :src="cover">
    <h4 :class="title ? '' : '_untitled'" v-html="title"/>
    <div class="controler">
      <!-- <div class="operate" @click="bw" v-show="!paused">
        <img svg-inline src="../assets/rotate-ccw.svg">
      </div> -->
      <div class="operate" @click="pp">
        <img svg-inline v-if="paused" src="../assets/play.svg">
        <img svg-inline v-else src="../assets/pause-line.svg">
      </div>
      <!-- <div class="operate" @click="ff" v-show="!paused">
        <img svg-inline src="../assets/rotate-cw.svg">
      </div> -->
    </div>
    <div class="time" ref="time">
      <div class="cur" v-html="cur"/>
      <div class="dur" v-html="sec2str(dur)"/>
      <div class="line" ref="curTime"></div>
      <div
        class="scale"
        :class="i % 2 ? '_5' : '_10'"
        v-for="i in dur / 300 >> 0"
        :key="i"
        :style="`left:${i * 30000 / dur}%`"
      />
    </div>
  </div>
</template>

<style scoped>
.audio--ctnr {
  position: relative;
  display: flex;
  width: 100%;
  align-items: stretch;
}
.cover {
  margin: 0;
  width: 31.25%;
}
.controler {
  display: flex;
  flex-grow: 1;
  margin-left: 3.125%;
  align-items: stretch;
  justify-content: space-between;
}
.operate {
  cursor: pointer;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .3s;
  background: linear-gradient(135deg, transparent, transparent)
}
.operate:hover {
  background: #fafafa;
}
h4 {
  position: absolute;
  left: 0;
  bottom: 0;
  padding-left: .2em;
  white-space: nowrap;
  width: 31.25%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #538A18;
  background: rgba(255, 255, 255, .62);
  backdrop-filter: blur(4px)
}
.time {
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  line-height: 1;
  font-size: 12px;
  width: 65.625%;
  font-weight: 300;
  pointer-events: none;
}
.line {
  position: absolute;
  bottom: 0;
  width: 0;
  height: 32px;
  border-right: 1px solid #538A18;
}
.scale {
  position: absolute;
  bottom: 0;
  width: 1px;
  background: #000;
}
._10 {
  height: 10px;
}
._5 {
  height: 6px;
}
@media screen and (max-width: 800px) {
  .audio--ctnr {
    flex-direction: column;
  }
  .cover {
    margin: 0;
    margin-left: -5.55%;
    width: 111.11%;
  }
  h4 {
    width: 100%;
    bottom: 205px;
  }
  .controler {
    height: 200px;
    margin-left: -5.55%;
    width: 111.11%;
  }
  .time {
    width: 100%;
  }
}
</style>

<script>
  export default {
    props: ['title', 'src', 'cover'],
    data() {
      return {
        paused: true,
        audio: null,
        cur: '-:--',
        dur: '--:--'
      }
    },
    components: {},
    mounted() {
      this.$nextTick(() => {
        this.audio = new Audio(this.src)
        this.audio.addEventListener('canplay', () => {
          this.update()
          this.dur = this.audio.duration
        })
        this.audio.addEventListener('timeupdate', this.update)
      })
    },
    beforeDestroy() {
      this.audio.pause()
    },
    methods: {
      sec2str(num) {
        const min = num / 60 >> 0
        const sec = num % 60 >> 0
        return `${min}:${sec < 10 ? ('0' + sec) : sec}`
      },
      update() {
        if (!this.$refs.curTime) return
        const cur = this.audio.currentTime
        const dur = this.audio.duration
        const per = cur * 100 / dur + '%'
        this.$refs.curTime.style.left = per
        this.cur = this.sec2str(cur)
      },
      ff() {
        this.audio.currentTime += 15
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
