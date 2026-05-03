const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const analyzeWithAI = async (checkData, report) => {
  try {
    const res = await fetch(`${baseUrl}/analyze`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        age:checkData.age, weight:checkData.weight, height:checkData.height, energy:checkData.energy,
        heartRate:checkData.heartRate, breathingRate:checkData.breathingRate,
        perfusionTime:checkData.perfusionTime, conjunctivaScore:checkData.conjunctivaScore,
        appetite:checkData.appetite, fatigue:checkData.fatigue, dizziness:checkData.dizziness, mood:checkData.mood,
        riskProfile:report.profile,
        conjunctivaImage:checkData.conjunctivaImage||null,
        handImage:checkData.handImage||null,
      }),
      signal: AbortSignal.timeout(15000),
    })
    if(!res.ok) throw new Error(`${res.status}`)
    return await res.json()
  } catch(e) { console.warn('AI unavailable, using offline engine:', e.message); return null }
}
