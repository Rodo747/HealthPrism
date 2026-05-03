/**
 * Breathing rate detection using Web Audio API.
 * Analyzes amplitude envelope of microphone input to detect
 * inhalation/exhalation cycles.
 */

/**
 * Calculates RMS (root mean square) amplitude of an audio buffer.
 * RMS gives a perceptually accurate measure of audio loudness.
 */
export const calculateRMS = (buffer) => {
  let sum = 0
  for (let i = 0; i < buffer.length; i++) {
    sum += buffer[i] * buffer[i]
  }
  return Math.sqrt(sum / buffer.length)
}

/**
 * Applies a moving average to smooth the amplitude envelope.
 */
export const smoothEnvelope = (envelope, windowSize = 10) => {
  const smoothed = []
  for (let i = 0; i < envelope.length; i++) {
    const start = Math.max(0, i - windowSize + 1)
    const window = envelope.slice(start, i + 1)
    smoothed.push(window.reduce((a, b) => a + b, 0) / window.length)
  }
  return smoothed
}

/**
 * Detects breath cycles from amplitude envelope.
 * A breath cycle = one rise (inhalation) + one fall (exhalation).
 * Returns breaths per minute.
 *
 * envelope: array of RMS values over time
 * sampleInterval: seconds between each envelope sample
 * threshold: minimum amplitude to count as a breath event
 */
export const detectBreathingRate = (envelope, sampleInterval = 0.1, threshold = 0.02) => {
  const smoothed = smoothEnvelope(envelope, 8)
  let crossings = 0
  let wasAbove = false

  for (let i = 0; i < smoothed.length; i++) {
    const isAbove = smoothed[i] > threshold
    if (isAbove && !wasAbove) crossings++  // Rising edge = inhalation start
    wasAbove = isAbove
  }

  const totalSeconds = envelope.length * sampleInterval
  const breathsPerMinute = Math.round((crossings / totalSeconds) * 60)

  // Physiologically plausible range: 8-60 breaths/min for children
  if (breathsPerMinute < 8 || breathsPerMinute > 60) return null
  return breathsPerMinute
}

/**
 * Sets up Web Audio API pipeline for breathing detection.
 * Returns { start, stop, getResult }
 */
export const createBreathingDetector = (durationMs = 15000) => {
  let audioContext = null
  let analyser = null
  let stream = null
  let envelope = []
  let intervalId = null

  const start = async () => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    const source = audioContext.createMediaStreamSource(stream)
    analyser = audioContext.createAnalyser()
    analyser.fftSize = 256
    source.connect(analyser)

    const buffer = new Float32Array(analyser.frequencyBinCount)
    // Sample envelope every 100ms
    intervalId = setInterval(() => {
      analyser.getFloatTimeDomainData(buffer)
      envelope.push(calculateRMS(buffer))
    }, 100)
  }

  const stop = () => {
    if (intervalId) clearInterval(intervalId)
    if (stream) stream.getTracks().forEach(t => t.stop())
    if (audioContext) audioContext.close()
  }

  const getResult = () => detectBreathingRate(envelope, 0.1)

  return { start, stop, getResult }
}
