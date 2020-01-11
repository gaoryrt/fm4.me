<template>
  <div id="player">
    <div class="line-wrapper">
      <div class="line">
        <img :src="cover" class="left cover">
        <div class="ctrls right">
          <Pop class="btn pausePlay" @click.native="pausePlay">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16"><g fill="none" fill-rule="evenodd"><path d="M-1-4h24v24H-1z"/><path d="M8.394 8L2 3.737v8.526L8.394 8zm2.982.416L.777 15.482A.5.5 0 010 15.066V.934A.5.5 0 01.777.518l10.599 7.066a.5.5 0 010 .832zM14 1h2v14h-2V1zm6 0h2v14h-2V1z" fill-opacity=".8" fill="#2C3640" fill-rule="nonzero"/></g></svg>
            <div class="light" :class="lightStyle"></div>
          </Pop>
          <div class="infoCtnr">
            <div class="glass">
              <transition name="fade" mode="in-out">
                <div class="info" :key="infoKey" v-html="info"></div>
              </transition>
            </div>
            <div class="twoBtn">
              <Pop @click.native="ff" class="anticlock"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.667l9.223-6.149a.5.5 0 0 1 .777.416v14.132a.5.5 0 0 1-.777.416L12 13.333v5.733a.5.5 0 0 1-.777.416L.624 12.416a.5.5 0 0 1 0-.832l10.599-7.066a.5.5 0 0 1 .777.416v5.733zm-2 5.596V7.737L3.606 12 10 16.263zm10 0V7.737L13.606 12 20 16.263z" fill="#2C3640" fill-opacity=".8"/></svg></Pop>
              <Pop @click.native="bw" class="clock"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 13.333l-9.223 6.149A.5.5 0 0 1 2 19.066V4.934a.5.5 0 0 1 .777-.416L12 10.667V4.934a.5.5 0 0 1 .777-.416l10.599 7.066a.5.5 0 0 1 0 .832l-10.599 7.066a.5.5 0 0 1-.777-.416v-5.733zM10.394 12L4 7.737v8.526L10.394 12zM14 7.737v8.526L20.394 12 14 7.737z" fill="#2C3640" fill-opacity=".8"/></svg></Pop>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="info-line">
      <div class="title" v-html="title"></div>
    </div>
  </div>
</template>

