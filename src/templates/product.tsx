import React, { useEffect } from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/layout"
import { Product } from "../types/product"
import useProductDetails from "../components/hooks/useProduct"
import SEO from "../components/seo"
import { ProductsQueryResult } from "../types/product-query-result"

interface ProductTemplateProps {
  data: ProductsQueryResult
}

const ProductTemplate = ({
  data,
}: ProductTemplateProps) => {
  const { sku, price, photos } = data.allProductsYaml.edges[0].node
  const details = useProductDetails(sku)

  return (
    <Layout>
      <SEO title={details.name} />
      <h2>{details.name}</h2>
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

export default ProductTemplate