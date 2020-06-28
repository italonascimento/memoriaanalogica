import React from 'react'
import styled, { ThemeProps, css } from 'styled-components'
import { Product } from '../../types/product'
import ProductCard from '../molecules/product-card'
import { Theme } from '../../themes/default-theme'

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
`

const CardContainer = styled.div`
  flex-basis: 50%;
  padding: 8px;

  ${(props: ThemeProps<Theme>) => css`
    ${props.theme.mediaQueries.md} {
      flex-basis: 33%;
    }

    ${props.theme.mediaQueries.l} {
      flex-basis: 25%;
    }
  `}
`

export default VM