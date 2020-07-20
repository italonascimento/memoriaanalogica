import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { WindowLocation } from '@reach/router'
import { navigate } from 'gatsby-plugin-intl'

import Layout from '../../layouts/layout'
import SEO from '../../components/seo'
import PaymentForm from '../../components/organisms/payment-form'
import useGlobalState from '../../state/useGlobalState'
import { CartItem, actions as cartActions } from '../../state/cart-state'
import useTranslation from '../../components/hooks/useTanslation'
import { PaymentResponse } from '../../types/payment-response'
import { actions as globalActions } from '../../state/global-state'

interface PaymentProps {
  location: WindowLocation<{ orderId: string }>
}

const Payment = ({ location }: PaymentProps) => {
  const t = useTranslation()
  const [cart, dispatch] = useGlobalState(s => s.cart)
  const total = cart.items.reduce((acc: number, curr: CartItem) => 
    acc + curr.amount * curr.product.price, 0
  )

  useEffect(() => {
    if (!location.state?.orderId) {
      navigate('/checkout/shipment/', { replace: true })
    }
  }, [])

  const paymentSuccessHandler = (payment: PaymentResponse) => {
    dispatch(globalActions.setIsLoading(false))
    dispatch(cartActions.resetCart())
    navigate('/checkout/confirmation/', { state: { payment }})
  }

  return (
    <Layout>
      <Helmet>
        <script type="text/javascript" src="https://js.squareupsandbox.com/v2/paymentform"></script>
      </Helmet>
      <SEO title={t('checkout.title')} />

      {typeof window !== 'undefined' 
        && (window as any).SqPaymentForm
        && (
          <PaymentForm
            onPaymentSuccess={paymentSuccessHandler}
            onPaymentStart={() => dispatch(globalActions.setIsLoading(true))}
            paymentForm={(window as any).SqPaymentForm}
            amount={total} 
            orderId={location.state?.orderId}
          />
        )
      }
    </Layout>
  )
}

export default Payment