// Primary reusable button component
const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    disabled = false,
    icon = null,
  }) => {
    const base = `inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`
  
    const variants = {
      primary: 'text-white shadow-lg',
      secondary: 'bg-white text-[#4795c9] border border-[#c6e7ef] shadow-sm hover:bg-[#f0f4fb]',
      accent: 'text-white shadow-lg',
      ghost: 'bg-transparent text-[#4795c9] hover:bg-[#c6e7ef40]',
      danger: 'text-white shadow-lg',
    }
  
    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3.5 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2',
    }
  
    const gradients = {
      primary: 'linear-gradient(135deg, #4795c9 0%, #4aa1db 100%)',
      accent: 'linear-gradient(135deg, #a7232d 0%, #c42b36 100%)',
      danger: 'linear-gradient(135deg, #a7232d 0%, #c42b36 100%)',
      secondary: '',
      ghost: '',
    }
  
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`${base} ${variants[variant]} ${sizes[size]}`}
        style={gradients[variant] ? { background: gradients[variant] } : {}}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </button>
    )
  }
  
  export default Button