import React from "react"
import { graphql } from "gatsby"
import { FluidObject } from "gatsby-image"

import Layout from "../layouts/layout"
import SEO from "../components/seo"
import useTranslation from "../components/hooks/useTanslation"
import VM from "../components/organisms/vm"
import Spacing from "../components/atoms/spacing"
import { ProductsQueryResult } from "../types/product-query-result"

interface IndexPageProps {
  data: ProductsQueryResult
}

const IndexPage = ({ data }: IndexPageProps) => {
  const t = useTranslation()
  
  return (
    <Layout>
      <SEO title={t("home.title")} />

      <Spacing y={64}/>
      <VM products={data.allProductsYaml.edges.map(item => ({
        ...item.node,
        photos: item.node.photos.map(photo => photo.src.childImageSharp.fluid)
      }))} />
    </Layout>
  )
}

export const query = graphql`
  query IndexPageQuery {
    allProductsYaml {
      edges {
        node {
          sku
          price
          photos {
            src {
              childImageSharp {
                fluid(maxWidth: 300) {
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

export default IndexPage
