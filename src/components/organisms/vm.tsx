import React from 'react'
import styled, { ThemeProps, css } from 'styled-components'
import { Product } from '../../types/product'
import ProductCard from '../molecules/product-card'
import { Theme } from '../../themes/default-theme'
import mediaQueries from '../../styles/media-queries'

export interface IVMProps {
  products: Product[]
}

const VM = ({
  products = [],
}: IVMProps) => {
  return (
    <Container>
      {products.map(({ sku, price }) => (
        <CardContainer>
          <ProductCard
            price={price}
            sku={sku}
          />
        </CardContainer>
      ))}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
`

const CardContainer = styled.div`
  flex-basis: 50%;
  padding: 8px;

  ${mediaQueries.md} {
    flex-basis: 33%;
  }

  ${mediaQueries.l} {
    flex-basis: 25%;
  }
`

export default VM