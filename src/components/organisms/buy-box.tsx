import React from 'react'
import styled, { ThemeProps } from "styled-components"

import useProductDetails from "../hooks/useProduct"
import { Theme } from '../../themes/default-theme'
import { FormattedNumber } from 'gatsby-plugin-intl'
import useTranslation from '../hooks/useTanslation'
import Spacing from '../atoms/spacing'
import Button from '../atoms/button'
import mediaQueries from '../../styles/media-queries'


interface BuyBoxProps {
  sku: string
  price: number
  className?: string
}

const BuyBox = ({
  sku,
  price,
  className,
}: BuyBoxProps) => {
  const details = useProductDetails(sku)
  const t = useTranslation()

  return (
    <Container className={className}>
      <Title>{details.name}</Title>
      <Spacing y={16} />
      <Price>
        <FormattedNumber value={price} style='currency' currency={t('currency')} />
      </Price>

      <Spacing y={32} />

      <Button large full primary>
        {t('add-to-cart')}
      </Button>
    </Container>
  )
}

const Container = styled.div`
  padding: 32px 16px;

  text-align: center;

  ${mediaQueries.md} {
    text-align: right;
  }
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: lighter;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.neutralForeground};
  
  ${mediaQueries.md} {
    font-size: 32px;
  }

  ${mediaQueries.l} {
    font-size: 40px;
  }
`

const Price = styled.p`
  font-size: 32px;
  font-weight: lighter;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.secondary};
`

export default BuyBox