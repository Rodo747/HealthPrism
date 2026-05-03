import { useEffect, useState } from 'react'

const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState('in')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('out'), 2000)
    const t2 = setTimeout(() => onDone(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'linear-gradient(155deg, #08142E 0%, #4aa1db 60%, #4795c9 100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 20,
        opacity: phase === 'out' ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: 0, height: 0, borderLeft: '80px solid transparent', borderRight: '80px solid transparent', borderBottom: '140px solid rgba(198,231,239,.15)' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '5%', width: 0, height: 0, borderLeft: '50px solid transparent', borderRight: '50px solid transparent', borderBottom: '86px solid rgba(167,35,45,.15)' }} />

      <div style={{ animation: 'splashPop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <img src="/icon2.png" style={{ width: 100, height: 100, objectFit: 'contain', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))' }} />
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 32, fontWeight: 800, color: 'white', fontFamily: 'Syne,sans-serif', letterSpacing: '-.02em', margin: 0, lineHeight: 1 }}>HealthPrism</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', marginTop: 6 }}>Clinical AI · Child Health</p>
        </div>
      </div>

      <div style={{ width: 120, height: 3, background: 'rgba(255,255,255,.15)', borderRadius: 999, overflow: 'hidden', marginTop: 10 }}>
        <div style={{ height: '100%', background: 'white', borderRadius: 999, animation: 'splashBar 1.8s ease forwards' }} />
      </div>

      <style>{`
        @keyframes splashPop {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes splashBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  )
}
export default SplashScreen