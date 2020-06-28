import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/layout"
import SEO from "../components/seo"
import useTranslation from "../components/hooks/useTanslation"
import VM from "../components/organisms/vm"
import { Product } from "../types/product"

interface Data {
  allProductsYaml: {
    edges: {
      node: Product
    }[]
  }
}

interface IndexPageProps {
  data: Data
}

const IndexPage = ({ data }: IndexPageProps) => {
  const t = useTranslation()
  return (
    <Layout>
      <SEO title={t("home.title")} />

      <VM products={data.allProductsYaml.edges.map(item => item.node)} />
    </Layout>
  )
}

export const query = graphql`
  query IndexPageQuery {
    allProductsYaml {
      edges {
        node {
          sku
        }
      }
    }
  }
`

export default IndexPage
