export interface Theme {
  colors: {
    mainBackground: string
    dimBackground: string
    selectionBackground: string
  
    neutralForeground: string
    dimNeutral: string
  
    primary: string
    dimPrimary: string
    secondary: string
    dimSecondary: string
  }

  textFontFamily: string
  titleFontFamily: string


  softShadowLow: string
  softShadowMedium: string
  softShadowHigh: string
}

export const defaultTheme: Partial<Theme> = {
  colors: {
    mainBackground: 'white',
    dimBackground: '#f1f1f1',
    selectionBackground: '#e1e1e1',
  
    neutralForeground: '#333',
    dimNeutral: '#ccc',
  
    primary: '#68d388',
    dimPrimary: '#c2edda',
    secondary: '#f43a09',
    dimSecondary: '#ffb766',
  },

  textFontFamily: 'sans-serif',

  softShadowLow: '0 2px 6px 0px rgba(0,0,0,0.2)',
  softShadowMedium: '0 2px 12px 0px rgba(0,0,0,0.2)',
  softShadowHigh: '0 2px 18px 0px rgba(0,0,0,0.2)',
}