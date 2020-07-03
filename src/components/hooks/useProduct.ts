import useTranslation from "./useTanslation";
import { ProductDetails } from "../../types/product";
const productsObject = require("../../intl/en.json").products
const detailsObject = productsObject[Object.keys(productsObject)[0]]

export default function useProductDetails(sku: string): ProductDetails {
  const t = useTranslation()


  const k = (key: string) => t(`products.${sku}.${key}`)

  let details: any = {}
  Object.keys(detailsObject).forEach(key =>
    details[key] = k(key)  
  )
  return details as ProductDetails
}