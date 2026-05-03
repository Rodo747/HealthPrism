import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheck } from '../../context/CheckContext'
import { StepHeader, BottomNav } from '../../components/shared'

const QUESTIONS = [
  {key:'appetite', label:'Appetite level',      opts:['Very low','Low','Normal','Good']},
  {key:'fatigue',  label:'Fatigue frequency',   opts:['Always','Often','Sometimes','Rarely']},
  {key:'dizziness',label:'Dizziness episodes',  opts:['Daily','Weekly','Occasionally','Never']},
  {key:'mood',     label:'General mood',         opts:['Very irritable','Irritable','Calm','Happy']},
]

const Step8_Symptoms = () => {
  const navigate = useNavigate()
  const { data, update } = useCheck()
  const [ans, setAns] = useState({ 
    appetite:  data.appetite ?? data.appetite === 0 ? data.appetite : null,
    fatigue:   data.fatigue ?? data.fatigue === 0 ? data.fatigue : null,
    dizziness: data.dizziness ?? data.dizziness === 0 ? data.dizziness : null,
    mood:      data.mood ?? data.mood === 0 ? data.mood : null
  })

  const set = (k,v) => setAns(p=>({...p,[k]:v}))

  const go = () => { update(ans); navigate('/check/step9') }

  return (
    <div className="app-shell" style={{paddingBottom:100}}>
      <StepHeader step={8} total={10} title="Final Symptoms" onBack={()=>navigate('/check/step7')}/>
      <div style={{padding:'20px 20px 0'}}>
        {QUESTIONS.map(q=>(
          <div key={q.key} className="card" style={{padding:'16px 18px',marginBottom:12}}>
            <label className="hp-label">{q.label}</label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:12}}>
              {q.opts.map((opt,i)=>{
                const a=ans[q.key]===i
                return <button key={opt} onClick={()=>set(q.key,i)} style={{padding:'10px 8px',borderRadius:12,border:`1.5px solid ${a?'#1558D6':'#D8E2EE'}`,background:a?'#EBF1FD':'white',color:a?'#1558D6':'#3A4D66',fontSize:13,fontWeight:a?700:500,cursor:'pointer',transition:'all .15s',fontFamily:'DM Sans,sans-serif'}}>{opt}</button>
              })}
            </div>
          </div>
        ))}
        <button className="btn-primary" style={{marginTop:8}} onClick={go}>Continue →</button>
      </div>
      <BottomNav active="assess"/>
    </div>
  )
}
export default Step8_Symptoms