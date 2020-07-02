import React from 'react'
import styled, { ThemeProps } from "styled-components"
import { Theme } from '../../themes/default-theme'
import elevation, { ElevationLevel } from '../../styles/elevation'
import { mouseInteractionTransition } from '../../styles/transitions'

export interface IButtonProps {
  primary?: boolean
  secondary?: boolean
  children: React.ReactNode | React.ReactNode[]
  className?: string
  elevation?: ElevationLevel
}

const Button = ({
  children,
  className,
  elevation = 1,
  ...props
}: IButtonProps) => (
  <StyledButton {...props} elevation={elevation} className={className}>
    {children}
  </StyledButton>
)

type StyledButtonProps = IButtonProps & ThemeProps<Theme>

const StyledButton = styled.a<StyledButtonProps>`
  font-size: 12px;
  height: 32px;
  padding: 8px 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${(props: StyledButtonProps) => props.theme.colors.neutralForeground};
  border-radius: ${(props: StyledButtonProps) => props.theme.defaultRadius};
  
  ${(props: StyledButtonProps) => props.secondary && `color: ${props.theme.colors.secondary}`}
  ${(props: StyledButtonProps) => props.primary && `color: ${props.theme.colors.primary};`}
  
  ${(props: StyledButtonProps) => elevation(props.elevation)}

  ${mouseInteractionTransition('box-shadow')}

  &:hover {
    ${(props: StyledButtonProps) => elevation(props.elevation!! + 1 as ElevationLevel)}
  }
  
  &:active {
    ${(props: StyledButtonProps) => elevation(props.elevation!! + 2 as ElevationLevel)}
  }
`

export default Button