<script>
import Pop from './poparea'
export default {
  props: ['src', 'cover', 'title', 'artist'],
  components: {Pop},
  data: () => ({
    speeds: [2, 1.4, 1, .7, .5],
    audio: null,
    musicReady: false,
    playing: false,
    currentTime: 0,
    bufferedTime: 0,
    duration: 0,
    curRate: 1,
    infoKey: 0,
    otherInfo: false,
    timeout: null
  }),
  methods: {
    ff() {
      this.audio.currentTime -= 10
      this.otherInfo = '-10 sec'
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => this.otherInfo = false, 1000)
    },
    bw() {
      this.audio.currentTime += 10
      this.otherInfo = '+10 sec'
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => this.otherInfo = false, 1000)
    },
    pausePlay() {
      if (!this.musicReady) return
      this.playing = !this.playing
    },
    sec2str(num) {
      const min = num / 60 >> 0
      const sec = num % 60 >> 0
      return `${min}:${sec < 10 ? ('0' + sec) : sec}`
    },
    onProg() {
      if (this.audio.buffered.length > 0) {
        this.duration = this.audio.duration
        const buffered = this.audio.buffered.end(0)
        this.bufferedTime = buffered > this.duration
          ? this.duration
          : buffered
        if (this.bufferedTime > this.currentTime) this.musicReady = true
      }
    }
  },
  mounted() {
    this.audio = new Audio(this.src)
    this.audio.onprogress = () => {
      try {
        this.onProg()
      } catch (e) {}
    }
    setTimeout(() => {
      this.musicReady = true
    }, 3000)
    this.audio.onplay = () => {
      setTimeout(() => {
        this.musicReady = true
      }, 100)
      if (!navigator.mediaSession) return
      navigator.mediaSession.metadata = new MediaMetadata({
        title: this.title,
        artist: this.artist.join(', '),
        album: 'the Jungle',
        artwork: [
          { src: this.cover }
        ]
      })
    }
    this.audio.ontimeupdate = () => {
      this.currentTime = this.audio.currentTime
    }
    this.audio.onstalled = () => {
      this.audio.load()
      this.playing = false
    }
    this.audio.onended = () => {
      this.playing = false
      this.currentTime = 0
    }
  },
  computed: {
    restTime() {
      return this.duration - this.currentTime
    },
    bufferedPercent() {
      return this.bufferedTime / this.duration
    },
    currentPercent() {
      return this.duration
        ? (this.currentTime * 100 / this.duration).toFixed(1) + '% '
        : ''
    },
    info() {
      if (this.musicReady) {
        if (this.otherInfo) return this.otherInfo
        else if (this.playing) return this.sec2str(this.currentTime) + ' playing'
        else if (this.currentTime === 0) return 'ready to play'
        else return this.currentPercent + 'paused'
      } else return 'loading'
    },
    lightStyle() {
      if (this.musicReady) {
        if (this.otherInfo) return '_seeking'
        else if (this.playing) return '_playing'
        else if (this.currentTime === 0) return '_ready'
        else return '_paused'
      } else return '_loading'
    }
  },
  watch: {
    info() {
      this.infoKey += 1
    },
    playing(curStatus) {
      this.$nextTick(() => {
        curStatus ? this.audio.play() : this.audio.pause()
      })
    }
  },
  beforeDestroy() {
    this.audio.pause()
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.line-wrapper {
  position: relative;
  width: 100%;
  padding-top: 31.25%;
}
.line {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.left {
  width: 31.25%;
  height: 100%;
}
.cover {
  border-radius: 8px;
}
.ctrls {
  display: flex;
}
.right {
  position: relative;
  margin-left: 3.125%;
  flex-grow: 1;
  height: 100%;
}
.infoCtnr,
.pausePlay {
  position: relative;
  width: 47.62%;
  height: 100%;
}
.anticlock svg,
.clock svg,
.pausePlay svg {
  height: 36px;
  width: 36px;
  position: absolute;
  top: calc(50% - 18px);
  left: calc(50% - 18px);
}
.light {
  position: relative;
  top: 8px;
  left: 8px;
  height: 8px;
  width: 8px;
  border-radius: 100%;
  transition: all .2s;
}
._seeking {
  background: #FAEF00;
  box-shadow: 0 0 8px #FAEF00,
  inset 0 0 3px rgba(16, 16, 16, .2);
  border: .5px solid rgb(245, 233, 0);
  border-top-color: rgb(236, 225, 0);
  border-left-color: rgb(236, 225, 0);
  animation: blink .5s infinite;
}
._playing,
._ready {
  background: #09FA72;
  box-shadow: 0 0 8px #09FA72,
  inset 0 0 3px rgba(16, 16, 16, .2);
  border: .5px solid rgb(9, 240, 109);
  border-top-color: rgb(12, 233, 107);
  border-left-color: rgb(12, 233, 107);
}
._paused,
._loading {
  background: #F94645;
  box-shadow: 0 0 8px #F94645,
  inset 0 0 3px rgba(16, 16, 16, .2);
  border: .5px solid rgb(241, 64, 64);
  border-top-color: rgb(236, 61, 61);
  border-left-color: rgb(236, 61, 61);
}
@keyframes blink {
  75% {
    background: #f0f0f0;
    box-shadow: 0 0 8px #fff,
    inset 0 0 3px rgba(16, 16, 16, .2);
    border: 0;
  }
}
.anticlock svg,
.clock svg {
  height: 30px;
  width: 30px;
  top: calc(50% - 15px);
  left: calc(50% - 15px);
}
.infoCtnr {
  margin-left: 4.76%;
}
.glass {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  height: 45%;
  background: #000604;
  border-radius: 8px;
  box-shadow: 3px 3px 8px rgba(16, 16, 16, .4),
    -3px -3px 8px rgba(48, 48, 48, .2);
  border: #283039 solid 3px;
  border-left-color: #3C4855;
  border-top-color: #37434F;
}
.info {
  font-family: thinpixel;
  font-size: 28px;
  line-height: 1;
  text-align: left;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #57CDD0;
  text-shadow: 0 0 .1em #57CDD0;
  transform: translate3d(0, 2px, 0) skewX(-5deg);
  -webkit-box-reflect: below -7px linear-gradient(transparent, transparent 57%, #222);
}
.twoBtn {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10%;
  height: 45%;
}
.anticlock,
.clock {
  position: relative;
  width: 45%;
}
.cur,
.res,
/* .speed-toggle, */
.loading {
  font-size: 12px;
  color: #aaa;
  font-family: monospace;
  padding: 0 1em;
  text-align: right;
  line-height: 18px;
}
.info-line {
  margin-top: 40px;
}
.title {
  font-size: 24px;
  line-height: 1.4;
  font-weight: 600;
  color: #000;
  width: 100%;
}
.time {
  position: relative;
  margin-left: 3.125%;
  flex-grow: 1;
  padding: 22px 16px;
}
.cur,
.res {
  position: absolute;
  bottom: 0;
  padding: 0 1em;
}
.cur {
  left: 0
}
.res {
  right: 0;
}
.scale {
  position: absolute;
  bottom: 0;
  width: 1px;
  background: #aaa;
}
.reticle {
  position: absolute;
  top: 10%;
  left: 0;
  width: 4px;
  border-radius: 4px;
  background: rgba(77, 150, 0, 0.38);
  height: 80%;
}
._10 {
  height: 14px;
}
._5 {
  height: 6px;
}
@media screen and (max-width: 800px) {
  .line {
    position: relative;
    flex-direction: column;
  }
  .line-wrapper {
    padding-top: 20px;
  }
  .time {
    margin-left: 0;
    margin-top: 20px;
  }
  .btn,
  .infoCtnr {
    position: absolute;
    top: 0;
  }
  .infoCtnr {
    right: 0;
  }
  .pausePlay {
    left: 0;
  }
  .right {
    margin-top: 20px;
    padding-top: 47.62%;
    position: relative;
    margin-left: 0;
  }
  .left, .right {
    width: 100%;
  }
  .glass {
    padding: 20px 5vw;
  }
  .info {
    font-size: 6vw;
  }
}
</style>
