export const measureRecovery = (reds, fps=30, baseline=180, thr=0.9) => {
  const target = baseline*thr
  for(let i=0;i<reds.length;i++){ if(reds[i]>=target) return parseFloat((i/fps).toFixed(2)) }
  return parseFloat((reds.length/fps).toFixed(2))
}
export const interpretPerfusion = (s) => {
  if(s==null) return null
  if(s<=2)  return { level:'NORMAL',   msg:'Normal capillary refill (≤ 2s)' }
  if(s<=3)  return { level:'MODERATE', msg:'Mildly delayed refill (2–3s)' }
  return          { level:'CRITICAL',  msg:'Delayed capillary refill (> 3s)' }
}
