import { FluidObject, FixedObject } from "gatsby-image";

export interface Product {
  sku: string
  variationId: string
  price: number
  photos: FluidObject[]
}

export interface ProductDetails {
  name: string
  slug: string
  description: string
}