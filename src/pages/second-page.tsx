import React, { useEffect, useState } from "react"

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
  const [isLoading, setIsLoading] = useState(false)
  const [orderId, setOrderId] = useState()
  const total = cart.items.reduce((acc: number, curr: CartItem) => 
    acc + curr.amount * curr.product.price, 0
  )
  
  useEffect(() => {
    setIsLoading(true)
    axios.post('https://memoriaanalogica.netlify.app/.netlify/functions/create-order', {
      items: cart.items.map(item => ({
          "catalog_object_id": 'CP44CUQR5PKBHJB4WGZFMS37',
          "quantity": item.amount.toString()
      }))
    }).then((response: any) => {
      console.log(response)
      setIsLoading(false)
      setOrderId(response.data.order.id)
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
