import { useNavigate } from 'react-router-dom'
import { useCheck } from '../../context/CheckContext'
import { StepHeader, BottomNav } from '../../components/shared'

const ITEMS = [
  {label:'Initial Data',     path:'/check/step1'},
  {label:'Face Analysis',    path:'/check/step2'},
  {label:'Conjunctiva',      path:'/check/step3'},
  {label:'Hand Analysis',    path:'/check/step4'},
  {label:'Nail Analysis',    path:'/check/step5'},
  {label:'Perfusion Test',   path:'/check/step5'},
  {label:'Heart Rate (PPG)', path:'/check/step6'},
  {label:'Breathing Rate',   path:'/check/step7'},
  {label:'Final Symptoms',   path:'/check/step8'},
]

const Step9_Review = () => {
  const navigate = useNavigate()
  const { data } = useCheck()

  const statusOf = (key) => {
    const checks = {
      '/check/step1': data.age && data.weight && data.height,
      '/check/step2': data.faceImage,
      '/check/step3': data.conjunctivaScore != null,
      '/check/step4': data.handScore != null,
      '/check/step5': data.nailScore != null,
      '/check/step6': data.heartRate != null,
      '/check/step7': data.breathingRate != null,
      '/check/step8': data.appetite != null,
    }
    return checks[key] ? 'done' : 'pending'
  }

  return (
    <div className="app-shell" style={{paddingBottom:100}}>
      <StepHeader step={9} total={10} title="Review Data" onBack={()=>navigate('/check/step8')}/>
      <div style={{padding:'20px 20px 0'}}>
        <p style={{fontSize:13,color:'#3A4D66',marginBottom:16}}>Review all collected data before final analysis. Tap any step to redo it.</p>
        {ITEMS.map(item=>{
          const done = statusOf(item.path)==='done'
          return (
             <div key={item.label} onClick={()=>navigate(item.path)} className="card" style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',marginBottom:10,cursor:'pointer',borderLeft:'2px solid transparent',transition:'border-color .2s'}} onMouseEnter={e=>e.currentTarget.style.borderLeftColor='#a7232d'} onMouseLeave={e=>e.currentTarget.style.borderLeftColor='transparent'}>
              <div style={{width:32,height:32,borderRadius:'50%',background:done?'#D1FAE5':'#fdecea',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,border:'1.5px solid',borderColor:done?'#047857':'#a7232d'}}>
                {done
                  ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#047857" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a7232d" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                }
              </div>
              <span style={{flex:1,fontSize:14,fontWeight:600,color:'#08142E'}}>{item.label}</span>
              <span style={{fontSize:11,fontWeight:700,color:done?'#047857':'#a7232d'}}>{done?'Done':'Pending'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8496A9" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </div>
          )
        })}
        <button className="btn-accent" style={{marginTop:8}} onClick={()=>navigate('/check/step10')}>
          Run Final Analysis
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
      <BottomNav active="assess"/>
    </div>
  )
}
export default Step9_Review
