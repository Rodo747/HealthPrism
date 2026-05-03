import { useNavigate } from 'react-router-dom'
import { useCheck } from '../../context/CheckContext'
import { BottomNav, PrismDivider } from '../../components/shared'

const STEPS = [
  {n:1, title:'Initial Data',         desc:'Age, weight, height and energy level',    red:false, path:'/check/step1'},
  {n:2, title:'Face Analysis',         desc:'General skin tone and appearance',         red:false, path:'/check/step2'},
  {n:3, title:'Conjunctiva Analysis',  desc:'Paleness indicator for anemia',            red:true,  path:'/check/step3'},
  {n:4, title:'Hand Analysis',         desc:'Palm and nail bed color',                  red:false, path:'/check/step4'},
  {n:5, title:'Perfusion Test',        desc:'Tissue color recovery time',               red:true,  path:'/check/step5'},
  {n:6, title:'Heart Rate (PPG)',       desc:'Beats per minute via camera',              red:true,  path:'/check/step6'},
  {n:7, title:'Breathing Rate',         desc:'Respiratory cycles per minute',            red:false, path:'/check/step7'},
  {n:8, title:'Final Symptoms',         desc:'Appetite, fatigue and mood',               red:false, path:'/check/step8'},
  {n:9, title:'Review',                 desc:'Verify all collected data',                red:false, path:'/check/step9'},
  {n:10,title:'Results',               desc:'Full risk profile with recommendations',   red:true,  path:'/check/step10'},
]

const NewCheck = () => {
  const navigate = useNavigate()
  const { reset } = useCheck()

  const handleStart = () => { reset(); navigate('/check/step1') }

  return (
    <div className="app-shell" style={{paddingBottom:80}}>
      <div style={{background:'white',padding:'52px 20px 16px',borderBottom:'1px solid #D8E2EE',display:'flex',alignItems:'center',gap:10}}>
        <button onClick={()=>navigate('/')} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:6,color:'#1558D6',fontWeight:600,fontSize:15}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1558D6" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          New Assessment
        </button>
      </div>
      <div style={{padding:'16px 20px 0'}}>
        <p style={{fontSize:13,color:'#3A4D66',marginBottom:16}}>Complete all 10 steps for an accurate risk profile.</p>
        {STEPS.map(s=>(
          <div key={s.n} onClick={()=>navigate(s.path)} className="card" style={{display:'flex',alignItems:'center',gap:14,padding:'14px 16px',marginBottom:10,cursor:'pointer'}}>
            <div style={{width:40,height:40,borderRadius:12,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:s.red?'linear-gradient(135deg,#E8291C,#FF4436)':'linear-gradient(135deg,#1558D6,#3B7FF5)',boxShadow:s.red?'0 3px 10px rgba(232,41,28,.28)':'0 3px 10px rgba(21,88,214,.28)'}}>
              <span style={{color:'white',fontWeight:800,fontSize:14}}>{s.n}</span>
            </div>
            <div style={{flex:1}}>
              <p style={{fontSize:14,fontWeight:700,color:'#08142E'}}>{s.title}</p>
              <p style={{fontSize:12,color:'#3A4D66',marginTop:2}}>{s.desc}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8496A9" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </div>
        ))}
        <PrismDivider/>
        <button className="btn-primary" style={{marginBottom:20}} onClick={handleStart}>
          Begin Full Check <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
      <BottomNav active="assess"/>
    </div>
  )
}
export default NewCheck
