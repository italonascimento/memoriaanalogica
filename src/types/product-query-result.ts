import { FluidObject } from "gatsby-image"

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
  photos: {
    src: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }[]
}