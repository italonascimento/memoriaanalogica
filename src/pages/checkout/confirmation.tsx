import React from 'react'
import { WindowLocation } from '@reach/router'

import { PaymentResponse } from '../../types/payment-response'
import Layout from '../../layouts/layout'
import SEO from '../../components/seo'
import useTranslation from '../../components/hooks/useTanslation'

interface ConfirmationProps {
  location: WindowLocation<{ payment: PaymentResponse }>
}

const Confirmation = ({ location }: ConfirmationProps) => {
  const t = useTranslation('confirmation')
  const payment = location.state.payment

  return (
    <Layout>
      <SEO title={t('title')} />
      <div>
        {JSON.stringify(payment)}
      </div>
    </Layout>
  )
}