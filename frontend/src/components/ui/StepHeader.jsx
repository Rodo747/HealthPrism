import ProgressBar from './ProgressBar'

const StepHeader = ({ step, total, title, onBack }) => {
  return (
    <div className="px-5 pt-5 pb-4 bg-white border-b border-[#DDE3ED]">
      <div className="flex items-center justify-between mb-1">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-[#1A6FE8] text-sm font-medium"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>
        <span className="text-xs font-semibold text-[#9AA5B4] tracking-widest uppercase">
          Step {step} of {total}
        </span>
      </div>
      <h1 className="text-2xl font-extrabold text-[#0D1B2A] mt-3 mb-3">{title}</h1>
      <ProgressBar step={step} total={total} />
      <p className="text-xs text-[#9AA5B4] text-right mt-1">{Math.round((step / total) * 100)}% completed</p>
    </div>
  )
}

export default StepHeader