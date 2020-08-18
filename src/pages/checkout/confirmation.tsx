import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AiFillLock } from 'react-icons/ai'
import Axios from 'axios'

import Layout from '../../layouts/layout'
import useTranslation from '../../components/hooks/useTanslation'
import SEO from '../../components/seo'
import EmptyCartWarning from '../../components/molecules/empty-cart-warning'
import useGlobalState from '../../state/useGlobalState'
import Button from '../../components/atoms/button'
import Spacing from '../../components/atoms/spacing'
import { actions as globalActions } from '../../state/global-state'
import { PaymentResponse } from '../../types/payment-response'
import { navigate, useIntl, FormattedNumber } from 'gatsby-plugin-intl'
import List from '../../components/atoms/list'
import CartItem from '../../components/organisms/cart-item'

const Confirmation = () => {
  const [[cart, checkout], dispatch] = useGlobalState(({cart, checkout}) => [cart, checkout])
  const t = useTranslation()
  const k = useTranslation('checkout.confirmation')
  const intl = useIntl()
  const p = useTranslation('products')

  useEffect(() => {
    if (!checkout.paymentNonce) {
      navigate('/checkout/payment/', { replace: true })
    }
  }, [])

  const pay = () => {
    dispatch(globalActions.setIsLoading(true))

    Axios.post('https://memoriaanalogica.netlify.app/.netlify/functions/process-payment', {
      paymentAmount: cart.total * 100, 
      cardNounce: checkout.paymentNonce,
      orderId: checkout.orderId,
    }).then(result => {
      dispatch(globalActions.setIsLoading(false))

      const payment = result.data.paymentInfo.payment as PaymentResponse
      
      Axios.post('https://memoriaanalogica.netlify.app/.netlify/functions/send-email', {
        name: checkout.shipmentInfo.fullName?.split(' ')[0],
        email: checkout.shipmentInfo?.email,
        lang: intl.locale,
        order: {
          products: cart.items.map(item => ({
            name: p(`${item.product.sku}.name`),
            quantity: item.amount,
          })),
        },
        template: 'purchase_success',
      })
      navigate('/checkout/thank-you/', { state: { payment }})
    }).catch(error=>{
      console.log(`Error in processing payment:${error}`)
    })
  }

  return (
    <Layout>
      <SEO title={k('title')} />

      {(
        cart.items.length > 0
      ) ? (
        <Container>
          <h2>
            {k('title')}
          </h2>
          <Spacing y={32} />
          <List>
            {cart.items.map(item => (
              <CartItem
                key={item.product.sku}
                lockEdition
                disableClick
                {...item}
              />
            ))}
          </List>
          <Spacing y={12} />
          <PayButton primary large
            onClick={pay}
          >
            <AiFillLock />
            <Spacing x={8} />
            {k('pay')} &nbsp;
            <strong>
              <FormattedNumber style='currency' currency={t('currency')} value={cart.total} />
            </strong>  
          </PayButton>
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
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`

const PayButton = styled(Button)`
  align-self: flex-end;
  margin-top: 12px;
  padding-left: 24px;
`

export default Confirmation