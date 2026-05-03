import { useNavigate } from 'react-router-dom'

export const PrismMark = ({ size=32 }) => {
  const s=size/32
  return (
    <div style={{position:'relative',width:size,height:size,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
      <div style={{position:'absolute',top:0,width:0,height:0,borderLeft:`${14*s}px solid transparent`,borderRight:`${14*s}px solid transparent`,borderBottom:`${26*s}px solid #1558D6`}}/>
      <div style={{position:'absolute',bottom:2*s,width:0,height:0,borderLeft:`${8*s}px solid transparent`,borderRight:`${8*s}px solid transparent`,borderBottom:`${15*s}px solid #E8291C`}}/>
    </div>
  )
}

export const PrismDivider = () => (
  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:6,opacity:.18,margin:'16px 0'}}>
    <div style={{width:0,height:0,borderLeft:'10px solid transparent',borderRight:'10px solid transparent',borderBottom:'18px solid #1558D6'}}/>
    <div style={{width:0,height:0,borderLeft:'6px solid transparent',borderRight:'6px solid transparent',borderBottom:'10px solid #E8291C'}}/>
    <div style={{width:0,height:0,borderLeft:'10px solid transparent',borderRight:'10px solid transparent',borderBottom:'18px solid #1558D6'}}/>
  </div>
)

