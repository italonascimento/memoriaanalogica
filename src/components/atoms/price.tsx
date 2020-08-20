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
    <FormattedNumber value={getPrice()} style='currency' currency={t('currency')} />
  )
}

export default Price