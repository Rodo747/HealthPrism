import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import BottomNav from '../components/ui/BottomNav'

const NewCheck = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#F4F6FA] pb-20">
      <div className="bg-white px-5 pt-12 pb-6">
        <button onClick={() => navigate('/')} className="flex items-center gap-1 text-[#1A6FE8] text-sm font-medium mb-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>
        <h1 className="text-3xl font-extrabold text-[#0D1B2A]">New Assessment</h1>
        <p className="text-sm text-[#4A5568] mt-2">Complete all 10 steps for an accurate risk profile.</p>
      </div>

      <div className="px-5 mt-5 space-y-3">
        {[
          { step: 1, title: 'Initial Data', desc: 'Age, weight, height and energy level', path: '/check/step1', color: '#1A6FE8' },
          { step: 2, title: 'Face Analysis', desc: 'General skin tone and appearance', path: '/check/step2', color: '#1A6FE8' },
          { step: 3, title: 'Conjunctiva Analysis', desc: 'Paleness indicator for anemia', path: '/check/step3', color: '#E83B2E' },
          { step: 4, title: 'Hand Analysis', desc: 'Palm and nail bed color', path: '/check/step4', color: '#1A6FE8' },
          { step: 5, title: 'Perfusion Test', desc: 'Tissue color recovery time', path: '/check/step5', color: '#E83B2E' },
          { step: 6, title: 'Heart Rate (PPG)', desc: 'Beats per minute via camera', path: '/check/step6', color: '#E83B2E' },
          { step: 7, title: 'Breathing Rate', desc: 'Respiratory cycles per minute', path: '/check/step7', color: '#1A6FE8' },
          { step: 8, title: 'Final Symptoms', desc: 'Appetite, fatigue and mood', path: '/check/step8', color: '#1A6FE8' },
          { step: 9, title: 'Review', desc: 'Verify all collected data', path: '/check/step9', color: '#1A6FE8' },
          { step: 10, title: 'Results', desc: 'Full risk profile with recommendations', path: '/check/step10', color: '#E83B2E' },
        ].map((item) => (
          <div key={item.step} onClick={() => navigate(item.path)}
            className="card p-4 flex items-center gap-4 cursor-pointer active:scale-95 transition-transform">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: item.color === '#E83B2E' ? 'linear-gradient(135deg, #E83B2E, #FF5A4E)' : 'linear-gradient(135deg, #1A6FE8, #4A90E2)' }}>
              <span className="text-white text-sm font-bold">{item.step}</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#0D1B2A]">{item.title}</p>
              <p className="text-xs text-[#4A5568]">{item.desc}</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9AA5B4" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        ))}
      </div>

      <div className="px-5 mt-6">
        <Button variant="primary" fullWidth onClick={() => navigate('/check/step1')}>
          Begin Check →
        </Button>
      </div>

      <BottomNav />
    </div>
  )
}

export default NewCheck