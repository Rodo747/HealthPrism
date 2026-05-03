import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadReports } from '../services/storageService'
import { PrismMark, BottomNav } from '../components/shared'

const riskColor = (level) => ({
  CRITICAL:   { bg:'#FDECEA', color:'#a7232d' },
  VULNERABLE: { bg:'#FEF3C7', color:'#B45309' },
  STABLE:     { bg:'#D1FAE5', color:'#047857' },
}[level] || { bg:'#EBF0F8', color:'#8496A9' })

const History = () => {
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const all = await loadReports('default')
      setReports(all)
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div className="app-shell" style={{ paddingBottom: 80 }}>
      <div style={{ background: 'white', padding: '52px 20px 20px', borderBottom: '1px solid #D8E2EE', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/icon.png" style={{ width: 70, height: 70, objectFit: 'contain' }} />
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#08142E', fontFamily: 'Syne,sans-serif' }}>Assessment History</h1>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div className="spin-anim" style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #EBF0F8', borderTop: '3px solid #1558D6' }} />
          </div>
        )}

        {!loading && reports.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#EBF0F8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8496A9" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#08142E' }}>No assessments yet</p>
            <p style={{ fontSize: 13, color: '#8496A9', marginTop: 6 }}>Complete your first check to see results here.</p>
            <button className="btn-primary" style={{ marginTop: 20, width: 'auto', padding: '12px 28px' }} onClick={() => navigate('/check')}>
              Start Assessment
            </button>
          </div>
        )}

        {!loading && reports.map((r, i) => {
          const overall = r.profile?.overall || r.riskProfile?.overall || 'STABLE'
          const rc = riskColor(overall)
          const date = r.timestamp ? new Date(r.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown date'
          const confidence = r.profile?.confidence ?? r.riskProfile?.confidence ?? 0
          return (
            <div key={r.key || i} className="card" style={{ padding: '14px 16px', marginBottom: 12, cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#3A4D66' }}>{date}</span>
                <span style={{ background: rc.bg, color: rc.color, padding: '4px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>{overall}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                {[
                  { label: 'Anemia',       val: r.profile?.anemia       ?? 0, level: r.anemiaLevel       ?? 'NORMAL' },
                  { label: 'Malnutrition', val: r.profile?.malnutrition  ?? 0, level: r.malnutritionLevel ?? 'NORMAL' },
                  { label: 'General',      val: r.profile?.general       ?? 0, level: r.generalLevel      ?? 'NORMAL' },
                ].map(item => {
                  const ic = riskColor(item.level)
                  return (
                    <div key={item.label} style={{ background: '#F0F4FB', borderRadius: 10, padding: '8px 10px', textAlign: 'center' }}>
                      <p style={{ fontSize: 11, color: '#8496A9', fontWeight: 600, marginBottom: 4 }}>{item.label}</p>
                      <p style={{ fontSize: 18, fontWeight: 800, color: ic.color }}>{item.val}%</p>
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, height: 3, background: '#EBF0F8', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${confidence}%`, background: 'linear-gradient(90deg,#1558D6,#3B7FF5)', borderRadius: 999 }} />
                </div>
                <span style={{ fontSize: 10, color: '#8496A9', fontWeight: 600 }}>{confidence}% confidence</span>
              </div>
            </div>
          )
        })}
      </div>
      <BottomNav active="history" />
    </div>
  )
}
export default History
