import { useIntl } from "gatsby-plugin-intl"

const useTranslation = () => {
  const intl = useIntl()
  return (id: string) => intl.formatMessage({ id })
}

export default useTranslation