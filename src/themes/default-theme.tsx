export interface Theme {
  colors: {
    primaryDarkest: string
    primaryDark2: string
    primaryDark1: string
    primary: string
    primaryLight1:string
    primaryLight2: string
    primaryLighter: string

    accentDarkest: string
    accentDark2: string
    accentDark1: string
    accent: string
    accentLight1:string
    accentLight2: string
    accentLighter: string

    greyDarkest: string
    greyDark2: string
    greyDark1: string
    grey: string
    greyLight1:string
    greyLigth2: string
    greyLighter: string
  }

  textFontFamily: string
  titleFontFamily: string


  softShadowLow: string
  softShadowMedium: string
  softShadowHigh: string

  defaultRadius: string
}

export const defaultTheme: Partial<Theme> = {
  colors: {
    primaryDarkest: '#394145',
    primaryDark2: '#516169',
    primaryDark1: '#6A808A',
    primary: '#8FA3AC',
    primaryLight1:'#A0B3BD',
    primaryLight2: '#BCC8CF',
    primaryLighter: '#E9EDF0',

    accentDarkest: '#4F3535',
    accentDark2: '#664444',
    accentDark1: '#7A5252',
    accent: '#a26c6c',
    accentLight1: '#B08686',
    accentLight2: '#E8BCBC',
    accentLighter: '#FFEDED',

    greyDarkest: '#333333',
    greyDark2: '#575757',
    greyDark1: '#959595',
    grey: '#BFBFBF',
    greyLight1:'#D4D4D4',
    greyLigth2: '#E8E8E8',
    greyLighter: '#F5F5F5',
  },

  textFontFamily: '\'Roboto\', sans-serif',
  titleFontFamily: '\'Open Sans Condensed\', sans-serif',

  softShadowLow: '0 2px 6px 0px rgba(0,0,0,0.3)',
  softShadowMedium: '0 2px 12px 0px rgba(0,0,0,0.3)',
  softShadowHigh: '0 2px 18px 0px rgba(0,0,0,0.3)',

  defaultRadius: '4px',
}