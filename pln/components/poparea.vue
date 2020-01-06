<template>
  <div
    @touchstart="isDown = true"
    @mousedown="isDown = true"
    @touchend="isDown = false"
    @mouseup="isDown = false"
    @mouseleave="isDown = false"
    class="pop"
    :class="isDown ? '_down' : ''">
    <slot/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDown: false
    }
  }
}
</script>

<style scoped>
.pop {
  position: relative;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,.5);
  transition: all .08s;
  background: #f7f7f7;
  cursor: pointer;
}
.pop:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  box-shadow: 3px 3px 8px rgba(209, 205, 199, .5),
    -3px -3px 4px #fff;
  transition: all .08s;
}
.pop._down {
  transform: translate(1.5px, 1.5px);
  box-shadow: inset 3px 3px 8px rgba(209, 205, 199, .5),
    inset -3px -3px 4px #fff;
}
.pop._down:after {
  opacity: .3;
}
</style>
