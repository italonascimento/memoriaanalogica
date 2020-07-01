export interface Theme {
  colors: {
    mainBackground: string
    dimBackground: string
    lightBackground: string
  
    neutralForeground: string
    dimNeutral: string
  
    primary: string
    dimPrimary: string
    secondary: string
    dimSecondary: string
  }

  mediaQueries: {
    md: string
    l: string
    xl: string
  },

  textFontFamily: string
  titleFontFamily: string


  softShadowLow: string
  softShadowMedium: string
  softShadowHigh: string

  defaultRadius: string
}

export const defaultTheme: Partial<Theme> = {
  colors: {
    mainBackground: 'white',
    dimBackground: '#f1f1f1',
    lightBackground: '#f9f9f9',
  
    neutralForeground: '#333',
    dimNeutral: '#dfdfdf',
  
    primary: '#68d388',
    dimPrimary: '#c2edda',
    secondary: '#f43a09',
    dimSecondary: '#ffb766',
  },

  mediaQueries: {
    md: '@media screen and (min-width: 720px)',
    l: '@media screen and (min-width: 1024px)',
    xl: '@media screen and (min-width: 1536px)',
  },

  textFontFamily: 'sans-serif',

  softShadowLow: '0 2px 6px 0px rgba(0,0,0,0.2)',
  softShadowMedium: '0 2px 12px 0px rgba(0,0,0,0.2)',
  softShadowHigh: '0 2px 18px 0px rgba(0,0,0,0.2)',

  defaultRadius: '4px',
}