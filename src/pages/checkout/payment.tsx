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
import styled from 'styled-components'

interface PaymentProps {
  location: WindowLocation<{ orderId: string }>
}

const Payment = ({ location }: PaymentProps) => {
  const t = useTranslation('checkout.payment')
  const [cart, dispatch] = useGlobalState(s => s.cart)
  const total = cart.total
  const [isReady, setIsReady] = useState(false)

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

  const handleScriptInject = ({ scriptTags }: any) => {
    if (scriptTags) {
        const scriptTag = scriptTags[0];
        scriptTag.onload = () => {
          dispatch(globalActions.setIsLoading(false))
          setIsReady(true)
        }
    }
  }

  return (
    <Layout>
      <Helmet 
        script={[{ src: 'https://js.squareupsandbox.com/v2/paymentform' }]}
        onChangeClientState={(newState, addedTags) => handleScriptInject(addedTags)}
      />
      <SEO title={t('title')} />

      <Container>
        {typeof window !== 'undefined'
          && (window as any).SqPaymentForm
          && isReady
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
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  max-width: 620px;
  margin: 0 auto;
`

export default Payment