import { useIntl } from "gatsby-plugin-intl"

const useTranslation = (prefix?: string) => {
  const intl = useIntl()
  return (id: string) => intl.formatMessage({ id: prefix ? [prefix, id].join('.') : id })
}

export default useTranslation