// WHO-based clinical rules for anemia and malnutrition in children 0-60 months

export const conjunctivaToAnemiaRisk = (v) => {
  if(v==null) return 0
  if(v>=75) return 90; if(v>=60) return 75; if(v>=45) return 55; if(v>=30) return 35; return 15
}

export const heartRateRisk = (bpm, ageMonths) => {
  if(!bpm) return 0
  const upper = ageMonths<24 ? 130 : ageMonths<60 ? 120 : 100
  if(bpm > upper+20) return 30; if(bpm > upper) return 15; return 0
}

export const breathingRateRisk = (rpm) => {
  if(!rpm) return 0; if(rpm>40) return 25; if(rpm>30) return 15; return 0
}

export const perfusionRisk = (s) => {
  if(!s) return 0; if(s>3) return 30; if(s>2) return 20; return 0
}

export const bmiRisk = (bmi) => {
  if(!bmi) return 0
  if(bmi<11.5) return 85; if(bmi<13) return 60; if(bmi<14.5) return 35; return 10
}

export const energyRisk = (e) => ({ 1:25,2:15,3:5,4:0,5:0 }[e] ?? 0)

export const symptomsRisk = ({ appetite, fatigue, dizziness, mood }) => {
  let s=0
  if(appetite!=null) s+=[20,12,4,0][appetite]??0
  if(fatigue!=null)  s+=[20,12,5,0][fatigue]??0
  if(dizziness!=null)s+=[20,12,5,0][dizziness]??0
  if(mood!=null)     s+=[10,5,0,0][mood]??0
  return Math.min(s,60)
}

export const computeRiskProfile = (d) => {
  // Anemia score
  let anemia=0
  if(d.conjunctivaScore!=null) anemia += conjunctivaToAnemiaRisk(d.conjunctivaScore)*0.45
  if(d.heartRate!=null)        anemia += heartRateRisk(d.heartRate,d.age)*0.20
  if(d.perfusionTime!=null)    anemia += perfusionRisk(d.perfusionTime)*0.20
  if(d.energy!=null)           anemia += energyRisk(d.energy)*0.15

  // Malnutrition score
  let mal=0
  if(d.weight&&d.height){ const h=d.height/100; mal+=bmiRisk(d.weight/(h*h))*0.60 }
  mal += symptomsRisk(d)*0.40

  // General score
  let gen=0
  if(d.breathingRate!=null) gen+=breathingRateRisk(d.breathingRate)*0.5
  if(d.perfusionTime!=null) gen+=perfusionRisk(d.perfusionTime)*0.3
  if(d.energy!=null)        gen+=energyRisk(d.energy)*0.2

  const anemiaN  = Math.min(Math.round(anemia),100)
  const malN     = Math.min(Math.round(mal),100)
  const genN     = Math.min(Math.round(gen),100)

  const filled = [d.age,d.weight,d.height,d.conjunctivaScore,d.heartRate,d.breathingRate,d.perfusionTime,d.appetite].filter(v=>v!=null).length
  const confidence = Math.round((filled/8)*100)
  const max = Math.max(anemiaN,malN,genN)
  const overall = max>=65?'CRITICAL':max>=35?'VULNERABLE':'STABLE'

  return { anemia:anemiaN, malnutrition:malN, general:genN, confidence, overall }
}

export const riskLevel = (s) => s>=65?'CRITICAL':s>=35?'MODERATE':'NORMAL'

export const getAction = (overall) => ({
  CRITICAL:   'Seek medical attention today. These results suggest a significant risk that requires professional evaluation.',
  VULNERABLE: 'Schedule a pediatric appointment within the next week. Continue monitoring nutrition.',
  STABLE:     'Continue monitoring every 15 days. Maintain a balanced iron-rich diet.',
}[overall])
