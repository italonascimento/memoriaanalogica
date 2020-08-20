import React, { useEffect } from 'react'
import styled, { ThemeProps } from "styled-components"

import useProductDetails from "../hooks/useProduct"
import { Theme } from '../../themes/default-theme'
import useTranslation from '../hooks/useTanslation'
import Spacing from '../atoms/spacing'
import Button from '../atoms/button'
import mediaQueries from '../../styles/media-queries'
import useGlobalState from '../../state/useGlobalState'
import { actions } from '../../state/cart-state'
import { Product } from '../../types/product'
import Price from '../atoms/price'
import { useIntl } from 'gatsby-plugin-intl'


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
  const { locale } = useIntl()
  const [cart, dispatch] = useGlobalState(s => s.cart)

  const addToCartHandler = () => {
    dispatch(actions.addToCart(product))
    dispatch(actions.setIsCartOpen(true))
  }

  return (
    <Container className={className}>
      <Title>{details.name}</Title>
      <Spacing y={16} />
      <PriceContainer>
        <Price value={price} />
        <Asterisk>*</Asterisk>
      </PriceContainer>
      {locale !== 'pt' && (
        <>
          <Spacing y={8} />
          <ExchangeRateWarning>
            *{t('exchange_rate_warning')}
          </ExchangeRateWarning>
        </>
      )}

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

const PriceContainer = styled.p`
  position: relative;
  font-size: 40px;
  font-weight: lighter;
  display: inline;
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
  line-height: 1.5;
`

const Asterisk = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  font-size: 65%;
`

const ExchangeRateWarning = styled.p`
  display: inline-block;
  text-align: left;
  font-size: 11px;
  line-height: 1.2;
  background: ${(props: ThemeProps<Theme>) => props.theme.colors.accentLighter};
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.accent};
  border: 1px solid ${(props: ThemeProps<Theme>) => props.theme.colors.accentLight2};
  padding: 4px 6px;
  border-radius: 4px;
  max-width: 320px;
`

export default BuyBox