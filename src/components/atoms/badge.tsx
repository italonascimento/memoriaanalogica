import React from 'react'
import styled, { ThemeProps, css } from "styled-components"
import { Theme } from '../../themes/default-theme'

interface BadgeProps {
  primary?: boolean
  accent?: boolean
}

const Badge = styled.span<BadgeProps>`
  border-radius: 16px;
  font-size: 8px;
  padding: 2px 4px;
  text-align: center;

  ${(props: BadgeProps & ThemeProps<Theme>) => props.primary
  ? css`
    background: ${props.theme.colors.primaryDark1};
    color: ${props.theme.colors.primaryLighter};
  `
  : props.accent
  ? css`
    background: ${props.theme.colors.accentDark1};
    color: ${props.theme.colors.accentLighter};
  `
  : css`
    background: ${props.theme.colors.greyDark1};
    color: white;
  `}
`

export default Badge