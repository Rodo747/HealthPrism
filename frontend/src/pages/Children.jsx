import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePatients } from '../context/PatientContext'
import { PrismMark, BottomNav } from '../components/shared'

const AVATARS = ['🧒','👦','👧','🧑','👶']

const Children = () => {
  const navigate = useNavigate()
  const { patients, addPatient, removePatient, setActive, loading } = usePatients()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', birthYear: '', gender: 'male' })
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleAdd = async () => {
    if (!form.name || !form.birthYear) return
    const p = await addPatient({ name: form.name, birthYear: parseInt(form.birthYear), gender: form.gender })
    setActive(p)
    setForm({ name: '', birthYear: '', gender: 'male' })
    setShowForm(false)
  }

  const handleSelect = (patient) => {
    setActive(patient)
    navigate('/check')
  }

  const ageFromYear = (year) => new Date().getFullYear() - year

  return (
    <div className="app-shell" style={{ paddingBottom: 80 }}>
      <div style={{ background: 'white', padding: '52px 20px 20px', borderBottom: '1px solid #D8E2EE', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <PrismMark size={28} />
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#08142E', fontFamily: 'Syne,sans-serif' }}>Children</h1>
        </div>
        <button onClick={() => setShowForm(true)} style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#1558D6,#3B7FF5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(21,88,214,.3)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>

      <div style={{ padding: '16px 20px 0' }}>
        {/* Add form */}
        {showForm && (
          <div className="card" style={{ padding: '18px', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#08142E', marginBottom: 14 }}>Add Child Profile</h3>
            <div style={{ marginBottom: 12 }}>
              <label className="hp-label">Name</label>
              <input className="hp-input" placeholder="Child's name" value={form.name} onChange={e => set('name', e.target.value)} style={{ fontSize: 16 }} />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label className="hp-label">Birth Year</label>
              <input className="hp-input" type="number" placeholder="e.g. 2021" value={form.birthYear} onChange={e => set('birthYear', e.target.value)} style={{ fontSize: 16 }} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="hp-label">Gender</label>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {['male', 'female'].map(g => (
                  <button key={g} onClick={() => set('gender', g)} style={{ flex: 1, padding: '10px', borderRadius: 12, border: `1.5px solid ${form.gender === g ? '#1558D6' : '#D8E2EE'}`, background: form.gender === g ? '#EBF1FD' : 'white', color: form.gender === g ? '#1558D6' : '#3A4D66', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans,sans-serif', textTransform: 'capitalize' }}>{g}</button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowForm(false)} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
              <button onClick={handleAdd} className="btn-primary" style={{ flex: 1 }} disabled={!form.name || !form.birthYear}>Save</button>
            </div>
          </div>
        )}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
            <div className="spin-anim" style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #EBF0F8', borderTop: '3px solid #1558D6' }} />
          </div>
        )}

        {!loading && patients.length === 0 && !showForm && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👶</div>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#08142E' }}>No children added yet</p>
            <p style={{ fontSize: 13, color: '#8496A9', marginTop: 6 }}>Add a child profile to track their health over time.</p>
            <button className="btn-primary" style={{ marginTop: 20, width: 'auto', padding: '12px 28px' }} onClick={() => setShowForm(true)}>Add First Child</button>
          </div>
        )}

        {patients.map((p, i) => (
          <div key={p.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', marginBottom: 10 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#EBF1FD,#D8E2EE)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
              {AVATARS[i % AVATARS.length]}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: '#08142E' }}>{p.name}</p>
              <p style={{ fontSize: 12, color: '#8496A9', marginTop: 2 }}>{ageFromYear(p.birthYear)} years old · {p.gender}</p>
            </div>
            <button onClick={() => handleSelect(p)} style={{ background: 'linear-gradient(135deg,#1558D6,#3B7FF5)', border: 'none', borderRadius: 999, padding: '8px 16px', color: 'white', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Assess</button>
            <button onClick={() => removePatient(p.id)} style={{ background: '#FDECEA', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E8291C" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
            </button>
          </div>
        ))}
      </div>
      <BottomNav active="children" />
    </div>
  )
}
export default Children
