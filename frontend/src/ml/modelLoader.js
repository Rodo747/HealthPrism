import * as tf from '@tensorflow/tfjs'

const cache = {}

export const loadModel = async (name) => {
  if (cache[name]) return cache[name]
  try {
    const m = await tf.loadLayersModel(`/models/${name}/model.json`)
    cache[name] = m
    return m
  } catch (e) {
    console.warn(`Model ${name} failed to load:`, e.message)
    return null
  }
}

export const preprocessImage = (el, size = 160) => tf.tidy(() => {
  const t = tf.browser.fromPixels(el)
  const r = tf.image.resizeBilinear(t, [size, size])
  return r.div(255.0).expandDims(0)
})

const heuristic = (el) => {
  const c = document.createElement('canvas')
  c.width = 224; c.height = 224
  const ctx = c.getContext('2d')
  ctx.drawImage(el, 0, 0, 224, 224)
  const d = ctx.getImageData(56, 56, 112, 112).data
  let r = 0, g = 0, b = 0, n = 0
  for (let i = 0; i < d.length; i += 4) { r += d[i]; g += d[i+1]; b += d[i+2]; n++ }
  const br = (r + g + b) / (3 * n)
  const rr = (r / n) / (br + 1)
  return Math.min(Math.max(Math.round((br / 255) * 60 + (1 - (rr - 1) / 0.5) * 40), 0), 100)
}

export const runConjunctivaModel = async (el) => {
  const m = await loadModel('conjunctiva')
  if (!m) return heuristic(el)
  const t = preprocessImage(el, 160)
  const p = m.predict(t)
  const s = await p.data()
  tf.dispose([t, p])
  // s[0] = probabilidad de anemia (0=anémico, 1=normal en nuestro modelo)
  // Invertimos: score alto = más anémico
  return Math.round((1 - s[0]) * 100)
}

export const runHandModel = async (el) => {
  const m = await loadModel('palm')
  if (!m) return heuristic(el)
  const t = preprocessImage(el, 160)
  const p = m.predict(t)
  const s = await p.data()
  tf.dispose([t, p])
  return Math.round((1 - s[0]) * 100)
}

export const runNailsModel = async (el) => {
  const m = await loadModel('nails')
  if (!m) return heuristic(el)
  const t = preprocessImage(el, 160)
  const p = m.predict(t)
  const s = await p.data()
  tf.dispose([t, p])
  return Math.round((1 - s[0]) * 100)
}