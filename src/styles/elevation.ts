import { ThemeProps, css } from "styled-components"
import { Theme } from "../themes/default-theme"

export type ElevationLevel = 0 | 1 | 2 | 3

const elevation = (level: ElevationLevel = 1) => css`
  box-shadow: ${(props: ThemeProps<Theme>) => {
    const levels = [
      'none',
      props.theme.softShadowLow,
      props.theme.softShadowMedium,
      props.theme.softShadowHigh
    ]
    return levels[Math.min(level, levels.length - 1)]
  }};
`

export default elevation