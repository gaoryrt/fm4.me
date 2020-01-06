<template>
  <div id="player">
    <div class="line-wrapper">
      <div class="line">
        <img :src="cover" class="left cover">
        <div class="ctrls right">
          <Pop class="btn pausePlay" @click.native="pausePlay">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 16"><g fill="none" fill-rule="evenodd"><path d="M-1-4h24v24H-1z"/><path d="M8.394 8L2 3.737v8.526L8.394 8zm2.982.416L.777 15.482A.5.5 0 010 15.066V.934A.5.5 0 01.777.518l10.599 7.066a.5.5 0 010 .832zM14 1h2v14h-2V1zm6 0h2v14h-2V1z" fill-opacity=".8" fill="#2C3640" fill-rule="nonzero"/></g></svg>
          </Pop>
          <Pop class="btn speed" @click.native="changeSpeed">
            <svg :class="`_${curRate * 10}`" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="rgba(44, 54, 64,.8)"/></svg>
            <div class="speeds">
              <div
                class="speed-toggle"
                v-for="speed in speeds"
                :key="speed"
                v-html="speed"
              ></div>
            </div>
          </Pop>
        </div>
      </div>
    </div>
    <div class="info-line">
      <div class="left title" v-html="title"></div>
      <Pop class="time">
        <div class="cur" v-html="sec2str(currentTime)"/>
        <div class="res" v-html="duration ? sec2str(restTime) : '--:--'"/>
        <div
          class="scale"
          :class="i % 2 ? '_5' : '_10'"
          v-for="i in duration / 300 >> 0"
          :key="i"
          :style="`left:${i * 30000 / duration}%`"
        />
        <div class="reticle" :style="`left:${currentPercent * 100}%`"></div>
      </Pop>
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
    curRate: 1
  }),
  methods: {
    pausePlay() {
      if (!this.musicReady) return
      this.playing = !this.playing
    },
    changeSpeed() {
      if (!this.musicReady) return
      const idx = (this.speeds.indexOf(this.curRate) + 4) % 5
      this.curRate = this.speeds[idx]
      this.audio.playbackRate = this.curRate
    },
    sec2str(num) {
      const min = num / 60 >> 0
      const sec = num % 60 >> 0
      return `${min}:${sec < 10 ? ('0' + sec) : sec}`
    },
  },
  mounted() {
    this.audio = new Audio(this.src)
    this.audio.onprogress = () => {
      try {
        if (this.audio.buffered.length > 0) {
          this.duration = this.audio.duration
          const buffered = this.audio.buffered.end(0)
          this.bufferedTime = buffered > this.duration
            ? this.duration
            : buffered
          if (this.bufferedTime > this.currentTime) this.musicReady = true
        }
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
      return this.currentTime / this.duration
    }
  },
  watch: {
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
.btn {
  cursor: pointer;
  transition: all .2s
}
.speed,
.pausePlay {
  position: relative;
  width: 47.62%;
  height: 100%;
}
.pausePlay svg {
  height: 36px;
  width: 36px;
  position: absolute;
  top: calc(50% - 18px);
  left: calc(50% - 18px);
}
.speed {
  margin-left: 4.76%;
}
.speed svg {
  height: 36px;
  width: 36px;
  position: absolute;
  top: calc(50% - 18px);
  left: calc(50% - 18px);
  transition: all .2s;
}
.speed svg._5 {
  transform: rotate(45deg)
}
.speed svg._7 {
  transform: rotate(22.5deg)
}
.speed svg._10 {
  transform: rotate(0)
}
.speed svg._14 {
  transform: rotate(-22.5deg)
}
.speed svg._20 {
  transform: rotate(-45deg)
}

.speeds {
  position: absolute;
  height: 100%;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  justify-content: space-evenly;
}
.cur,
.res,
.speed-toggle,
.loading {
  font-size: 12px;
  color: #aaa;
  font-family: monospace;
  padding: 0 1em;
  text-align: right;
  line-height: 18px;
}
.info-line {
  position: relative;
  margin-top: 20px;
  display: flex;
}
.title {
  font-size: 18px;
  line-height: 18px;
  font-weight: 600;
  color: #000;
  white-space: nowrap;
  width: 31.25%;
  overflow: hidden;
  text-overflow: ellipsis;
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
  .info-line {
    position: relative;
    margin-top: 20px;
    flex-direction: column;
  }
  .line-wrapper {
    padding-top: 20px;
  }
  .time {
    margin-left: 0;
    margin-top: 20px;
  }
  .btn {
    position: absolute;
    top: 0;
  }
  .pausePlay {
    left: 0;
  }
  .speed {
    right: 0;
    /* display: none; */
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
}
</style>
