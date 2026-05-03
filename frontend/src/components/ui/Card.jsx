const Card = ({ children, className = '', onClick = null, accent = false }) => {
    return (
      <div
        onClick={onClick}
        className={`card p-4 ${accent ? 'border-l-4 border-l-[#E83B2E]' : ''} ${onClick ? 'cursor-pointer active:scale-98' : ''} ${className}`}
      >
        {children}
      </div>
    )
  }
  
  export default Card