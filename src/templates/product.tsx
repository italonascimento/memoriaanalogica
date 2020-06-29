import React from "react"
import Layout from "../layouts/layout"
import { Product } from "../types/product"
import useProductDetails from "../components/hooks/useProduct"
import SEO from "../components/seo"

interface ProductTemplateProps {
  pageContext: Product
}

const ProductTemplate = ({
  pageContext,
}: ProductTemplateProps) => {
  const details = useProductDetails(pageContext.sku)

  return (
    <Layout>
      <SEO title={details.name} />
      <h2>{details.name}</h2>
    </Layout>
  )
}

export default ProductTemplate