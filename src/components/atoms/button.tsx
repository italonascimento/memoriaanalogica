import React from 'react'
import styled, { ThemeProps, css } from "styled-components"
import { Theme } from '../../themes/default-theme'
import elevation, { ElevationLevel } from '../../styles/elevation'
import { mouseInteractionTransition } from '../../styles/transitions'

export interface IButtonProps {
  primary?: boolean
  accent?: boolean
  large?: boolean
  full?: boolean
  children: React.ReactNode | React.ReactNode[]
  className?: string
  elevation?: ElevationLevel
}

const Button = ({
  children,
  elevation = 1,
  ...props
}: IButtonProps) => (
  <StyledButton {...props} elevation={elevation}>
    {children}
  </StyledButton>
)

type StyledButtonProps = IButtonProps & ThemeProps<Theme>

const StyledButton = styled.a<StyledButtonProps>`
  ${(props: StyledButtonProps) => props.large
  ? css`
    font-size: 14px;
    height: 48px;
    padding: 0 32px;
  `
  : css`
    font-size: 12px;
    height: 32px;
    padding: 0 16px;
  `}

  display: ${(props: StyledButtonProps) => props.full ? 'flex' : 'inline-flex'};
  align-items: center;
  justify-content: center;
  color: ${(props: StyledButtonProps) => props.accent || props.primary
    ? 'white' : props.theme.colors.greyDarkest };
  border-radius: ${(props: StyledButtonProps) => props.theme.defaultRadius};
  
  ${(props: StyledButtonProps) => props.accent && css`
    background: ${props.theme.colors.accent};

    &:hover {
      background: ${props.theme.colors.accentDark1};
      color: ${props.theme.colors.accentLighter};
    }
  `}
  ${(props: StyledButtonProps) => props.primary && css`
    background: ${props.theme.colors.primary};

    &:hover {
      background: ${props.theme.colors.primaryDark1};
      color: ${props.theme.colors.primaryLighter};
    }
  `}
  
  ${(props: StyledButtonProps) => elevation(props.elevation)}

  ${mouseInteractionTransition('box-shadow', 'color', 'background')}

  &:hover {
    ${(props: StyledButtonProps) => elevation(props.elevation!! + 1 as ElevationLevel)}
  }
  
  &:active {
    ${(props: StyledButtonProps) => elevation(props.elevation!! + 2 as ElevationLevel)}
  }
`

export default Button