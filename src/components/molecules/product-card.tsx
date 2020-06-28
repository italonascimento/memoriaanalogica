import React from 'react'
import styled, { ThemeProps } from 'styled-components'
import { FormattedNumber, Link } from 'gatsby-plugin-intl'
import { useStaticQuery, graphql } from 'gatsby'
import Img from "gatsby-image"

import Card from '../atoms/card'
import useProductDetails from '../hooks/useProduct'
import useTranslation from '../hooks/useTanslation'
import { Theme } from '../../themes/default-theme'
import elevation from '../../styles/elevation'
import mediaQueries from '../../styles/media-queries'

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

  const data = useStaticQuery(graphql`
    query {
      photo: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300, maxHeight: 200) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const details = useProductDetails(sku)
  const t = useTranslation()
  
  return (
    <StyledCard className={className}>
      <Photo>
        <Img fluid={data.photo.childImageSharp.fluid} />
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
  )
}

const StyledCard = styled(Card)`
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