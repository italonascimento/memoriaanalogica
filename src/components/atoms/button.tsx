import React, { DOMAttributes } from 'react'
import styled, { ThemeProps, css } from "styled-components"
import { Theme } from '../../themes/default-theme'
import elevation, { ElevationLevel } from '../../styles/elevation'
import { mouseInteractionTransition } from '../../styles/transitions'

export interface ButtonProps extends DOMAttributes<Element> {
  primary?: boolean
  accent?: boolean
  outline?: boolean
  large?: boolean
  full?: boolean
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  elevation?: ElevationLevel
  round?: boolean
}

const Button = ({
  children,
  elevation = 1,
  ...props
}: ButtonProps) => (
  <StyledButton {...props} elevation={elevation}>
    {children}
  </StyledButton>
)

type StyledButtonProps = ButtonProps & ThemeProps<Theme>

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
  border-radius: ${(props: StyledButtonProps) => props.round ? '100%' : props.theme.defaultRadius};
  
  color: ${(props: StyledButtonProps) => props.theme.colors.greyDarkest};

  ${(props: StyledButtonProps) => props.outline
  ? css`
    ${props.accent && css`
      color: ${props.theme.colors.accent};

      &:active {
        color: ${props.theme.colors.accentLight1};
      }
    `}
    ${props.primary && css`
      color: ${props.theme.colors.primary};

      &:active {
        color: ${props.theme.colors.primaryLight1};
      }
    `}
  `
  : css`
    ${props.accent && css`
      background: ${props.theme.colors.accent};
      color: white;

      &:hover {
        background: ${props.theme.colors.accentLight1};
      }
    `}
    ${props.primary && css`
      background: ${props.theme.colors.primary};
      color: white;

      &:active {
        background: ${props.theme.colors.primaryLight1};
      }
    `}
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