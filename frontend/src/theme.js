const theme = {
    colors: {
      // Primary palette
      primary: '#1A6FE8',
      primaryLight: '#4A90E2',
      primaryDark: '#0D4FB5',
  
      // Accent red - core brand color
      accent: '#E83B2E',
      accentLight: '#FF5A4E',
      accentDark: '#C42B20',
  
      // Neutrals
      white: '#FFFFFF',
      background: '#F4F6FA',
      surface: '#FFFFFF',
      surfaceAlt: '#EEF2F8',
  
      // Text
      textPrimary: '#0D1B2A',
      textSecondary: '#4A5568',
      textMuted: '#9AA5B4',
  
      // Risk levels
      critical: '#E83B2E',
      moderate: '#F59E0B',
      normal: '#10B981',
  
      // Borders
      border: '#DDE3ED',
      borderLight: '#EEF2F8',
    },
  
    // Prism decorative accent gradient
    prismGradient: 'linear-gradient(135deg, #1A6FE8 0%, #E83B2E 50%, #F59E0B 100%)',
    primaryGradient: 'linear-gradient(135deg, #1A6FE8 0%, #4A90E2 100%)',
    accentGradient: 'linear-gradient(135deg, #E83B2E 0%, #FF5A4E 100%)',
  
    borderRadius: {
      sm: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      full: '9999px',
    },
  
    shadows: {
      sm: '0 1px 3px rgba(0,0,0,0.08)',
      md: '0 4px 12px rgba(0,0,0,0.10)',
      lg: '0 8px 24px rgba(0,0,0,0.12)',
      prism: '0 8px 32px rgba(26,111,232,0.15)',
    },
  
    typography: {
      fontFamily: "'Inter', sans-serif",
      sizes: {
        xs: '11px',
        sm: '13px',
        base: '15px',
        md: '17px',
        lg: '20px',
        xl: '24px',
        xxl: '32px',
        hero: '40px',
      },
      weights: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
      },
    },
  }
  
  export default theme