import React from 'react'
import styled, { ThemeProps } from 'styled-components'
import { GiShoppingCart } from 'react-icons/gi'
import { navigate } from 'gatsby-plugin-intl'

import { Theme } from '../../themes/default-theme'
import Button from '../atoms/button'
import Spacing from '../atoms/spacing'
import useTranslation from '../hooks/useTanslation'

const EmptyCartWarning = () => {
  const t = useTranslation()
  
  return (
    <WarningContainer>
      <GiShoppingCart size={128} />
      <Spacing y={32} />
      <Warning>
        {t('cart.cart_is_empty')}
      </Warning>
      <Spacing y={32} />
      <Button large primary onClick={() => navigate('/')}>
        {t('back_to_home')}
      </Button>
    </WarningContainer>
  )
}

const WarningContainer = styled.div`
  max-width: 620px;
  height: 100%;
  margin: 0 auto;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.greyDark2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    flex-shrink: 0;
  }
`

const Warning = styled.p`
  font-size: 24px;
  text-align: center;
`

export default EmptyCartWarning