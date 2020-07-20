import styled, { ThemeProps } from 'styled-components'
import { Theme } from '../../themes/default-theme'

const Input = styled.input`
  padding: 12px;
  display: block;
  width: 100%;
  min-width: 0;
  border: none;
  background: ${(props: ThemeProps<Theme>) => props.theme.colors.greyLighter};
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.greyDarkest};
  box-shadow: inset 0 -2px 8px -7px rgba(0,0,0,0.5);
`

export default Input