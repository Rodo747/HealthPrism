import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheck } from '../../context/CheckContext'
import { useConnectivity } from '../../hooks/useConnectivity'
import { buildReport } from '../../engines/riskProfile'
import { analyzeWithAI } from '../../services/apiService'
import { saveReport } from '../../services/storageService'
import { saveReportToCloud } from '../../services/firebase'
import { BottomNav, RiskBar } from '../../components/shared'

const Step10_Results = () => {
  const navigate = useNavigate()
  const { data, update } = useCheck()
  const isOnline = useConnectivity()
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [aiEnhanced, setAiEnhanced] = useState(false)

  useEffect(() => {
    const compute = async () => {
      const r = buildReport(data, 'bolivia')
      setReport(r)
      update({ riskProfile: r.profile })
      setLoading(false)

      // Save locally
      await saveReport('default', r)

      // Try AI enhancement + cloud save if online
      if (isOnline) {
        const ai = await analyzeWithAI(data, r)
        if (ai?.recommendations) {
          setReport(p => ({ ...p, recommendations: ai.recommendations }))
          setAiEnhanced(true)
        }
        await saveReportToCloud('default', r)
      }
    }
    compute()
  }, [])

  if (loading) return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100svh', gap: 16 }}>
      <div className="spin-anim" style={{ width: 48, height: 48, borderRadius: '50%', border: '3px solid #EBF0F8', borderTop: '3px solid #1558D6' }} />
      <p style={{ fontSize: 14, fontWeight: 600, color: '#3A4D66' }}>Analyzing all signals...</p>
      {isOnline && <p style={{ fontSize: 12, color: '#8496A9' }}>Connecting to AI engine</p>}
    </div>
  )
  if (!report) return null

  const { profile, anemiaLevel, malnutritionLevel, generalLevel, recommendations, detectedFactors, action } = report
  const oBg = profile.overall === 'CRITICAL' ? '#FDECEA' : profile.overall === 'VULNERABLE' ? '#FEF3C7' : '#D1FAE5'
  const oC  = profile.overall === 'CRITICAL' ? '#E8291C' : profile.overall === 'VULNERABLE' ? '#B45309' : '#047857'

  return (
    <div className="app-shell" style={{ paddingBottom: 100 }}>
      <div style={{ background: 'white', padding: '52px 20px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 10, right: 20, width: 0, height: 0, borderLeft: '36px solid transparent', borderRight: '36px solid transparent', borderBottom: '62px solid rgba(232,41,28,.06)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 40, right: 60, width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderBottom: '34px solid rgba(21,88,214,.06)', pointerEvents: 'none' }} />
        <button onClick={() => navigate('/check')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#1558D6', fontWeight: 600, fontSize: 14, marginBottom: 14 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1558D6" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ background: oBg, color: oC, padding: '5px 12px', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase' }}>Status: {profile.overall}</span>
          {aiEnhanced && <span style={{ background: '#EBF1FD', color: '#1558D6', padding: '5px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700 }}>AI Enhanced</span>}
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#08142E', lineHeight: 1.15, fontFamily: 'Syne,sans-serif' }}>Clinical Analysis Results</h1>
        <p style={{ fontSize: 13, color: '#3A4D66', marginTop: 8, lineHeight: 1.6 }}>Based on visual markers and biometric data collected, a preventive risk profile has been generated.</p>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, position: 'relative' }}>
          <div style={{ position: 'absolute', left: '8%', top: '10%', width: 44, height: 44, borderRadius: '50%', background: 'rgba(21,88,214,.10)' }} />
          <div style={{ position: 'absolute', right: '10%', bottom: 0, width: 30, height: 30, borderRadius: '50%', background: 'rgba(232,41,28,.08)' }} />
          <div style={{ width: 130, height: 130, borderRadius: '50%', border: '8px solid #EBF1FD', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'white', boxShadow: '0 4px 24px rgba(21,88,214,.12)', position: 'relative', zIndex: 1 }}>
            <span style={{ fontSize: 38, fontWeight: 800, color: '#1558D6', fontFamily: 'Syne,sans-serif' }}>{profile.confidence}%</span>
            <span style={{ fontSize: 10, color: '#8496A9', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em' }}>Confidence</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#08142E', marginBottom: 14, fontFamily: 'Syne,sans-serif' }}>Risk Profile</h2>
        <RiskBar label="Anemia"        level={anemiaLevel}       percent={profile.anemia}       description="Estimated hemoglobin levels based on visual indicators." />
        <RiskBar label="Malnutrition"  level={malnutritionLevel} percent={profile.malnutrition} description="Anthropometric and symptom-based nutritional assessment." />
        <RiskBar label="General State" level={generalLevel}      percent={profile.general}      description="Physiological response and vital sign stability." />

        {detectedFactors.length > 0 && (
          <div className="card" style={{ padding: '16px 18px', marginTop: 4, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1558D6" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#08142E' }}>Detected Factors</h3>
            </div>
            {detectedFactors.map(f => (
              <div key={f.text} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.critical ? '#E8291C' : '#F59E0B', marginTop: 4, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#08142E' }}>{f.text}</p>
                  <p style={{ fontSize: 12, color: '#3A4D66', marginTop: 2, lineHeight: 1.5 }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: profile.overall === 'CRITICAL' ? '#FDECEA' : '#EBF1FD', borderRadius: 16, padding: '14px 16px', marginBottom: 16, borderLeft: `3px solid ${profile.overall === 'CRITICAL' ? '#E8291C' : '#1558D6'}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: profile.overall === 'CRITICAL' ? '#C01F14' : '#0D3FA6' }}>Recommended Action</p>
          <p style={{ fontSize: 12, color: profile.overall === 'CRITICAL' ? '#C01F14' : '#1558D6', marginTop: 4, lineHeight: 1.5 }}>{action}</p>
        </div>

        <h2 style={{ fontSize: 17, fontWeight: 800, color: '#08142E', marginBottom: 12, fontFamily: 'Syne,sans-serif' }}>Recommendations</h2>
        {recommendations.map((r, i) => (
          <div key={i} className="card" style={{ display: 'flex', gap: 12, padding: '14px 16px', marginBottom: 10, alignItems: 'flex-start', borderLeft: `3px solid ${r.urgent ? '#E8291C' : '#1558D6'}` }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.urgent ? '#E8291C' : '#1558D6', marginTop: 4, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#08142E' }}>{r.title}</p>
              <p style={{ fontSize: 12, color: '#3A4D66', marginTop: 3, lineHeight: 1.5 }}>{r.desc}</p>
            </div>
          </div>
        ))}

        <button className="btn-primary" style={{ marginTop: 8, display: 'flex' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Share Report
        </button>
        <button onClick={() => navigate('/')} style={{ width: '100%', marginTop: 8, marginBottom: 20, padding: '14px', background: 'transparent', color: '#08142E', fontWeight: 600, fontSize: 15, borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: 'DM Sans,sans-serif' }}>Finish</button>
      </div>
      <BottomNav active="assess" />
    </div>
  )
}
export default Step10_Results
