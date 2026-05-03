const isNative = () => typeof window!=='undefined' && window.Capacitor?.isNativePlatform()

const getPrefs = async () => {
  if(isNative()){ const {Preferences}=await import('@capacitor/preferences'); return Preferences }
  return {
    set:async({key,value})=>localStorage.setItem(key,value),
    get:async({key})=>({value:localStorage.getItem(key)}),
    remove:async({key})=>localStorage.removeItem(key),
    keys:async()=>({keys:Object.keys(localStorage)}),
  }
}

export const saveReport = async (patientId, report) => {
  const p=await getPrefs(); const key=`report_${patientId}_${Date.now()}`
  await p.set({key,value:JSON.stringify(report)}); return key
}

export const loadReports = async (patientId) => {
  const p=await getPrefs(); const {keys}=await p.keys()
  const pkeys=keys.filter(k=>k.startsWith(`report_${patientId}_`))
  const reports=[]
  for(const key of pkeys){ const {value}=await p.get({key}); if(value){ try{reports.push({key,...JSON.parse(value)})}catch{} } }
  return reports.sort((a,b)=>new Date(b.timestamp)-new Date(a.timestamp))
}

export const savePatients = async (pts) => { const p=await getPrefs(); await p.set({key:'patients',value:JSON.stringify(pts)}) }

export const loadPatients = async () => {
  const p=await getPrefs(); const {value}=await p.get({key:'patients'})
  if(!value) return []; try{return JSON.parse(value)}catch{return []}
}

export const clearAll = async () => {
  const p = await getPrefs()
  const { keys } = await p.keys()
  for (const key of keys) {
    await p.remove({ key })
  }
}