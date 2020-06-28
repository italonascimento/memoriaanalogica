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


  softShadow: string
}

export const defaultTheme: Partial<Theme> = {
  colors: {
    mainBackground: 'white',
    dimBackground: '#f1f1f1',
    selectionBackground: '#e1e1e1',
  
    neutralForeground: '#333',
    dimNeutral: '#ccc',
  
    primary: '#68d388',
    dimPrimary: '#f43a09',
    secondary: '#f43a09',
    dimSecondary: '#ffb766',
  },

  textFontFamily: 'sans-serif',


  softShadow: '0 2px 3px 0px rgba(0,0,0,0.2)',
}