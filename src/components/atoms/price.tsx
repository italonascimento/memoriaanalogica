import React from 'react'
import { useCallback } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { FormattedNumber, useIntl } from "gatsby-plugin-intl"
import useTranslation from "../hooks/useTanslation"
import styled from 'styled-components'
import Card from './card'

interface Props {
  value: number
}

const Price = ({
  value,
}: Props) => {
  const intl = useIntl()
  const t = useTranslation()
  
  const { exchangeRates } = useStaticQuery(graphql`
    query {
      exchangeRates {
        id
        date
        USD
        BRL
      }
    }
  `)

  const rate = exchangeRates.BRL / exchangeRates.USD

  const getPrice = useCallback(() => {
    return intl.locale === 'pt'
      ? value
      : value / rate
  }, [rate, value, intl.locale])

  return (
    <Container>
      <FormattedNumber value={getPrice()} style='currency' currency={t('currency')} />{intl.locale !== 'pt' && '*'}
      {intl.locale !== 'pt' && (
        <Tooltip elevation={3}>
          {t('exchange_rate_warning')}
        </Tooltip>
      )}
    </Container>
  )
}

const Tooltip = styled(Card)`
  position: absolute;
  display: none;
  padding: 8px;
  font-size: 12px;
  z-index: 100;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
  margin-top: 6px;

  &::before {
    content: '';
    border-bottom: 6px solid #fff;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
  }
`

const Container = styled.span`
  position: relative;

  &:hover > ${Tooltip} {
    display: block;
  }
`

export default Price