import styled from "styled-components"

const Backdrop = styled.div<{zIndex?: number}>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  opacity: 0.3;
  z-index: ${props => props.zIndex || 200};
`

export default Backdrop