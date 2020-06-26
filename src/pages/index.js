import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import PaymentForm from '../components/PaymentForm'
import { Helmet } from "react-helmet"

const IndexPage = () => {
  const [isSquareLoaded, setIsSquareLoaded] = useState(false)

  useEffect(() => {
    loadSquareSdk()
      .then(() => {
        setIsSquareLoaded(true)
      })
  }, [])

  return (
    <Layout>
      <Helmet>
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' *.squarecdn.com *.google.com" />
      </Helmet>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link> <br />
      <Link to="/using-typescript/">Go to "Using TypeScript"</Link>

      {(isSquareLoaded && typeof window !== 'undefined') && (
        <PaymentForm paymentForm={window.SqPaymentForm} amount={1} />
      )}
    </Layout>
  )
}

export default IndexPage
