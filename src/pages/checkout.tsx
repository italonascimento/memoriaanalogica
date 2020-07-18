import React, { useState, useEffect } from 'react'
import Layout from '../layouts/layout'
import { Helmet } from 'react-helmet'
import SEO from '../components/seo'
import PaymentForm from '../components/organisms/payment-form'
import useGlobalState from '../state/useGlobalState'
import { CartItem } from '../state/cart-state'
import Axios from 'axios'
import useTranslation from '../components/hooks/useTanslation'

const Checkout = () => {
  const t = useTranslation()
  const [cart, _] = useGlobalState(s => s.cart)
  const [isLoading, setIsLoading] = useState(false)
  const [orderId, setOrderId] = useState<string>()
  const total = cart.items.reduce((acc: number, curr: CartItem) => 
    acc + curr.amount * curr.product.price, 0
  )
  
  useEffect(() => {
    setIsLoading(true)
    Axios.post('https://memoriaanalogica.netlify.app/.netlify/functions/create-order', {
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
      <SEO title={t('checkout.title')} />


      <h2>{total}</h2>

      {typeof window !== 'undefined' 
        && (window as any).SqPaymentForm 
        && !isLoading
        && !!orderId
        && (
          <PaymentForm
            paymentForm={(window as any).SqPaymentForm}
            amount={total} 
            orderId={orderId}
          />
        )
      }
    </Layout>
  )
}

export default Checkout