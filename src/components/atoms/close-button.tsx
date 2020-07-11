import React from 'react'
import { GrClose } from "react-icons/gr"
import styled from 'styled-components'

import Button, { ButtonProps } from "./button"

const CloseButton = (props: ButtonProps) => (
  <StyledButton elevation={0} round {...props}>
    <GrClose size={24} />
  </StyledButton>
)

const StyledButton = styled(Button)`
  width: 40px;
  height: 40px;
`

export default CloseButton