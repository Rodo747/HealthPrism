import { useState } from 'react'
import { PrismMark, BottomNav } from '../components/shared'
import { clearAll } from '../services/storageService'

const Row = ({ icon, title, desc, action, actionLabel, danger = false }) => (
  <div className="card" style={{ padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14 }}>
    <div style={{ width: 38, height: 38, borderRadius: 12, background: danger ? '#FDECEA' : '#EBF1FD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: danger ? '#E8291C' : '#1558D6' }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: '#08142E' }}>{title}</p>
      {desc && <p style={{ fontSize: 12, color: '#8496A9', marginTop: 2 }}>{desc}</p>}
    </div>
    {action && (
      <button onClick={action} style={{ background: danger ? 'linear-gradient(135deg,#E8291C,#FF4436)' : 'linear-gradient(135deg,#1558D6,#3B7FF5)', border: 'none', borderRadius: 999, padding: '8px 14px', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{actionLabel}</button>
    )}
  </div>
)

const Settings = () => {
  const [lang, setLang] = useState('en')
  const [cleared, setCleared] = useState(false)

  const handleClear = async () => {
    if (!window.confirm('Clear all local data? This cannot be undone.')) return
    await clearAll()
    setCleared(true)
    setTimeout(() => setCleared(false), 3000)
  }

  return (
    <div className="app-shell" style={{ paddingBottom: 80 }}>
      <div style={{ background: 'white', padding: '52px 20px 20px', borderBottom: '1px solid #D8E2EE', display: 'flex', alignItems: 'center', gap: 10 }}>
        <PrismMark size={28} />
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#08142E', fontFamily: 'Syne,sans-serif' }}>Settings</h1>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        <p className="hp-label" style={{ marginBottom: 10 }}>Language</p>
        <div className="card" style={{ padding: '14px 16px', marginBottom: 16, display: 'flex', gap: 8 }}>
          {[{ code: 'en', label: 'English' }, { code: 'es', label: 'Español' }].map(l => (
            <button key={l.code} onClick={() => setLang(l.code)} style={{ flex: 1, padding: '10px', borderRadius: 12, border: `1.5px solid ${lang === l.code ? '#1558D6' : '#D8E2EE'}`, background: lang === l.code ? '#EBF1FD' : 'white', color: lang === l.code ? '#1558D6' : '#3A4D66', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}>{l.label}</button>
          ))}
        </div>

        <p className="hp-label" style={{ marginBottom: 10 }}>About</p>
        <Row icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>} title="HealthPrism v1.0" desc="Clinical AI nutritional assessment for children" />
        <Row icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>} title="Privacy Policy" desc="All image processing is done locally on your device" />
        <Row icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>} title="Safety Notice" desc="HealthPrism is a screening tool, not a clinical diagnosis" />

        <p className="hp-label" style={{ marginBottom: 10, marginTop: 8 }}>Data</p>
        <Row
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>}
          title="Clear Local Data"
          desc="Remove all saved assessments from this device"
          action={handleClear}
          actionLabel={cleared ? 'Cleared!' : 'Clear'}
          danger
        />

        <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
          <p style={{ fontSize: 11, color: '#8496A9' }}>HealthPrism © 2024 · Built for GNEC Hackathon</p>
          <p style={{ fontSize: 11, color: '#8496A9', marginTop: 4 }}>SDG 3 — Health and Well-being</p>
        </div>
      </div>
      <BottomNav active="settings" />
    </div>
  )
}
export default Settings
