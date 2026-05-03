import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheck } from '../../context/CheckContext'
import { StepHeader, BottomNav, PrismDivider } from '../../components/shared'

const Step1_Data = () => {
  const navigate = useNavigate()
  const { data, update } = useCheck()
  const [form, setForm] = useState({ age:data.age??'', weight:data.weight??'', height:data.height??'', energy:data.energy??0 })
  const set = (k,v) => setForm(p=>({...p,[k]:v}))
  const valid = form.age && form.weight && form.height && form.energy>0

  const go = () => {
    update({ age:parseFloat(form.age), weight:parseFloat(form.weight), height:parseFloat(form.height), energy:form.energy })
    navigate('/check/step2')
  }

  return (
    <div className="app-shell" style={{paddingBottom:100}}>
      <StepHeader step={1} total={10} title="Initial Data" onBack={()=>navigate('/check')}/>
      <div style={{padding:'20px 20px 0'}}>
        {[{key:'age',label:'Age (months)',ph:'e.g. 24'},{key:'weight',label:'Weight (kg)',ph:'e.g. 12.5'},{key:'height',label:'Height (cm)',ph:'e.g. 85'}].map(f=>(
          <div key={f.key} className="card" style={{padding:'16px 18px',marginBottom:12}}>
            <label className="hp-label">{f.label}</label>
            <input type="number" className="hp-input" placeholder={f.ph} value={form[f.key]} onChange={e=>set(f.key,e.target.value)}/>
          </div>
        ))}
        <div className="card" style={{padding:'16px 18px',marginBottom:12}}>
          <label className="hp-label">Perceived Energy Level</label>
          <div style={{display:'flex',gap:8,marginTop:12}}>
            {[1,2,3,4,5].map(n=>{
              const a=form.energy===n
              const bg=a?(n<=2?'linear-gradient(135deg,#E8291C,#FF4436)':n===3?'linear-gradient(135deg,#F59E0B,#FBBF24)':'linear-gradient(135deg,#1558D6,#3B7FF5)'):'#EBF0F8'
              return <button key={n} onClick={()=>set('energy',n)} style={{flex:1,padding:'11px 0',borderRadius:12,background:bg,border:'none',cursor:'pointer',fontWeight:700,fontSize:14,color:a?'white':'#8496A9',transition:'all .15s'}}>{n}</button>
            })}
          </div>
          <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
            <span style={{fontSize:11,color:'#E8291C',fontWeight:600}}>Very low</span>
            <span style={{fontSize:11,color:'#1558D6',fontWeight:600}}>Excellent</span>
          </div>
        </div>
        <PrismDivider/>
        <button className="btn-primary" disabled={!valid} onClick={go} style={{opacity:valid?1:.5}}>Continue →</button>
      </div>
      <BottomNav active="assess"/>
    </div>
  )
}
export default Step1_Data
