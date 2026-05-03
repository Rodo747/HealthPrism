const TipCard = ({ icon, title, description, variant = 'primary' }) => {
    return (
      <div className={`tip-card ${variant === 'red' ? 'tip-card-red' : ''} p-4 flex gap-3`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${variant === 'red' ? 'bg-[#FFE5E3]' : 'bg-[#EEF2F8]'}`}>
          <span className={variant === 'red' ? 'text-[#E83B2E]' : 'text-[#1A6FE8]'}>{icon}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-[#0D1B2A]">{title}</p>
          <p className="text-xs text-[#4A5568] mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
    )
  }
  
  export default TipCard