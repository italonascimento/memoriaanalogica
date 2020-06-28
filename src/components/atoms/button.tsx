import React from 'react'
import styled, { ThemeProps } from "styled-components"
import { Theme } from '../../themes/default-theme'

export interface IButtonProps {
  primary?: boolean
  secondary?: boolean
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

const Button = ({
  children,
  className,
}: IButtonProps) => (
  <StyledButton className={className}>
    {children}
  </StyledButton>
)

type StyledButtonProps = IButtonProps & ThemeProps<Theme>

const StyledButton = styled.a`
  font-size: 12px;
  height: 24px;
  padding: 4px 16px;
  box-shadow: ${(props: StyledButtonProps) => props.theme.softShadow};
  display: inline-flex;
  align-items: center;
  justify-content: center;

  color: ${(props: StyledButtonProps) => props.theme.neutralForeground};
  ${(props: StyledButtonProps) => props.secondary && `color: ${props.theme.secondary};`};
  ${(props: StyledButtonProps) => props.primary && `color: ${props.theme.primary};`};
`

export default Button