export const StepHeader = ({ step, total, title, onBack }) => {
  const pct = Math.round((step/total)*100)
  return (
    <div style={{background:'white',padding:'52px 20px 18px',borderBottom:'1px solid #D8E2EE'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <button onClick={onBack} style={{background:'none',border:'none',cursor:'pointer',display:'flex',alignItems:'center',gap:6,color:'#1558D6',fontWeight:600,fontSize:14}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1558D6" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Back
        </button>
        <span style={{fontSize:11,fontWeight:700,color:'#8496A9',letterSpacing:'.08em',textTransform:'uppercase'}}>Step {step} of {total}</span>
      </div>
      <h1 style={{fontSize:28,fontWeight:800,color:'#08142E',letterSpacing:'-.02em',lineHeight:1.1,marginBottom:14,fontFamily:'Syne,sans-serif'}}>{title}</h1>
      <div style={{height:4,background:'#D8E2EE',borderRadius:999,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${pct}%`,background:'linear-gradient(90deg,#1558D6,#3B7FF5)',borderRadius:999,transition:'width .5s ease'}}/>
      </div>
      <p style={{fontSize:11,color:'#8496A9',textAlign:'right',marginTop:5,fontWeight:600}}>{pct}% completed</p>
    </div>
  )
}

export const BottomNav = ({ active='assess' }) => {
  const navigate = useNavigate()
  const tabs = [
    {key:'assess',  label:'Assess',   path:'/',         icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>},
    {key:'history', label:'History',  path:'/history',  icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>},
    {key:'children',label:'Children', path:'/children', icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>},
    {key:'settings',label:'Settings', path:'/settings', icon:(c)=><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>},
  ]
  return (
    <nav className="bottom-nav">
      {tabs.map(t=>{
        const ac=t.key===active; const c=ac?'#1558D6':'#8496A9'
        return (
          <button key={t.key} onClick={()=>navigate(t.path)} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:3,background:'none',border:'none',cursor:'pointer',padding:'4px 14px'}}>
            {t.icon(c)}
            <span style={{fontSize:10,fontWeight:600,color:c}}>{t.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export const TipCard = ({ icon, title, desc, variant='blue' }) => (
  <div style={{background:'white',borderRadius:14,borderLeft:`3px solid ${variant==='red'?'#E8291C':'#1558D6'}`,boxShadow:'0 2px 12px rgba(8,20,46,.06)',padding:'14px 16px',display:'flex',gap:12,alignItems:'flex-start'}}>
    <div style={{width:34,height:34,borderRadius:10,background:variant==='red'?'#FDECEA':'#EBF1FD',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,color:variant==='red'?'#E8291C':'#1558D6'}}>{icon}</div>
    <div>
      <p style={{fontSize:13,fontWeight:700,color:'#08142E'}}>{title}</p>
      <p style={{fontSize:12,color:'#3A4D66',marginTop:3,lineHeight:1.55}}>{desc}</p>
    </div>
  </div>
)

export const RiskBar = ({ label, level, percent, description }) => {
  const bars={CRITICAL:'linear-gradient(90deg,#E8291C,#FF4436)',MODERATE:'linear-gradient(90deg,#F59E0B,#FBBF24)',NORMAL:'linear-gradient(90deg,#10B981,#34D399)'}
  const bgs={CRITICAL:{bg:'#FDECEA',c:'#E8291C'},MODERATE:{bg:'#FEF3C7',c:'#B45309'},NORMAL:{bg:'#D1FAE5',c:'#047857'}}
  const b=bgs[level]||bgs.NORMAL
  return (
    <div style={{background:'white',borderRadius:16,boxShadow:'0 2px 12px rgba(8,20,46,.06)',border:'1px solid rgba(216,226,238,.7)',padding:'16px 18px',marginBottom:12}}>
      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
        <div style={{width:32,height:32,borderRadius:10,background:b.bg,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
          {level==='CRITICAL'&&<svg width="16" height="16" viewBox="0 0 24 24" fill={b.c}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>}
          {level==='MODERATE'&&<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={b.c} strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
          {level==='NORMAL'&&<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={b.c} strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>}
        </div>
        <div style={{flex:1}}>
          <p style={{fontSize:14,fontWeight:700,color:'#08142E'}}>{label}</p>
          <p style={{fontSize:11,color:'#3A4D66',marginTop:1}}>{description}</p>
        </div>
        <span style={{background:b.bg,color:b.c,padding:'4px 10px',borderRadius:999,fontSize:10,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase'}}>{level}</span>
        <span style={{fontSize:15,fontWeight:800,color:'#08142E'}}>{percent}%</span>
      </div>
      <div style={{height:7,background:'#EBF0F8',borderRadius:999,overflow:'hidden'}}>
        <div style={{height:'100%',width:`${percent}%`,background:bars[level],borderRadius:999}}/>
      </div>
    </div>
  )
}

export const CameraView = ({ videoRef, shape='circle', instruction, onCapture, onFlip, accentColor='#1558D6' }) => {
  const dims = { circle:{w:200,h:200,r:'50%'}, oval:{w:160,h:210,r:'50%'}, hand:{w:220,h:160,r:'24px'} }
  const d = dims[shape]||dims.circle
  return (
    <div style={{background:'#050C1A',borderRadius:20,overflow:'hidden',position:'relative',width:'100%',aspectRatio:'1'}}>
      <video ref={videoRef} autoPlay playsInline muted style={{width:'100%',height:'100%',objectFit:'cover'}}/>
      {/* Prism corners */}
      <div style={{position:'absolute',top:14,left:14,width:0,height:0,borderLeft:'14px solid transparent',borderRight:'14px solid transparent',borderBottom:'24px solid rgba(21,88,214,.5)'}}/>
      <div style={{position:'absolute',top:14,right:14,width:0,height:0,borderLeft:'10px solid transparent',borderRight:'10px solid transparent',borderBottom:'18px solid rgba(232,41,28,.5)'}}/>
      {/* Guide rings */}
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-55%)',width:d.w,height:d.h,borderRadius:d.r,border:'2px dashed rgba(255,255,255,.4)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-55%) scale(.88)',width:d.w,height:d.h,borderRadius:d.r,border:`2px solid ${accentColor}`,pointerEvents:'none'}}/>
      {instruction&&(
        <div style={{position:'absolute',bottom:60,left:0,right:0,background:'rgba(0,0,0,.65)',padding:'10px 16px'}}>
          <p style={{color:'white',fontSize:13,textAlign:'center',fontWeight:500}}>{instruction}</p>
        </div>
      )}
      <div style={{position:'absolute',bottom:14,left:0,right:0,display:'flex',justifyContent:'space-between',alignItems:'center',padding:'0 20px'}}>
        <button onClick={onFlip} style={{width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,.18)',border:'none',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
        </button>
        <button onClick={onCapture} style={{width:64,height:64,borderRadius:'50%',background:'white',border:`4px solid ${accentColor}66`,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{width:48,height:48,borderRadius:'50%',background:`linear-gradient(135deg,${accentColor},${accentColor}cc)`}}/>
        </button>
        <div style={{width:40}}/>
      </div>
    </div>
  )
}
