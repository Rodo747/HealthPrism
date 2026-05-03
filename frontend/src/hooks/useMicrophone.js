import { useState, useRef, useCallback } from 'react'

const calcRMS = (buf) => { let s=0; for(let i=0;i<buf.length;i++) s+=buf[i]*buf[i]; return Math.sqrt(s/buf.length) }

const detectBreathing = (envelope, interval=0.1, thr=0.02) => {
  const smooth = envelope.map((_, i) => {
    const w = envelope.slice(Math.max(0,i-7),i+1)
    return w.reduce((a,b)=>a+b,0)/w.length
  })
  let crosses=0, wasAbove=false
  smooth.forEach(v => { const a=v>thr; if(a&&!wasAbove) crosses++; wasAbove=a })
  const rpm = Math.round((crosses/(envelope.length*interval))*60)
  return (rpm>=8&&rpm<=60) ? rpm : null
}

export const useMicrophone = () => {
  const [isRecording, setIsRecording] = useState(false)
  const [error, setError] = useState(null)
  const stateRef = useRef({})

  const startBreathingAnalysis = useCallback(async (durationMs=15000) => {
    try {
      const ctx = new (window.AudioContext||window.webkitAudioContext)()
      const stream = await navigator.mediaDevices.getUserMedia({ audio:true, video:false })
      const source = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser(); analyser.fftSize=256
      source.connect(analyser)
      const buf = new Float32Array(analyser.frequencyBinCount)
      const envelope = []
      const id = setInterval(() => { analyser.getFloatTimeDomainData(buf); envelope.push(calcRMS(buf)) }, 100)
      stateRef.current = { ctx, stream, id, envelope }
      setIsRecording(true); setError(null)
      return new Promise(resolve => {
        setTimeout(() => {
          clearInterval(id); stream.getTracks().forEach(t=>t.stop()); ctx.close()
          setIsRecording(false)
          resolve(detectBreathing(envelope, 0.1))
        }, durationMs)
      })
    } catch(e) {
      // Cleanup on error
      const s = stateRef.current
      if(s && s.id) clearInterval(s.id)
      if(s && s.stream) s.stream.getTracks().forEach(t=>t.stop())
      if(s && s.ctx) s.ctx.close()
      setError(e.message); setIsRecording(false); return null
    }
  }, [])

  const stop = useCallback(() => {
    const s = stateRef.current
    if(s.id) clearInterval(s.id)
    if(s.stream) s.stream.getTracks().forEach(t=>t.stop())
    if(s.ctx) s.ctx.close()
    setIsRecording(false)
  }, [])

  return { isRecording, error, startBreathingAnalysis, stop }
}
