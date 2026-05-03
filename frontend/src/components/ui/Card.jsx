const Card = ({ children, className = '', onClick = null, accent = false }) => {
    return (
      <div
        onClick={onClick}
        className={`card p-4 ${accent ? 'border-l-4 border-l-[#a7232d] bg-gradient-to-r from-[#fff] to-[#fdecea]' : 'hover:border-[#a7232d] hover:shadow-[0_2px_12px_rgba(167,35,45,.08)]'} ${onClick ? 'cursor-pointer active:scale-98 transition-all' : ''} ${className}`}
      >
        {children}
      </div>
    )
  }
  
  export default Card