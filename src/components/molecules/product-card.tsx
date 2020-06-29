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
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [timeoutId, setTimeoutId] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const details = useProductDetails(sku)
  const t = useTranslation()

  const changePhoto = () => {
    setCurrentPhoto(
      currentPhoto >= photos.length -1
        ? 0
        : currentPhoto + 1
    )
    
  }
  
  useEffect(() => {
    if (isHovered) {
      const id = setTimeout(() => {
        changePhoto()
      }, 2000)
  
      setTimeoutId(id)
    } else {
      setTimeout(() => {
        setCurrentPhoto(0)
      }, 1000)
      clearTimeout(timeoutId)
    }

    return () => { clearTimeout(timeoutId) }
  }, [currentPhoto, isHovered])

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <StyledCard className={className}>
        <Photo>
          <Img fluid={photos[currentPhoto]} />
        </Photo>
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

const Photo = styled.figure`
  border-bottom: 1px solid ${(props: ThemeProps<Theme>) => props.theme.colors.dimNeutral};
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