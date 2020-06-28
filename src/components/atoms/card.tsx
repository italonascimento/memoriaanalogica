import React from 'react'
import styled, { ThemeProps } from "styled-components"

import { Theme } from '../../themes/default-theme'
import elevation, { ElevationLevel } from '../../styles/elevation'

interface CardProps {
  children?: React.ReactNode | React.ReactNode[]
  elevation?: ElevationLevel
  className?: string
}

const Card = ({
  children,
  elevation = 1,
  className,
}: CardProps) => (
  <StyledCard className={className}>
    {children}
  </StyledCard>
)

type StyledCardProps = CardProps & ThemeProps<Theme>

const StyledCard = styled.div<StyledCardProps>`
  overflow: hidden;
  border-radius: ${(props: StyledCardProps) => props.theme.defaultRadius};
  ${(props: StyledCardProps) => elevation(props.elevation)}
  background: ${(props: StyledCardProps) => props.theme.colors.mainBackground};
`

export default Card