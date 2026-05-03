import { useState } from 'react'
import { PrismMark, BottomNav } from '../components/shared'
import { clearAll } from '../services/storageService'

const Row = ({ icon, title, desc, action, actionLabel, danger = false }) => (
  <div className="card" style={{ padding: '14px 16px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, borderLeft: danger ? '3px solid #a7232d' : 'none', background: danger ? '#fdecea' : 'white' }}>
    <div style={{ width: 42, height: 42, borderRadius: 12, background: danger ? '#fdecea' : '#e8f4fa', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: danger ? '#a7232d' : '#4795c9' }}>{icon}</div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: '#08142E' }}>{title}</p>
      {desc && <p style={{ fontSize: 12, color: '#8496A9', marginTop: 2 }}>{desc}</p>}
    </div>
    {action && (
      <button onClick={action} style={{ background: danger ? 'linear-gradient(135deg,#a7232d,#c42b36)' : 'linear-gradient(135deg,#4795c9,#4aa1db)', border: 'none', borderRadius: 999, padding: '8px 14px', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer', boxShadow: danger ? '0 4px 14px rgba(167,35,45,.25)' : '0 4px 14px rgba(71,149,201,.25)' }}>{actionLabel}</button>
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
      <div style={{background:'white',position:'relative',overflow:'hidden'}}>
        {/* Prism bg decorations */}
        <div style={{position:'absolute',top:-10,right:10,width:0,height:0,borderLeft:'60px solid transparent',borderRight:'60px solid transparent',borderBottom:'104px solid rgba(71,149,201,.06)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:20,right:60,width:0,height:0,borderLeft:'36px solid transparent',borderRight:'36px solid transparent',borderBottom:'62px solid rgba(167,35,45,.05)',pointerEvents:'none'}}/>
        {/* Topbar */}
        <div style={{padding:'52px 20px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <img src="/icon.png" style={{ width: 70, height: 70, objectFit: 'contain' }} />
            <span style={{fontSize:18,fontWeight:800,color:'#08142E',fontFamily:'Syne,sans-serif',letterSpacing:'-.02em'}}>HealthPrism</span>
          </div>
          <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,#4795c9,#4aa1db)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#8496A9', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 12 }}>Preferences</p>
        <div className="card" style={{ padding: '12px', marginBottom: 16, display: 'flex', gap: 8, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          {[{ code: 'en', label: 'English', flag: '🇬🇧' }].map(l => (
            <button key={l.code} onClick={() => setLang(l.code)}
              style={{ flex: 1, padding: '12px 8px', borderRadius: 10, border: `2px solid ${lang === l.code ? '#4795c9' : '#e2e8f0'}`, background: lang === l.code ? '#e8f4fa' : 'white', color: lang === l.code ? '#1a3a5c' : '#4a5568', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', transition: 'all .2s' }}>
              <span style={{ fontSize: 18, marginRight: 4 }}>{l.flag}</span>
              {l.label}
            </button>
          ))}
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, color: '#8496A9', letterSpacing: '.08em', textTransform: 'uppercase', margin: '20px 0 12px' }}>Application</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          <Row icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4795c9" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>} title="Version Info" desc="HealthPrism v1.0.2 — Clinical AI for children" />
          <Row icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a7232d" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>} title="Privacy Policy" desc="Encrypted local processing, zero data sharing" />
          <Row icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4795c9" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>} title="Safety Notice" desc="Screening tool only, not a clinical diagnosis" />
        </div>

        <p style={{ fontSize: 11, fontWeight: 700, color: '#8496A9', letterSpacing: '.08em', textTransform: 'uppercase', margin: '20px 0 12px' }}>Data Management</p>
        <Row
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a7232d" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>} title="Clear Local Data" desc="Remove all saved assessments from this device" action={handleClear} actionLabel={cleared ? '✓ Cleared!' : 'Clear Data'} danger />
      </div>

      <div style={{ textAlign: 'center', padding: '20px 0 24px', borderTop: '1px solid #e2e8f0', margin: '0 20px' }}>
        <p style={{ fontSize: 10, color: '#a0aec0' }}>HealthPrism © 2024 · GNEC Hackathon</p>
        <p style={{ fontSize: 10, color: '#cbd5e0', marginTop: 2 }}>SDG 3 — Health and Well-being</p>
      </div>
      <BottomNav active="settings" />
    </div>
  )
}

export default Settings
