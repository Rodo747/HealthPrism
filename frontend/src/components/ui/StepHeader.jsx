import ProgressBar from './ProgressBar'

const StepHeader = ({ step, total, title, onBack }) => {
  return (
    <div className="px-5 pt-5 pb-4 bg-white border-b border-[#DDE3ED]">
      <div className="flex items-center justify-between mb-1">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-[#4795c9] text-sm font-medium hover:text-[#a7232d] transition-colors"
          >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>
        <span className="text-xs font-semibold text-[#a7232d] tracking-widest uppercase bg-[#fdecea] px-2 py-0.5 rounded">
          Step {step} of {total}
        </span>
      </div>
      <h1 className="text-2xl font-extrabold text-[#0D1B2A] mt-3 mb-3">{title}</h1>
      <ProgressBar step={step} total={total} />
      <p className="text-xs text-[#a7232d] text-right mt-1 font-medium">{Math.round((step / total) * 100)}% completed</p>
    </div>
  )
}

export default StepHeader