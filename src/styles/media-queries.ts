import { css, ThemeProps } from "styled-components";
import { Theme } from "../themes/default-theme";

type Size = 'md' | 'l' | 'xl'

function mediaQuery(size: Size) {
  return css`
    ${(props: ThemeProps<Theme>) => props.theme.mediaQueries[size]}
  `
}

const mediaQueries = {
  md: mediaQuery('md'),
  l: mediaQuery('l'),
  xl: mediaQuery('xl'),
}

export default mediaQueries