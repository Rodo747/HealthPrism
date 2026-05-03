const Badge = ({ label, variant = 'default' }) => {
    const variants = {
      default: 'bg-[#c6e7ef40] text-[#0d1b2a]',
      primary: 'bg-[#4795c9] text-white',
      critical: 'bg-[#fdecea] text-[#a7232d]',
      moderate: 'bg-[#fef3c7] text-[#D97706]',
      normal: 'bg-[#D1FAE5] text-[#059669]',
      info: 'bg-[#c6e7ef40] text-[#4795c9]',
    }
    
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${variants[variant]}`}>
        {label}
      </span>
    )
  }
  
  export default Badge