import { FluidObject, FixedObject } from "gatsby-image";

export interface Photo{
    fluid?: FluidObject,
    fixed?: FixedObject,
}

export interface Product {
  sku: string
  variationId: string
  price: number
  photos: Photo[]
}

export interface ProductDetails {
  name: string
  slug: string
  description: string
}