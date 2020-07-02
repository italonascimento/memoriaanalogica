import React, { useState, useEffect, useCallback } from 'react'
import styled, { ThemeProps } from 'styled-components'
import { FormattedNumber, Link, navigate } from 'gatsby-plugin-intl'
import { FluidObject } from "gatsby-image"

import Card from '../atoms/card'
import useProductDetails from '../hooks/useProduct'
import useTranslation from '../hooks/useTanslation'
import { Theme } from '../../themes/default-theme'
import elevation from '../../styles/elevation'
import mediaQueries from '../../styles/media-queries'
import PhotoSwing from './photo-swing'

interface ProductCardProps {
  price: number
  sku: string
  photos: FluidObject[]
  className?: string
}

const ProductCard = ({
  price,
  sku,
  className,
  photos,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const details = useProductDetails(sku)
  const t = useTranslation()

  const url = `/p/${sku}/${details.slug}/`

  return (
    <div
      onClick={() => navigate(url)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <StyledCard className={className}>
        <StyledPhotoSwing isActive={isHovered} photos={photos} />
        <Content>
          <Title>
            <Link to={url}>
              {details.name}
            </Link>
          </Title>
          <Price>
            <FormattedNumber value={price} style='currency' currency={t('currency')} />
          </Price>
        </Content>
      </StyledCard>
    </div>
  )
}

const StyledCard = styled(Card)<React.HTMLAttributes<HTMLElement>>`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    ${elevation(2)}
    background: ${(props: ThemeProps<Theme>) => props.theme.colors.lightBackground};
  }
`

const StyledPhotoSwing = styled(PhotoSwing)`
  width: 100%;
  padding-top: 100%;
`

const Content = styled.div`
  padding: 24px 16px;
  text-align: center;
`

const Title = styled.h3`
  font-size: 12px;
  margin-bottom: 16px;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.neutralForeground};

  ${mediaQueries.md} {
    font-size: 14px;
  }
`

const Price = styled.p`
  font-size: 16px;
  font-weight: lighter;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.secondary};
`

export default ProductCard