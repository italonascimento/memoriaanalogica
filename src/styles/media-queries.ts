import { ThemeProps } from "styled-components";
import { Theme } from "../themes/default-theme";

type Size = 'md' | 'l' | 'xl'

export const mediaQueryValues = {
  md: '(min-width: 720px)',
  l: '(min-width: 1024px)',
  xl: '(min-width: 1536px)',
}

const mediaQuery = (size: Size) =>
  `@media ${mediaQueryValues[size]}`

const mediaQueries = {
  md: mediaQuery('md'),
  l: mediaQuery('l'),
  xl: mediaQuery('xl'),
}

export default mediaQueries