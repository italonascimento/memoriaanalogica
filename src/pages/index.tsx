import React, { useEffect, useState } from "react"
import Layout from "../layouts/layout"
import SEO from "../components/seo"
import useTranslation from "../components/hooks/useTanslation"

const IndexPage = () => {
  const t = useTranslation()
  return (
    <Layout>
      <SEO title={t("home.title")} />
    </Layout>
  )
}

export default IndexPage
