import React, { useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/layout"
import { Product } from "../types/product"
import useProductDetails from "../components/hooks/useProduct"
import SEO from "../components/seo"
import { ProductsQueryResult } from "../types/product-query-result"
import PhotoGallery from "../components/molecules/photo-gallery"
import styled from "styled-components"

interface ProductTemplateProps {
  data: ProductsQueryResult
}

const ProductTemplate = ({
  data,
}: ProductTemplateProps) => {
  const { sku, price } = data.allProductsYaml.edges[0].node
  const photos = data.allProductsYaml.edges[0].node.photos.map(item =>
    item.src.childImageSharp.fluid
  )
  const details = useProductDetails(sku)

  return (
    <Layout>
      <SEO title={details.name} />
      <h2>{details.name}</h2>
      <StyledPhotoGallery photos={photos} />
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
                fluid {
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

const StyledPhotoGallery = styled(PhotoGallery)`
  max-width: 500px;
`

export default ProductTemplate