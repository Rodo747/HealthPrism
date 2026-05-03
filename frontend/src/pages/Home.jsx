import { useNavigate } from 'react-router-dom'
import { PrismMark, BottomNav } from '../components/shared'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="app-shell" style={{paddingBottom:80}}>
      <div style={{background:'white',position:'relative',overflow:'hidden'}}>
        {/* Prism bg decorations */}
        <div style={{position:'absolute',top:-10,right:10,width:0,height:0,borderLeft:'60px solid transparent',borderRight:'60px solid transparent',borderBottom:'104px solid rgba(21,88,214,.05)',pointerEvents:'none'}}/>
        <div style={{position:'absolute',top:20,right:60,width:0,height:0,borderLeft:'36px solid transparent',borderRight:'36px solid transparent',borderBottom:'62px solid rgba(232,41,28,.05)',pointerEvents:'none'}}/>
        {/* Topbar */}
        <div style={{padding:'52px 20px 0',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <PrismMark size={30}/>
            <span style={{fontSize:18,fontWeight:800,color:'#08142E',fontFamily:'Syne,sans-serif',letterSpacing:'-.02em'}}>HealthPrism</span>
          </div>
          <div style={{width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,#1558D6,#3B7FF5)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
        {/* Hero banner */}
        <div style={{margin:'20px 20px 0',borderRadius:20,background:'linear-gradient(155deg,#08142E 0%,#1558D6 100%)',height:190,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:'25%',width:0,height:0,borderLeft:'90px solid transparent',borderRight:'90px solid transparent',borderBottom:'190px solid rgba(59,127,245,.13)'}}/>
          <div style={{position:'absolute',top:0,right:'15%',width:0,height:0,borderLeft:'55px solid transparent',borderRight:'55px solid transparent',borderBottom:'140px solid rgba(232,41,28,.10)'}}/>
          <div style={{position:'absolute',top:16,right:14,background:'rgba(255,255,255,.96)',borderRadius:12,padding:'8px 12px'}}>
            <div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:7,height:7,borderRadius:'50%',background:'#10B981'}}/><span style={{fontSize:9,fontWeight:700,color:'#3A4D66',textTransform:'uppercase',letterSpacing:'.07em'}}>Nutrition</span></div>
            <p style={{fontSize:12,fontWeight:800,color:'#08142E',marginTop:2}}>Optimal State</p>
          </div>
          <div style={{position:'absolute',bottom:14,left:14,background:'rgba(255,255,255,.96)',borderRadius:12,padding:'8px 12px'}}>
            <div style={{display:'flex',alignItems:'center',gap:5}}><div style={{width:7,height:7,borderRadius:'50%',background:'#1558D6'}}/><span style={{fontSize:9,fontWeight:700,color:'#3A4D66',textTransform:'uppercase',letterSpacing:'.07em'}}>Growth</span></div>
            <p style={{fontSize:12,fontWeight:800,color:'#08142E',marginTop:2}}>P85 Percentile</p>
          </div>
        </div>
        {/* Text */}
        <div style={{padding:'22px 20px 28px'}}>
          <span style={{background:'rgba(21,88,214,.1)',color:'#1558D6',padding:'5px 12px',borderRadius:999,fontSize:10,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase'}}>Clinical Artificial Intelligence</span>
          <h1 className="fade-up" style={{fontSize:36,fontWeight:800,color:'#08142E',lineHeight:1.12,marginTop:12,fontFamily:'Syne,sans-serif',letterSpacing:'-.025em'}}>Child care with</h1>
          <h1 className="fade-up" style={{fontSize:36,fontWeight:800,lineHeight:1.12,fontFamily:'Syne,sans-serif',letterSpacing:'-.025em',fontStyle:'italic',background:'linear-gradient(135deg,#1558D6 30%,#E8291C 100%)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:14}}>digital precision.</h1>
          <p style={{fontSize:14,color:'#3A4D66',lineHeight:1.65,marginBottom:20}}>Transform your device into an advanced nutritional assessment tool. HealthPrism uses AI to monitor growth and child wellbeing in seconds.</p>
          <button className="btn-primary" onClick={()=>navigate('/check')}>
            Start Assessment <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
          <button style={{width:'100%',marginTop:10,padding:'13px 0',background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontSize:14,fontWeight:600,color:'#08142E',fontFamily:'DM Sans,sans-serif'}}>
            Discover how it works
            <div style={{width:26,height:26,borderRadius:'50%',background:'#08142E',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="11" height="11" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>
          </button>
        </div>
      </div>
      {/* Feature chips */}
      <div style={{padding:'20px 20px 0',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
        {[
          {label:'Quick Scan',color:'#1558D6',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1558D6" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>},
          {label:'Clinical Analysis',color:'#1558D6',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1558D6" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>},
          {label:'Total Privacy',color:'#E8291C',icon:<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8291C" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>},
        ].map(f=>(
          <div key={f.label} className="card" style={{padding:'14px 10px',display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
            <div style={{width:40,height:40,borderRadius:12,background:'#EBF0F8',display:'flex',alignItems:'center',justifyContent:'center'}}>{f.icon}</div>
            <span style={{fontSize:11,fontWeight:700,color:'#08142E',textAlign:'center',lineHeight:1.3}}>{f.label}</span>
          </div>
        ))}
      </div>
      {/* How it works */}
      <div style={{padding:'24px 20px 20px'}}>
        <h2 style={{fontSize:20,fontWeight:800,color:'#08142E',marginBottom:18,fontFamily:'Syne,sans-serif'}}>How it works</h2>
        {[
          {n:'1',title:'Capture',desc:'Take a clear photo following real-time visual guides.',red:false},
          {n:'2',title:'Analyze',desc:'AI processes biometric metrics against clinical standards.',red:true},
          {n:'3',title:'Report',desc:'Get a detailed report to share with your pediatrician.',red:false},
        ].map(s=>(
          <div key={s.n} style={{display:'flex',gap:14,marginBottom:20,alignItems:'flex-start'}}>
            <div style={{width:42,height:42,borderRadius:14,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',background:s.red?'linear-gradient(135deg,#E8291C,#FF4436)':'linear-gradient(135deg,#1558D6,#3B7FF5)',boxShadow:s.red?'0 4px 14px rgba(232,41,28,.3)':'0 4px 14px rgba(21,88,214,.3)'}}>
              <span style={{color:'white',fontWeight:800,fontSize:16}}>{s.n}</span>
            </div>
            <div style={{paddingTop:2}}>
              <p style={{fontWeight:700,fontSize:15,color:'#08142E'}}>{s.title}</p>
              <p style={{fontSize:13,color:'#3A4D66',marginTop:3,lineHeight:1.55}}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <BottomNav active="assess"/>
    </div>
  )
}
export default Home
