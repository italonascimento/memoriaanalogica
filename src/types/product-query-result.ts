import { FluidObject, FixedObject } from "gatsby-image"

export interface ProductsQueryResult {
  allProductsYaml: {
    edges: {
      node: ProductNode
    }[]
  }
}


interface ProductNode {
  sku: string
  price: number
  variationId: string
  photos: {
    src: {
      childImageSharp: {
        fluid: FluidObject
        fixed: FixedObject
      }
    }
  }[]
}