export default ({ movinClassname, wrapperClassname }) => {
  var filters = document.querySelector(".filters"), // the SVG that contains the filters
    defs = filters.querySelector("defs"), // the  element inside the SVG
    blur = defs.querySelector("#blur"), // the blur filter
    blurFilter = blur.firstElementChild;
  const wrapperEl = document.querySelector(wrapperClassname)
  let wrapperWidth = wrapperEl.clientWidth
  let wrapperLeft = wrapperEl.getBoundingClientRect().left
  window.addEventListener('resize', () => {
    wrapperWidth = wrapperEl.clientWidth
    wrapperLeft = wrapperEl.getBoundingClientRect().left
  })
  document.querySelectorAll(wrapperClassname).forEach(el => {
    const movinEl = el.querySelector(movinClassname)
    const movinWidth = movinEl.clientWidth
    if (movinWidth <= wrapperWidth) return
    movinEl.style.filter = 'url("#blur")'
    let alt = 0, cur = 0, init = false
    const step = () => {
      const d = alt - cur
      cur += d / 7
      movinEl.style.transform = `translateX(${cur}px)`
      movinEl.style.webkitTransform = `translateX(${cur}px)`
      movinEl.style.opacity = 1 - Math.abs(d / 1000)
      if (d < 2 && d > -2) {
        init = false
        blurFilter.setAttribute('stdDeviation', '0,0')
      } else {
        try {
          requestAnimationFrame(step)
        } catch(_) {
          setImmediate(step)
        }
        blurFilter.setAttribute('stdDeviation', `${Math.abs(d / 50)}, 0`)
      }
    }
    el.addEventListener('mousemove', e => {
      alt = (wrapperWidth - movinWidth) * ((e.clientX - wrapperLeft) / wrapperWidth) * 1.1
      if (!init) {
        init = true
        step()
      }
    })
    el.addEventListener('mouseleave', () => {
      alt = 0
    })
  })
}
