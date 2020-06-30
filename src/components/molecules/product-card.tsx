import React, { useState, useEffect, useCallback } from 'react'
import styled, { ThemeProps } from 'styled-components'
import { FormattedNumber, Link } from 'gatsby-plugin-intl'
import Img, { FluidObject } from "gatsby-image"

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

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <StyledCard className={className}>
        <StyledPhotoSwing isActive={isHovered} photos={photos} />
        <Content>
          <Title>
            <Link to={`/p/${details.slug}-${sku}/`}>
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
  border-bottom: 1px solid ${(props: ThemeProps<Theme>) => props.theme.colors.dimNeutral};
  padding-top: 66%;
`

const Content = styled.div`
  padding: 24px 16px;
`

const Title = styled.h3`
  font-size: 12px;
  margin-bottom: 24px;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.neutralForeground};

  ${mediaQueries.md} {
    font-size: 14px;
  }
`

const Price = styled.p`
  font-size: 18px;
  font-weight: lighter;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.primary};
`

export default ProductCard