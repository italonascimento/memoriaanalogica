import { createGlobalStyle, ThemeProps } from 'styled-components'
import { Theme } from '../themes/default-theme'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${(props: ThemeProps<Theme>) => props.theme.textFontFamily};
    background: ${(props: ThemeProps<Theme>) => props.theme.colors.dimBackground};
  }

  h1, h2, h3, h4, h5,
  p, figure, section {
    margin: 0;
  }

  a {
    cursor: pointer;
  }
`

export default GlobalStyle