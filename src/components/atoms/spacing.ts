import styled from "styled-components";

interface ISpacerProps {
  x?: number
  y?: number
}

const Spacing = styled.span<ISpacerProps>`
  display: block;
  ${props => props.y && `height: ${props.y}px;`}
  ${props => props.x && `width: ${props.x}px;`}
`

export default Spacing