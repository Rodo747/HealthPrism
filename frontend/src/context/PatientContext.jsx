import { createContext, useContext, useState, useEffect } from 'react'
import { loadPatients, savePatients } from '../services/storageService'
import { savePatientToCloud, loadPatientsFromCloud } from '../services/firebase'
import { useConnectivity } from '../hooks/useConnectivity'

const PatientContext = createContext(null)
export const usePatients = () => useContext(PatientContext)

export const PatientProvider = ({ children }) => {
  const [patients, setPatients]       = useState([])
  const [activePatient, setActive]    = useState(null)
  const [loading, setLoading]         = useState(true)
  const isOnline = useConnectivity()

  useEffect(() => {
    const load = async () => {
      const local = await loadPatients()
      if (local.length > 0) { setPatients(local); setLoading(false); return }
      if (isOnline) {
        const cloud = await loadPatientsFromCloud()
        if (cloud.length > 0) { setPatients(cloud); await savePatients(cloud) }
      }
      setLoading(false)
    }
    load()
  }, [])

  const addPatient = async (patient) => {
    const newPatient = { ...patient, id: Date.now().toString(), createdAt: new Date().toISOString() }
    const updated = [...patients, newPatient]
    setPatients(updated)
    await savePatients(updated)
    if (isOnline) await savePatientToCloud(newPatient)
    return newPatient
  }

  const removePatient = async (id) => {
    const updated = patients.filter(p => p.id !== id)
    setPatients(updated)
    await savePatients(updated)
  }

  return (
    <PatientContext.Provider value={{ patients, activePatient, setActive, addPatient, removePatient, loading }}>
      {children}
    </PatientContext.Provider>
  )
}
