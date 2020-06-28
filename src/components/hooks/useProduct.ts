import useTranslation from "./useTanslation";
import { ProductDetails } from "../../types/product";

export default function useProductDetails(sku: string): ProductDetails {
  const t = useTranslation()

  return {
    name: t(`products.${sku}.name`),
  }
}