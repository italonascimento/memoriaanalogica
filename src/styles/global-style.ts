import { createGlobalStyle, ThemeProps } from 'styled-components'
import { Theme } from '../themes/default-theme'

const GlobalStyle = createGlobalStyle`
  body {
    background: ${(props: ThemeProps<Theme>) => props.theme.dimBackground};
  }

  a {
    cursor: pointer;
  }
`

export default GlobalStyle