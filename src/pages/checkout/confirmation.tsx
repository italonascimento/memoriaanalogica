import React, { useEffect } from 'react'
import { WindowLocation } from '@reach/router'

import { PaymentResponse } from '../../types/payment-response'
import Layout from '../../layouts/layout'
import SEO from '../../components/seo'
import useTranslation from '../../components/hooks/useTanslation'
import useGlobalState from '../../state/useGlobalState'
import { actions } from '../../state/cart-state'
import styled, { ThemeProps } from 'styled-components'
import Spacing from '../../components/atoms/spacing'
import Button from '../../components/atoms/button'
import { navigate } from 'gatsby-plugin-intl'
import { IoIosCheckboxOutline } from 'react-icons/io'
import { Theme } from '../../themes/default-theme'
import mediaQueries from '../../styles/media-queries'

interface ConfirmationProps {
  location: WindowLocation<{ payment: PaymentResponse }>
}

const Confirmation = ({ location }: ConfirmationProps) => {
  const t = useTranslation('checkout.confirmation')
  const [_, dispatch] = useGlobalState(s => s)
  const payment = location.state?.payment

  useEffect(() => {
    dispatch(actions.resetCart())
  }, [])

  return (
    <Layout>
      <SEO title={t('title')} />
      <Container>
        <IoIosCheckboxOutline size={128} />
        <Spacing y={32} />
        <Title>{t('thank_you')}</Title>
        <Spacing y={16} />
        <Text>{t('follow_progress_by_email')}</Text>
        <Spacing y={32} />
        <Button large primary onClick={() => navigate('/')}>
          {t('back_to_home')}
        </Button>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  padding: 0 16px;
  max-width: 620px;
  height: 100%;
  margin: 0 auto;
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.greyDark2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * {
    flex-shrink: 0;
  }
`

const Title = styled.h2`
  font-size: 40px;

  ${mediaQueries.md} {
    font-size: 64px;
  }
`

const Text = styled.p`
  font-size: 18px;

${mediaQueries.md} {
  font-size: 24px;
}
`

export default Confirmation