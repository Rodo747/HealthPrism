import { createContext, useContext, useState } from 'react'

const CheckContext = createContext(null)
export const useCheck = () => {
  const ctx = useContext(CheckContext)
  if (!ctx) throw new Error('useCheck must be inside CheckProvider')
  return ctx
}

const initial = {
  age:null,weight:null,height:null,energy:null,
  faceImage:null,
  conjunctivaImage:null,conjunctivaScore:null,
  handImage:null,handScore:null,
  perfusionTime:null,
  heartRate:null,
  breathingRate:null,
  appetite:null,fatigue:null,dizziness:null,mood:null,
  riskProfile:null,confidence:null,
}

export const CheckProvider = ({ children }) => {
  const [data, setData] = useState(initial)
  const update = (fields) => setData(p => ({ ...p, ...fields }))
  const reset  = () => setData(initial)
  const getBMI = () => {
    if (!data.weight || !data.height) return null
    const h = data.height / 100
    return parseFloat((data.weight / (h * h)).toFixed(1))
  }
  return (
    <CheckContext.Provider value={{ data, update, reset, getBMI }}>
      {children}
    </CheckContext.Provider>
  )
}
