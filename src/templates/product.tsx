import React from "react"
import { graphql } from "gatsby"
import styled, { ThemeProps } from "styled-components"
import Img from 'gatsby-image'
import Slider from "react-slick"

import useMedia from '../components/hooks/use-media'
import Layout from "../layouts/layout"
import useProductDetails from "../components/hooks/useProduct"
import SEO from "../components/seo"
import { ProductsQueryResult } from "../types/product-query-result"
import PhotoGallery from "../components/organisms/photo-gallery"
import { Theme } from "../themes/default-theme"
import mediaQueries, { mediaQueryValues } from "../styles/media-queries"
import BuyBox from "../components/organisms/buy-box"
import Spacing from "../components/atoms/spacing"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Photo } from "../types/product"
import useTranslation from "../components/hooks/useTanslation"

interface ProductTemplateProps {
  data: ProductsQueryResult
  theme?: Theme
}

const ProductTemplate = ({
  data,
}: ProductTemplateProps) => {
  const { sku, price, variationId } = data.allProductsYaml.edges[0].node
  const photos = data.allProductsYaml.edges[0].node.photos.map(item => ({
    fixed: item.src.childImageSharp.fixed,
    fluid: item.src.childImageSharp.fluid,
  }))

  const t = useTranslation()
  const details = useProductDetails(sku)
  const isMediaMediumOrUp = useMedia(mediaQueryValues.md)
  const isMediaLargeOrUp = useMedia(mediaQueryValues.l)

  return (
    <Layout>
      <SEO title={details.name} />

      <Container>
        <MainSection>
          {isMediaMediumOrUp ? (
            <StyledPhotoGallery photos={photos} verticalThumbs={isMediaLargeOrUp} />
          ) : (
            <div>
              <Slider centerMode centerPadding='10%' arrows={false}>
                {photos.map(photo => (
                  <SlideItem>
                    <Img fluid={photo.fluid} />
                  </SlideItem>
                ))}
              </Slider>
            </div>
          )}

          <Spacing x={isMediaLargeOrUp ? 64 : 32} y={32} />

          <StyledBuyBox product={{ sku, price, photos, variationId }} />
        </MainSection>
        <Section>
          <DescriptionTitle><a id="description" />{t('description')}</DescriptionTitle>
          <Description>
            {details.description}
          </Description>
        </Section>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query ProductBySku($sku: String!) {
    allProductsYaml (filter: {sku: {eq: $sku}}) {
      edges {
        node {
          sku
          variationId
          price
          photos {
            src {
              childImageSharp {
                fluid(maxWidth: 750) {
                  ...GatsbyImageSharpFluid
                }
                fixed(width: 100, height: 100) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
  }
`

const Container = styled.div`
  margin: 32px 0;
`

const Section = styled.div`
  padding: 0 32px;
  max-width: 1000px;
  margin: 0 auto 64px;
`

const MainSection = styled.div`
  max-width: 1400px;
  padding: 0 16px;
  margin: 0 auto 64px;

  ${mediaQueries.md} {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const StyledPhotoGallery = styled(PhotoGallery)`
  flex: 1 1 65%;
`

const SlideItem = styled.div`
  padding: 8px;
`

const StyledBuyBox = styled(BuyBox)`
  flex: 1 1 35%;
`

const DescriptionTitle = styled.h4`
  margin-bottom: 20px;
  font-size: 24px;

  ${mediaQueries.md} {
    text-align: left;
    margin-bottom: 24px;
  }
`

const Description = styled.p`
  font-size: 12px;
  text-align: left;
  line-height: 1.5;
`

export default ProductTemplate