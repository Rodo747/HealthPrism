import { computeRiskProfile, riskLevel, getAction } from './clinicalRules'
import nutritionDB from '../data/nutritionDB.json'

export const buildReport = (d, region='bolivia') => {
  const profile = computeRiskProfile(d)
  const action  = getAction(profile.overall)

  // Nutritional recommendations
  const recs = []
  if(profile.anemia>=35){
    const foods = nutritionDB.ironRichFoods
      .filter(f=>!region||f.region.includes(region))
      .sort((a,b)=>b.ironMg-a.ironMg).slice(0,3).map(f=>f.name).join(', ')
    recs.push({ title:'Add iron-rich foods', desc:`Incorporate ${foods} into the daily diet. ${nutritionDB.absorptionTips[0]}`, urgent:profile.anemia>=65 })
  }
  if(profile.malnutrition>=35){
    recs.push({ title:'Improve caloric intake', desc:'Ensure the child receives 3 balanced meals and 2 snacks daily with adequate protein.', urgent:profile.malnutrition>=65 })
  }
  const max = Math.max(profile.anemia,profile.malnutrition)
  if(max>=65)  recs.push({ title:'Seek medical attention today',     desc:'These results suggest significant deficit. Professional evaluation is essential.', urgent:true })
  else if(max>=35) recs.push({ title:'Schedule pediatric appointment', desc:'Consult a health professional within the next week to validate these results.', urgent:false })
  recs.push({ title:`Monitor every ${max>=65?'7':'15'} days`, desc:'Repeat this assessment regularly to track nutritional improvement.', urgent:false })

  // Detected factors
  const factors = []
  if(d.conjunctivaScore>=45) factors.push({ text:'High pallor in conjunctiva', sub:'Direct visual indicator of possible iron deficiency.', critical:d.conjunctivaScore>=65 })
  if(d.heartRate>120)        factors.push({ text:`Elevated heart rate (${d.heartRate} BPM)`, sub:'Typical compensatory response to reduced oxygen delivery.', critical:d.heartRate>140 })
  if(d.perfusionTime>2)      factors.push({ text:`Delayed capillary refill (${d.perfusionTime}s)`, sub:'Indicates reduced peripheral blood perfusion.', critical:d.perfusionTime>3 })
  if(d.breathingRate>30)     factors.push({ text:`Elevated breathing rate (${d.breathingRate}/min)`, sub:'Tachypnea at rest may indicate anemia or infection.', critical:d.breathingRate>40 })
  if(d.energy<=2)            factors.push({ text:'Low reported energy level', sub:'Persistent low energy is a behavioral indicator of nutritional deficit.', critical:d.energy===1 })

  return {
    profile,
    anemiaLevel:       riskLevel(profile.anemia),
    malnutritionLevel: riskLevel(profile.malnutrition),
    generalLevel:      riskLevel(profile.general),
    recommendations:   recs,
    detectedFactors:   factors,
    action,
    timestamp: new Date().toISOString(),
  }
}
