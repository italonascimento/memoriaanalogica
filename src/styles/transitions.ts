import { css } from "styled-components"

const buildMouseInteractionTransition = (duration : number, properties: string[]) =>
  `transition: ${properties.map(property => `${property} ${duration}ms ease-in`).join(', ')};`

export const mouseInteractionTransition = (...properties: string[]) => css`
  ${buildMouseInteractionTransition(60, properties)}

  &:hover {
    ${buildMouseInteractionTransition(60, properties)}
  }

  &:active {
    ${buildMouseInteractionTransition(30, properties)}
  }
`