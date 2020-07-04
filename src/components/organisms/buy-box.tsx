import React, { useEffect } from 'react'
import styled, { ThemeProps } from "styled-components"

import useProductDetails from "../hooks/useProduct"
import { Theme } from '../../themes/default-theme'
import { FormattedNumber } from 'gatsby-plugin-intl'
import useTranslation from '../hooks/useTanslation'
import Spacing from '../atoms/spacing'
import Button from '../atoms/button'
import mediaQueries from '../../styles/media-queries'
import useGlobalState from '../../state/useGlobalState'
import { actions } from '../../state/cart-state'
import { Product } from '../../types/product'


interface BuyBoxProps {
  product: Product
  className?: string
}

const BuyBox = ({
  product,
  className,
}: BuyBoxProps) => {
  const { sku, price } = product

  const details = useProductDetails(sku)
  const t = useTranslation()
  const [state, dispatch] = useGlobalState()

  const addToCartHandler = () => {
    dispatch(actions.addToCart(product))
  }

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(state.cart.items))
  }, [state.cart.items])

  return (
    <Container className={className}>
      <Title>{details.name}</Title>
      <Spacing y={16} />
      <Price>
        <FormattedNumber value={price} style='currency' currency={t('currency')} />
      </Price>

      <Spacing y={32} />

      <Button large primary onClick={addToCartHandler}>
        {t('add-to-cart')}
      </Button>

      <Spacing y={64} />

      <DescriptionTitle>{t('description')}</DescriptionTitle>
      <Description>
        {details.description}
      </Description>
    </Container>
  )
}

const Container = styled.div`
  padding: 32px 16px;

  text-align: center;

  ${mediaQueries.md} {
    text-align: left;
  }
`

const Title = styled.h2`
  font-size: 32px;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.greyDarkest};

  ${mediaQueries.l} {
    font-size: 40px;
  }
`

const Price = styled.p`
  font-size: 32px;
  font-weight: lighter;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.accent};
`

const DescriptionTitle = styled.h4`
  margin-bottom: 20px;
  font-size: 20px;

  ${mediaQueries.md} {
    text-align: left;
    margin-bottom: 24px;
    font-size: 24px;
  }
`

const Description = styled.p`
  font-size: 12px;
  text-align: left;
`

export default BuyBox