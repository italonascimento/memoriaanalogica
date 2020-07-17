import React, { useEffect } from "react"

import Layout from "../layouts/layout"
import SEO from "../components/seo"
import { Helmet } from "react-helmet"
import axios from "axios"
import { uuid } from 'uuidv4'
import PaymentForm from "../components/organisms/payment-form"
import useGlobalState from "../state/useGlobalState"
import { CartItem } from "../state/cart-state"

const SecondPage = () => {
  const [cart, _] = useGlobalState(s => s.cart)
  const total = cart.items.reduce((acc: number, curr: CartItem) => 
    acc + curr.amount * curr.product.price, 0
  )
  
  useEffect(() => {
    axios.post('https://memoriaanalogica.netlify.app/.netlify/functions/create-order', {
      items: cart.items.map(item => ({
          "catalog_object_id": 'BAKXPUAZBN5YT33LWG5Z6LMN',
          "quantity": item.amount.toString()
      }))
    }).then(result => {
      console.log(result)
    })
  }, [])

  return (
    <Layout>
      <Helmet>
        <script type="text/javascript" src="https://js.squareupsandbox.com/v2/paymentform"></script>
      </Helmet>
      <SEO title="Checkout" />

      <h2>{total}</h2>

      {typeof window !== 'undefined' && (window as any).SqPaymentForm && (
        <PaymentForm paymentForm={(window as any).SqPaymentForm} ammount={total} />
      )}
    </Layout>
  )
}

export default SecondPage
