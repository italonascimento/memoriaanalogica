import React from "react"
import { graphql } from "gatsby"
import styled, { withTheme } from "styled-components"
import useMedia from 'react-use-media-query-hook'
import Img from 'gatsby-image'
import Slider from "react-slick"

import Layout from "../layouts/layout"
import useProductDetails from "../components/hooks/useProduct"
import SEO from "../components/seo"
import { ProductsQueryResult } from "../types/product-query-result"
import PhotoGallery from "../components/molecules/photo-gallery"
import { Theme } from "../themes/default-theme"
import mediaQueries, { mediaQueryValues } from "../styles/media-queries"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

interface ProductTemplateProps {
  data: ProductsQueryResult
  theme?: Theme
}

const ProductTemplate = ({
  data,
  theme,
}: ProductTemplateProps) => {
  const { sku, price } = data.allProductsYaml.edges[0].node
  const photos = data.allProductsYaml.edges[0].node.photos.map(item =>
    item.src.childImageSharp.fluid
  )

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
                    <Img fluid={photo} />
                  </SlideItem>
                ))}
              </Slider>
            </div>
          )}

          <div style={{flex: '1 1 50%'}}>
            {details.name}
          </div>
        </MainSection>
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
          price
          photos {
            src {
              childImageSharp {
                fluid(maxWidth: 620) {
                  ...GatsbyImageSharpFluid
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
  margin-top: 32px;
`

const MainSection = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: center; */

  ${mediaQueries.md} {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0 16px;
    max-width: 1200px;
    margin: 0 auto;
  }
`

const StyledPhotoGallery = styled(PhotoGallery)`
  flex: 1 1 65%;
`

const SlideItem = styled.div`
  padding: 8px;
`

export default withTheme(ProductTemplate)