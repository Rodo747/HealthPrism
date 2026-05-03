import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import History from './pages/History'
import Children from './pages/Children'
import Settings from './pages/Settings'
import NewCheck from './pages/steps/NewCheck'
import Step1_Data from './pages/steps/Step1_Data'
import Step2_Face from './pages/steps/Step2_Face'
import Step3_Conjunctiva from './pages/steps/Step3_Conjunctiva'
import Step4_Hand from './pages/steps/Step4_Hand'
import Step5_Nails from './pages/steps/Step5_Nails'
import Step6_PPG from './pages/steps/Step6_PPG'
import Step7_Breathing from './pages/steps/Step7_Breathing'
import Step8_Symptoms from './pages/steps/Step8_Symptoms'
import Step9_Review from './pages/steps/Step9_Review'
import Step10_Results from './pages/steps/Step10_Results'
import { useState } from 'react'
import SplashScreen from './components/SplashScreen'

function App() {
  const [splash, setSplash] = useState(true)
  return (
    <>
      {splash && <SplashScreen onDone={() => setSplash(false)} />}
      <BrowserRouter>
        <Routes>
          <Route path="/"              element={<Home />} />
          <Route path="/history"       element={<History />} />
          <Route path="/children"      element={<Children />} />
          <Route path="/settings"      element={<Settings />} />
          <Route path="/check"         element={<NewCheck />} />
          <Route path="/check/step1"   element={<Step1_Data />} />
          <Route path="/check/step2"   element={<Step2_Face />} />
          <Route path="/check/step3"   element={<Step3_Conjunctiva />} />
          <Route path="/check/step4"   element={<Step4_Hand />} />
          <Route path="/check/step5"   element={<Step5_Nails />} />
          <Route path="/check/step6"   element={<Step6_PPG />} />
          <Route path="/check/step7"   element={<Step7_Breathing />} />
          <Route path="/check/step8"   element={<Step8_Symptoms />} />
          <Route path="/check/step9"   element={<Step9_Review />} />
          <Route path="/check/step10"  element={<Step10_Results />} />
          <Route path="*"              element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App