import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
}

let app = null
let db  = null

const getDB = () => {
  if (!db) {
    app = initializeApp(firebaseConfig)
    db  = getFirestore(app)
  }
  return db
}

export const saveReportToCloud = async (patientId, report) => {
  try {
    const db = getDB()
    await addDoc(collection(db, 'reports'), {
      patientId,
      ...report,
      createdAt: new Date().toISOString(),
    })
    return true
  } catch (e) {
    console.warn('Firebase save error:', e.message)
    return false
  }
}

export const loadReportsFromCloud = async (patientId) => {
  try {
    const db = getDB()
    const q = query(
      collection(db, 'reports'),
      where('patientId', '==', patientId),
      orderBy('createdAt', 'desc'),
    )
    const snap = await getDocs(q)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.warn('Firebase load error:', e.message)
    return []
  }
}

export const savePatientToCloud = async (patient) => {
  try {
    const db = getDB()
    await addDoc(collection(db, 'patients'), {
      ...patient,
      createdAt: new Date().toISOString(),
    })
    return true
  } catch (e) {
    console.warn('Firebase patient save error:', e.message)
    return false
  }
}

export const loadPatientsFromCloud = async () => {
  try {
    const db = getDB()
    const snap = await getDocs(collection(db, 'patients'))
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
  } catch (e) {
    console.warn('Firebase patients load error:', e.message)
    return []
  }
}
