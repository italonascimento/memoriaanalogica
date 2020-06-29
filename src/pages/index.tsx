import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { FluidObject } from "gatsby-image"

import Layout from "../layouts/layout"
import SEO from "../components/seo"
import useTranslation from "../components/hooks/useTanslation"
import VM from "../components/organisms/vm"
import Spacing from "../components/atoms/spacing"

interface Data {
  allProductsYaml: {
    edges: {
      node: DataProduct
    }[]
  }
}

interface DataProduct {
  sku: string
  price: number
  photos: {
    src: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }[]
}

interface IndexPageProps {
  data: Data
}

const IndexPage = ({ data }: IndexPageProps) => {
  const t = useTranslation()
  console.log(data)
  return (
    <Layout>
      <SEO title={t("home.title")} />

      <Spacing y={16}/>
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

export default IndexPage
