import { FluidObject, FixedObject } from "gatsby-image";

export interface Product {
  sku: string
  price: number
  photos: FluidObject[]
}

export interface ProductDetails {
  name: string
  slug: string
  description: string
}