const Badge = ({ label, variant = 'default' }) => {
    const variants = {
      default: 'bg-[#EEF2F8] text-[#4A5568]',
      primary: 'bg-[#1A6FE8] text-white',
      critical: 'bg-[#FFE5E3] text-[#E83B2E]',
      moderate: 'bg-[#FEF3C7] text-[#D97706]',
      normal: 'bg-[#D1FAE5] text-[#059669]',
      info: 'bg-[#EEF2F8] text-[#1A6FE8]',
    }
  
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variants[variant]}`}>
        {label}
      </span>
    )
  }
  
  export default Badge