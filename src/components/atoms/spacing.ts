import styled from "styled-components";

interface ISpacerProps {
  x?: number
  y?: number
}

const Spacing = styled.span<ISpacerProps>`
  display: block;
  ${props => props.y && `margin-top: ${props.y}px;`}
  ${props => props.x && `margin-left: ${props.x}px;`}
`

export default Spacing