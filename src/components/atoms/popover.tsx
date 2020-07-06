import React from 'react'
import styled, { css } from 'styled-components'

import elevation from '../../styles/elevation'
import { Theme } from '../../themes/default-theme'
import Card from './card'

interface PopoverProps {
  anchor?: {
    h?: 'left' | 'right'
    v?: 'top' | 'bottom'
  }
  className?: string
  children?: React.ReactNode | React.ReactNode[]
}

const Popover = ({
  children,
  className,
  anchor = { v: 'top', h: 'left' },
}: PopoverProps) => (
  <Container className={className}>
    <StyledCard anchor={anchor}>
      {children}
    </StyledCard>
  </Container>
)

const Container = styled.div`
  position: relative;
`

const StyledCard = styled(Card)<PopoverProps>`
  position: absolute;
  background: white;
  ${(props: PopoverProps) => css`
    ${props.anchor!!.h}: 0;
    ${props.anchor!!.v}: 0;
    margin-${props.anchor!!.v}: 4px;
  `}

  ${elevation(2)}
`

export default Popover