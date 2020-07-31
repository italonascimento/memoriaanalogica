import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { WindowLocation } from '@reach/router'
import { navigate, useIntl } from 'gatsby-plugin-intl'
import Axios from 'axios'

import Layout from '../../layouts/layout'
import SEO from '../../components/seo'
import PaymentForm from '../../components/organisms/payment-form'
import useGlobalState from '../../state/useGlobalState'
import useTranslation from '../../components/hooks/useTanslation'
import { PaymentResponse } from '../../types/payment-response'
import { actions as globalActions } from '../../state/global-state'
import styled, { ThemeProps } from 'styled-components'
import { Theme } from '../../themes/default-theme'
import EmptyCartWarning from '../../components/molecules/empty-cart-warning'

interface LocationState {
  name: string
  email: string
  orderId: string
}

interface PaymentProps {
  location: WindowLocation<LocationState>
}

const Payment = ({ location }: PaymentProps) => {
  const k = useTranslation('checkout.payment')
  const p = useTranslation('products')
  const [cart, dispatch] = useGlobalState(s => s.cart)
  const total = cart.total
  const [isReady, setIsReady] = useState(false)
  const intl = useIntl()

  useEffect(() => {
    if (!location.state?.orderId) {
      navigate('/checkout/shipment/', { replace: true })
    }
  }, [])

  const paymentSuccessHandler = (payment: PaymentResponse) => {
    dispatch(globalActions.setIsLoading(false))
    Axios.post('https://memoriaanalogica.netlify.app/.netlify/functions/send-email', {
      name: location.state?.name,
      email: location.state?.email,
      lang: intl.locale,
      order: cart.items.map(item => ({
        name: p(`${item.product.sku}.name`),
        quantity: item.amount,
      })),
      template: 'purchase_success',
    })
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
      <SEO title={k('title')} />

      {(
        cart.items.length > 0
      ) ? (
        <Container>
          <Title>
            {k('title')}
          </Title>
          <Description>
            {k('enter_card_data_below')}
          </Description>
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
      ) : (
        <EmptyCartWarning />
      )}
    </Layout>
  )
}

const Container = styled.div`
  max-width: 420px;
  margin: 0 auto;
`

const Title = styled.h2`
  margin-bottom: 8px;
`
const Description = styled.p`
  margin-bottom: 32px;
  font-size: 14px;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.grey};
`

export default Payment