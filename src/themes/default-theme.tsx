export interface Theme {
  mainBackground: string
  dimBackground: string
  softShadow: string
}

export const defaultTheme: Theme = {
  mainBackground: 'white',
  dimBackground: '#f1f1f1',
  softShadow: '0 0 4px 0 rgba(0, 0, 0, 0.4)',
}