import useTranslation from "./useTanslation";
import { ProductDetails } from "../../types/product";

export default function useProductDetails(sku: string): ProductDetails {
  const t = useTranslation()

  const k = (key: string) => t(`products.${sku}.${key}`)

  return {
    name: k('name'),
    slug: k('slug')
  }
}