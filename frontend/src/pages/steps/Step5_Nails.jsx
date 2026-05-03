import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheck } from '../../context/CheckContext'
import { useCamera } from '../../hooks/useCamera'
import { runNailsModel } from '../../ml/modelLoader'
import { StepHeader, BottomNav, TipCard, CameraView } from '../../components/shared'

const Step5_Nails = () => {
  const navigate = useNavigate()
  const { update } = useCheck()
  const { videoRef, error, start, stop, flip, capture } = useCamera()
  const [captured, setCaptured] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [score, setScore] = useState(null)

  useEffect(() => { start({ facingMode: 'environment' }); return () => stop() }, [start, stop])

  const handleCapture = async () => {
    const r = capture()
    if (!r) return
    setCaptured(r.dataURL)
    setAnalyzing(true)
    update({ nailImage: r.dataURL })
    const timeoutId = setTimeout(() => {
      setAnalyzing(false)
      setScore(50)
      update({ nailScore: 50 })
    }, 30000)
    try {
      const s = await runNailsModel(r.imageElement)
      clearTimeout(timeoutId)
      setScore(s)
      update({ nailScore: s })
    } catch(e) {
      clearTimeout(timeoutId)
      setScore(50)
      update({ nailScore: 50 })
    } finally {
      setAnalyzing(false)
    }
  }

  const scoreLabel = score == null ? null
    : score >= 65 ? { text: 'Pale nails detected', color: '#E8291C', bg: '#FDECEA' }
    : score >= 40 ? { text: 'Mild nail pallor', color: '#B45309', bg: '#FEF3C7' }
    : { text: 'Normal nail color', color: '#047857', bg: '#D1FAE5' }

  return (
    <div className="app-shell" style={{ paddingBottom: 100 }}>
      <StepHeader step={5} total={10} title="Nail Analysis" onBack={() => { stop(); navigate('/check/step4') }} />
      <div style={{ padding: '20px 20px 0' }}>

        {captured ? (
          <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', width: '100%', aspectRatio: '1' }}>
            <img src={captured} alt="captured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {analyzing && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,12,26,.8)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <div className="spin-anim" style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid rgba(255,255,255,.2)', borderTop: '3px solid #1558D6' }} />
                <p style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>Analyzing nails...</p>
              </div>
            )}
            {!analyzing && score != null && scoreLabel && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: scoreLabel.bg, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: scoreLabel.color }}>{scoreLabel.text}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: scoreLabel.color }}>{score}</span>
                  <span style={{ fontSize: 11, color: scoreLabel.color }}>/ 100</span>
                  <button onClick={() => { setCaptured(null); setScore(null); start({ facingMode: 'environment' }) }} style={{ background: 'rgba(0,0,0,.12)', border: 'none', color: scoreLabel.color, fontSize: 11, fontWeight: 700, padding: '5px 10px', borderRadius: 999, cursor: 'pointer' }}>Retake</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <CameraView videoRef={videoRef} shape="hand" instruction="Point the camera at your fingernails with good lighting" onCapture={handleCapture} onFlip={flip} accentColor="#1558D6" />
        )}

        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <TipCard variant="blue" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>} title="Lighting Tip" desc="Use bright natural light and remove nail polish for accurate results." />
          <TipCard variant="red" icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} title="Data Privacy" desc="This image is processed locally on your device." />
        </div>

        {score != null
          ? <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => { stop(); navigate('/check/step6') }}>Continue →</button>
          : <button className="btn-outline" style={{ marginTop: 16 }} onClick={() => { stop(); navigate('/check/step6') }}>Skip this step</button>
        }
      </div>
      <BottomNav active="assess" />
    </div>
  )
}
export default Step5_Nails