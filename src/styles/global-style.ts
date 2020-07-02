import { createGlobalStyle, ThemeProps } from 'styled-components'
import { Theme } from '../themes/default-theme'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${(props: ThemeProps<Theme>) => props.theme.textFontFamily};
    background: ${(props: ThemeProps<Theme>) => props.theme.colors.lightBackground};
  }

  h1, h2, h3, h4, h5,
  p, figure, section, ul {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: inherit;
  }
`

export default GlobalStyle