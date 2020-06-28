import React from 'react'
import styled from 'styled-components'
import { Product } from '../../types/product'
import { useIntl } from 'gatsby-plugin-intl'
import useTranslation from '../hooks/useTanslation'

export interface IVMProps {
  products: Product[]
}

const VM = ({
  products = [],
}: IVMProps) => {
  const t = useTranslation()

  return (
    <Container>
      {products.map(({ sku, price }) => (
        <>
          {t(`products.${sku}.name`)}
        </>
      ))}
    </Container>
  )
}

const Container = styled.section`

`

export default VM