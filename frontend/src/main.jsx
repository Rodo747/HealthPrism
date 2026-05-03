import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CheckProvider } from './context/CheckContext.jsx'
import { PatientProvider } from './context/PatientContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PatientProvider>
      <CheckProvider>
        <App />
      </CheckProvider>
    </PatientProvider>
  </StrictMode>,
)
