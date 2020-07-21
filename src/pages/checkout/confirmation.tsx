import React, { useEffect } from 'react'
import { WindowLocation } from '@reach/router'

import { PaymentResponse } from '../../types/payment-response'
import Layout from '../../layouts/layout'
import SEO from '../../components/seo'
import useTranslation from '../../components/hooks/useTanslation'
import useGlobalState from '../../state/useGlobalState'
import { actions } from '../../state/cart-state'

interface ConfirmationProps {
  location: WindowLocation<{ payment: PaymentResponse }>
}

const Confirmation = ({ location }: ConfirmationProps) => {
  const t = useTranslation('confirmation')
  const [_, dispatch] = useGlobalState(s => s)
  const payment = location.state?.payment

  useEffect(() => {
    dispatch(actions.resetCart())
  }, [])

  return (
    <Layout>
      <SEO title={t('title')} />
      <div>
        {JSON.stringify(payment)}
      </div>
    </Layout>
  )
}

export default Confirmation