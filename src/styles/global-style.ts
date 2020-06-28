import { createGlobalStyle, ThemeProps } from 'styled-components'
import { Theme } from '../themes/default-theme'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${(props: ThemeProps<Theme>) => props.theme.textFontFamily};
    background: ${(props: ThemeProps<Theme>) => props.theme.colors.dimBackground};
  }

  a {
    cursor: pointer;
  }
`

export default GlobalStyle