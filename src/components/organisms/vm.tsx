import React from 'react'
import styled from 'styled-components'
import { Product } from '../../types/product'
import ProductCard from '../molecules/product-card'
import mediaQueries from '../../styles/media-queries'
import { FluidObject } from 'gatsby-image'

export interface IVMProps {
  products: Product[]
}

const VM = ({
  products = [],
}: IVMProps) => {
  // console.log(products)
  return (
    <Container>
      {products.map(({ sku, price, photos }) => (
        <CardContainer key={sku}>
          <ProductCard
            photos={photos}
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