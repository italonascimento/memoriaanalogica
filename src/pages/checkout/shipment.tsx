import React, { useState, ChangeEvent } from 'react'
import Layout from '../../layouts/layout'
import SEO from '../../components/seo'
import useTranslation from '../../components/hooks/useTanslation'
import styled, { ThemeProps } from 'styled-components'
import Button from '../../components/atoms/button'
import { navigate } from 'gatsby-plugin-intl'
import Axios from 'axios'
import useGlobalState from '../../state/useGlobalState'
import Input from '../../components/atoms/input'
import Spacing from '../../components/atoms/spacing'
import { MdNavigateNext } from 'react-icons/md'
import { GiShoppingCart } from 'react-icons/gi'
import { Theme } from '../../themes/default-theme'
import { actions } from '../../state/global-state'

const Shipment = () => {
  const t = useTranslation('checkout.shipment')
  const [cart, dispatch] = useGlobalState(({ cart }) => cart)
  const [fullName, setFullName] = useState('')
  const [recipientFullName, setRecipientFullName] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [email, setEmail] = useState('')

  const useSetter = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value)
    }

  const createOrder = () => {
    dispatch(actions.setIsLoading(true))

    Axios.post('https://memoriaanalogica.netlify.app/.netlify/functions/create-order', {
      items: cart.items.map(item => ({
          "catalog_object_id": item.product.variationId,
          "quantity": item.amount.toString()
      })),
      recipient: {
        firstName: recipientFullName.split(' ')[0],
        lastName: recipientFullName.split(' ').slice(1).join(' '),
        address,
        city,
        state,
        country,
        postalCode,
        email,
        displayName: fullName,
      }
    }).then((response: any) => {
      dispatch(actions.setIsLoading(false))
      navigate('/checkout/payment/', {
        state: {
          orderId: response.data.order.id,
        }
      })
    })
  }

  return (
    <Layout>
      <SEO title={t('title')} />

      <Container>
        {(
          cart.items.length > 0
        ) ? (
          <StyledForm>
            <Title>
              {t('personal_info')}
            </Title>

            <Row>
              <Input placeholder={t('full_name')} onChange={useSetter(setFullName)} />
              <Spacing x={16} />
              <Input placeholder={t('email')} onChange={useSetter(setEmail)} />
            </Row>

            <Spacing y={32} />

            <Title>
              {t('shipment_address')}
            </Title>

            <Row>
              <Input placeholder={t('full_name')} onChange={useSetter(setRecipientFullName)} />
            </Row>
            <Row>
              <Field size={0.25}>
                <Input placeholder={t('country')} onChange={useSetter(setCountry)} />
              </Field>
              <Spacing x={16} />
              <Field size={0.25}>
                <Input placeholder={t('state_province')} onChange={useSetter(setState)} />
              </Field>
              <Spacing x={16} />
              <Field size={0.5}>
                <Input placeholder={t('city')} onChange={useSetter(setCity)} />
              </Field>
            </Row>
            <Row>
              <Field size={0.25}>
                <Input placeholder={t('postal_code')} onChange={useSetter(setPostalCode)} />
              </Field>
              <Spacing x={16} />
              <Field size={0.75}>
                <Input placeholder={t('address')} onChange={useSetter(setAddress)} />
              </Field>
            </Row>

            <StyledButton primary large onClick={createOrder}>
              {t('next_button')}
              <StyledArrowRight size={18} />
            </StyledButton>
          </StyledForm>
        ) : (
          <WarningContainer>
            <GiShoppingCart size={128} />
            <Spacing y={32} />
            <Warning>
              {t('cart_is_empty')}
            </Warning>
            <Spacing y={32} />
            <Button large primary onClick={() => navigate('/')}>
              {t('back_to_home')}
            </Button>
          </WarningContainer>
        )}
      </Container>
    </Layout>
  )
}

const Container = styled.div`
  max-width: 620px;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
  margin-bottom: 32px;
`

const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`

const Row = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 16px;
`

const Field = styled.div<{size?: number}>`
  flex: ${props => props.size || 1};
`

const StyledButton = styled(Button)`
  align-self: flex-end;
  margin-top: 12px;
  padding-right: 24px;
`

const StyledArrowRight = styled(MdNavigateNext)`
  margin-left: 8px;
`

const WarningContainer = styled.div`
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.greyDark2};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Warning = styled.p`
  font-size: 24px;
  text-align: center;
`

export default Shipment