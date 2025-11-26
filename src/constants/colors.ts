// Arquivo: src/constants/colors.ts

// --- 1. CORES PRIMITIVAS (Marca / Fixas) ---
const PALETTE = {
  greenPrimary: '#348e57',
  greenLight: '#85c49e',
  redError: '#E74C3C',
  redLight: '#fff5f5',
  white: '#ffffff',
  black: '#000000',
  gray100: '#f5f7fa',
  gray200: '#e1e1e1',
  gray300: '#cccccc',
  gray600: '#999999',
  gray800: '#333333',
  dark100: '#121212', 
  dark200: '#1e1e1e', 
};

// --- 2. CORES SEMÂNTICAS (Variam com o tema) ---
export const lightTheme = {
  mode: 'light',
  colors: {
    primary: PALETTE.greenPrimary,
    secondary: PALETTE.greenLight,
    background: PALETTE.gray100, 
    surface: PALETTE.white,
    text: PALETTE.gray800,
    textLight: PALETTE.gray600,
    
    // Propriedades de UI
    gray: PALETTE.gray300,
    border: PALETTE.gray300,
    icon: PALETTE.greenPrimary, 
    
    inputBg: PALETTE.white,
    error: PALETTE.redError,
    errorLight: PALETTE.redLight,
    errorBorder: '#fee',
    
    white: PALETTE.white,
    whiteTransparent: 'rgba(255, 255, 255, 0.2)',
    placeholder: PALETTE.gray200,
    
    lines: {
      green: '#4CAF50', greenBg: '#E8F5E9',
      brown: '#8D6E63', brownBg: '#EFEBE9',
      blue: '#42A5F5',  blueBg: '#E3F2FD',
      white: '#9E9E9E', whiteBg: '#F5F5F5',
    },
    methods: {
      pickup: '#009688', pickupBg: '#E0F2F1',
      dropoff: '#2196F3', dropoffBg: '#E3F2FD',
    }
  }
};

export const darkTheme = {
  mode: 'dark',
  colors: {
    primary: PALETTE.greenPrimary,
    secondary: PALETTE.greenLight,
    background: PALETTE.dark100,
    surface: PALETTE.dark200,
    text: PALETTE.gray100,
    textLight: PALETTE.gray300,
    
    // Propriedades de UI
    gray: '#666666',
    border: '#444444',
    icon: PALETTE.white, 

    inputBg: '#2C2C2C',
    error: '#EF5350',
    errorLight: 'rgba(239, 83, 80, 0.1)',
    errorBorder: 'rgba(239, 83, 80, 0.3)',
    
    white: PALETTE.white,
    whiteTransparent: 'rgba(255, 255, 255, 0.1)',
    placeholder: '#444',

    lines: lightTheme.colors.lines,
    methods: lightTheme.colors.methods,
  }
};

export const COLORS = lightTheme.colors;