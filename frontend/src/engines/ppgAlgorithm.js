const redMean = (img) => {
  const d=img.data; let s=0,c=0
  for(let i=0;i<d.length;i+=16){ s+=d[i]; c++ }
  return c === 0 ? 0 : s/c
}
const lpf = (sig,w=5) => sig.map((_,i)=>{ const sl=sig.slice(Math.max(0,i-w+1),i+1); return sl.reduce((a,b)=>a+b,0)/sl.length })
const peaks = (sig,minD=10) => {
  const p=[]
  for(let i=1;i<sig.length-1;i++){
    if(sig[i]>sig[i-1]&&sig[i]>sig[i+1]){
      if(!p.length||i-p[p.length-1]>=minD) p.push(i)
    }
  }
  return p
}
export const analyzePPG = (frames, fps=30) => {
  if(!frames||frames.length<30) return null
  const raw = frames.map(redMean)
  const flt = lpf(raw,5)
  const mean = flt.reduce((a,b)=>a+b,0)/flt.length
  const norm = flt.map(v=>v-mean)
  const pk = peaks(norm, Math.round(fps*0.4))
  if(pk.length<2) return null
  const intervals = pk.slice(1).map((v,i)=>v-pk[i])
  const avg = intervals.reduce((a,b)=>a+b,0)/intervals.length
  const bpm = Math.round((fps/avg)*60)
  return (bpm>=40&&bpm<=200) ? bpm : null
}
