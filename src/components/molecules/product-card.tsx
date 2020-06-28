import React from 'react'
import styled, { ThemeProps } from 'styled-components'
import { FormattedNumber } from 'gatsby-plugin-intl'

import Card from '../atoms/card'
import useProductDetails from '../hooks/useProduct'
import useTranslation from '../hooks/useTanslation'
import { Theme } from '../../themes/default-theme'
import elevation from '../../styles/elevation'

interface ProductCardProps {
  price: number
  sku: string
  photos?: string[]
  className?: string
}

const ProductCard = ({
  price,
  sku,
  className
}: ProductCardProps) => {
  const details = useProductDetails(sku)
  const t = useTranslation()
  
  return (
    <StyledCard className={className}>
      <Photo>

      </Photo>
      <Content>
        <Title>
          {details.name}
        </Title>
        <Price>
          <FormattedNumber value={price} style='currency' currency={t('currency')} />
        </Price>
      </Content>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;

  &:hover {
    ${elevation(2)}
  }
`

const Photo = styled.figure`

`

const Content = styled.div`
  padding: 16px;
`

const Title = styled.h3`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.neutralForeground};
`

const Price = styled.p`
  font-size: 18px;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.primary};
`

export default ProductCard