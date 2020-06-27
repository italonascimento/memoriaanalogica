import React from "react"
import { Link } from "gatsby"

import Layout from "../layouts/layout"
import SEO from "../components/seo"
import { Helmet } from "react-helmet"
import PaymentForm from "../components/payment-form"

const SecondPage = () => (
  <Layout>
    <Helmet>
      <script type="text/javascript" src="https://js.squareupsandbox.com/v2/paymentform"></script>
    </Helmet>
    <SEO title="Checkout" />

    {typeof window !== 'undefined' && (
      <PaymentForm paymentForm={(window as any).SqPaymentForm} ammount={1} />
    )}
  </Layout>
)

export default SecondPage
