// Animated camera overlay with prism-themed guide ring
const CameraOverlay = ({ shape = 'circle', instruction = '' }) => {
    const shapes = {
      circle: 'rounded-full w-56 h-56',
      oval: 'rounded-full w-48 h-64',
      square: 'rounded-2xl w-56 h-56',
      hand: 'rounded-3xl w-64 h-48',
    }
  
    return (
      <div className="relative w-full aspect-square bg-black rounded-2xl overflow-hidden flex items-center justify-center">
        {/* Prism corner decorations */}
        <div className="absolute top-3 left-3 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-[rgba(26,111,232,0.4)]" />
        <div className="absolute top-3 right-3 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[28px] border-b-[rgba(232,59,46,0.4)]" />
        <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center">
          {/* Outer dashed ring */}
          <div className={`camera-ring absolute ${shapes[shape]} opacity-60`} />
          {/* Inner solid ring */}
          <div className={`camera-ring-solid absolute ${shapes[shape]} scale-90`} />
          {/* Crosshair */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" className="opacity-70">
            <line x1="12" y1="4" x2="12" y2="20"/>
            <line x1="4" y1="12" x2="20" y2="12"/>
          </svg>
        </div>
        {/* Instruction bar */}
        {instruction && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-4 py-3">
            <p className="text-white text-sm text-center font-medium">{instruction}</p>
          </div>
        )}
        {/* Camera controls */}
        <div className="absolute bottom-14 left-4">
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="1" y1="1" x2="23" y2="23"/>
              <path d="M9 9a3 3 0 0 0 5.12 2.12M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
            </svg>
          </button>
        </div>
        <div className="absolute bottom-14 right-4">
          <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </button>
        </div>
      </div>
    )
  }
  
  export default CameraOverlay