import { useState, useRef, useCallback } from 'react'

export const useCamera = () => {
  const videoRef  = useRef(null)
  const streamRef = useRef(null)
  const [isActive, setIsActive]   = useState(false)
  const [error, setError]         = useState(null)
  const [facingMode, setFacingMode] = useState('environment')

  const start = useCallback(async (opts = {}) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: opts.facingMode || facingMode, width:{ideal:1280}, height:{ideal:720} },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play() }
      setIsActive(true); setError(null)
    } catch(e) { setError(e.message); setIsActive(false) }
  }, [facingMode])

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null; setIsActive(false)
  }, [])

  const flip = useCallback(() => {
    stop()
    setFacingMode(m => m === 'environment' ? 'user' : 'environment')
  }, [stop])

  const capture = useCallback(() => {
    if (!videoRef.current) return null
    const v = videoRef.current
    const c = document.createElement('canvas')
    c.width = v.videoWidth; c.height = v.videoHeight
    c.getContext('2d').drawImage(v, 0, 0)
    const dataURL = c.toDataURL('image/jpeg', 0.9)
    const img = new Image(); img.src = dataURL
    return { dataURL, imageElement: img }
  }, [])

  const recordFrames = useCallback((durationMs = 15000, fps = 30) => {
    return new Promise(resolve => {
      if (!videoRef.current) return resolve([])
      const v = videoRef.current
      const c = document.createElement('canvas')
      c.width = v.videoWidth || 640; c.height = v.videoHeight || 480
      const ctx = c.getContext('2d', { willReadFrequently: true })
      const frames = []
      const id = setInterval(() => {
        ctx.drawImage(v, 0, 0, c.width, c.height)
        // Capture ImageData for PPG analysis - limit to prevent memory issues
        if (frames.length < fps * 15) { // Max 15 seconds of frames
          frames.push(ctx.getImageData(0, 0, c.width, c.height))
        }
      }, 1000/fps)
      setTimeout(() => { 
        clearInterval(id); 
        resolve(frames) 
      }, durationMs)
    })
  }, [])

  return { videoRef, isActive, error, facingMode, start, stop, flip, capture, recordFrames }
}
