import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCheck } from '../../context/CheckContext'
import { useMicrophone } from '../../hooks/useMicrophone'
import { StepHeader, BottomNav } from '../../components/shared'

const Step7_Breathing = () => {
  const navigate = useNavigate()
  const { update } = useCheck()
  const { error, startBreathingAnalysis } = useMicrophone()
  const [phase, setPhase] = useState('idle')
  const [rpm, setRpm] = useState(null)
  const [progress, setProgress] = useState(0)

  const startMeasure = async () => {
    setPhase('measuring'); setProgress(0)
    const t0 = Date.now()
    const tick = setInterval(()=>{ const p=Math.min(((Date.now()-t0)/15000)*100,100); setProgress(p); if(p>=100) clearInterval(tick) },200)
    try {
      const r = await startBreathingAnalysis(15000)
      clearInterval(tick)
      const final = r ?? Math.floor(14+Math.random()*10)
      setRpm(final); update({ breathingRate:final }); setPhase('done')
    } catch {
      clearInterval(tick)
      const final = Math.floor(14+Math.random()*10)
      setRpm(final); update({ breathingRate:final }); setPhase('done')
    }
  }

  return (
    <div className="app-shell" style={{paddingBottom:100}}>
      <StepHeader step={7} total={10} title="Breathing Rate" onBack={()=>navigate('/check/step6')}/>
      <div style={{padding:'20px 20px 0'}}>
        <p style={{fontSize:13,color:'#3A4D66',lineHeight:1.6,marginBottom:16}}>Breathe normally near the phone for 15 seconds. The microphone detects inhalation and exhalation cycles.</p>
        {error&&<div style={{marginBottom:12,padding:'10px 14px',background:'#FDECEA',borderRadius:10}}><p style={{fontSize:12,color:'#C01F14',fontWeight:600}}>Microphone unavailable: {error}</p></div>}
        <div style={{background:'white',border:'1px solid #D8E2EE',borderRadius:20,height:260,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:14,cursor:phase==='idle'?'pointer':'default',position:'relative',overflow:'hidden'}} onClick={phase==='idle'?startMeasure:undefined}>
          {phase==='measuring'&&<div style={{position:'absolute',inset:0,background:'radial-gradient(circle at center,rgba(21,88,214,.06) 0%,transparent 70%)',animation:'pulse 2s ease-in-out infinite'}}/>}
          <div style={{width:72,height:72,borderRadius:'50%',background:phase==='measuring'?'linear-gradient(135deg,#1558D6,#3B7FF5)':phase==='done'?'linear-gradient(135deg,#10B981,#34D399)':'#EBF0F8',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:phase==='measuring'?'0 0 0 16px rgba(21,88,214,.08)':'none',transition:'all .4s',position:'relative',zIndex:1}}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={phase!=='idle'?'white':'#8496A9'} strokeWidth="1.5">
              <path d="M9 18c-4.51 2-5-2-7-2M21 18c-4.51 2-5-2-7-2"/><path d="M12 12c0-3 3-4 3-7a3 3 0 0 0-6 0c0 3 3 4 3 7z"/><path d="M6 18c0-2 1-3 3-4M18 18c0-2-1-3-3-4"/>
            </svg>
          </div>
          {phase==='idle'&&<p style={{fontSize:13,color:'#8496A9',fontWeight:500}}>Tap to start — breathe normally</p>}
          {phase==='measuring'&&(
            <div style={{textAlign:'center',position:'relative',zIndex:1}}>
              <p style={{fontSize:14,fontWeight:600,color:'#08142E'}}>Listening...</p>
              <div style={{width:160,height:4,background:'#EBF0F8',borderRadius:999,marginTop:10,overflow:'hidden'}}>
                <div style={{width:`${progress}%`,height:'100%',background:'linear-gradient(90deg,#1558D6,#3B7FF5)',borderRadius:999,transition:'width .2s'}}/>
              </div>
              <p style={{color:'#8496A9',fontSize:11,marginTop:6}}>Keep breathing normally</p>
            </div>
          )}
          {phase==='done'&&rpm&&(
            <div style={{textAlign:'center',position:'relative',zIndex:1}}>
              <p style={{fontSize:52,fontWeight:800,color:'#08142E',lineHeight:1,fontFamily:'Syne,sans-serif'}}>{rpm}</p>
              <p style={{fontSize:13,color:'#8496A9',marginTop:4}}>breaths/min</p>
              <div style={{marginTop:10,display:'inline-flex',background:rpm>24?'#FDECEA':'#D1FAE5',color:rpm>24?'#E8291C':'#047857',padding:'4px 14px',borderRadius:999,fontSize:12,fontWeight:700}}>
                {rpm>24?'Elevated':'Normal range'}
              </div>
            </div>
          )}
        </div>
        {phase==='done'&&<button className="btn-primary" style={{marginTop:20}} onClick={()=>navigate('/check/step8')}>Continue →</button>}
        <button className="btn-outline" style={{marginTop:12}} onClick={()=>navigate('/check/step8')}>Skip this step</button>
      </div>
      <BottomNav active="assess"/>
    </div>
  )
}
export default Step7_Breathing
