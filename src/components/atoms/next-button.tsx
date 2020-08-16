import React from 'react'
import styled from "styled-components"
import { MdNavigateNext } from "react-icons/md"

import Button, { ButtonProps } from "./button"
import useTranslation from '../hooks/useTanslation'

interface Props extends ButtonProps {

}

const NextButton = ({
  onClick,
  ...props
}: Props) => {
  const t = useTranslation('checkout')

  return (
    <StyledButton {...props} onClick={onClick}>
      {t('next_button')}
      <StyledArrowRight size={18} />
    </StyledButton>
  )
}

const StyledButton = styled(Button)`
  align-self: flex-end;
  margin-top: 12px;
  padding-right: 24px;
`

const StyledArrowRight = styled(MdNavigateNext)`
  margin-left: 8px;
`

export default NextButton