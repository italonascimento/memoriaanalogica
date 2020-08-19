import React, { useState, ChangeEvent } from 'react'
import Layout from '../../layouts/layout'
import SEO from '../../components/seo'
import useTranslation from '../../components/hooks/useTanslation'
import styled, { ThemeProps } from 'styled-components'
import { navigate } from 'gatsby-plugin-intl'
import Axios from 'axios'
import useGlobalState from '../../state/useGlobalState'
import Input from '../../components/atoms/input'
import Spacing from '../../components/atoms/spacing'
import { actions } from '../../state/global-state'
import { actions as checkoutActions } from '../../state/checkout-state'
import { Form, FormRow, FormField } from '../../components/molecules/form'
import EmptyCartWarning from '../../components/molecules/empty-cart-warning'
import useMedia from '../../components/hooks/use-media'
import { mediaQueryValues } from '../../styles/media-queries'
import { Select, Option } from '../../components/molecules/select'
import countries from '../../data/countries'
import { Theme } from '../../themes/default-theme'
import NextButton from '../../components/atoms/next-button'
import { ShipmentInfo } from '../../state/checkout-state'

const Shipment = () => {
  const t = useTranslation('checkout.shipment')
  const [[cart, shipmentInfo], dispatch] =
    useGlobalState(({ cart, checkout }) => [cart, checkout.shipmentInfo])

  const md = useMedia(mediaQueryValues.md)

  const shipmentFieldSetter = (field: keyof ShipmentInfo) => 
    (e: ChangeEvent<HTMLInputElement>) => {
      setShipmentField(field, e.target.value)
    }
  
  const setShipmentField = (field: keyof ShipmentInfo, value: string) => {
    dispatch(checkoutActions.setShipmentInfo({
      [field]: value,
    }))
  }

  const createOrder = () => {
    dispatch(actions.setIsLoading(true))

    Axios.post('https://memoriaanalogica.netlify.app/.netlify/functions/create-order', {
      items: cart.items.map(item => ({
          "catalog_object_id": item.product.variationId,
          "quantity": item.amount.toString()
      })),
      recipient: {
        firstName: shipmentInfo.recipientFullName?.split(' ')[0],
        lastName: shipmentInfo.recipientFullName?.split(' ').slice(1).join(' '),
        address: shipmentInfo.address,
        complement: shipmentInfo.complement,
        city: shipmentInfo.city,
        state: shipmentInfo.state,
        country: shipmentInfo.country,
        postalCode: shipmentInfo.postalCode,
        email: shipmentInfo.email,
        displayName: shipmentInfo.fullName,
      }
    }).then((response: any) => {
      dispatch(checkoutActions.setOrderId(response.data.order.id))
      navigate('/checkout/payment/')
    })
  }

  return (
    <Layout>
      <SEO title={t('title')} />

        {(
          cart.items.length > 0
        ) ? (
          <Container>
            <Form>
              <Title>
                {t('personal_info')}
              </Title>

              <FormRow>
                <FormField start={1} end={md ? 3 : 5}>
                  <Input placeholder={t('full_name')} onChange={shipmentFieldSetter('fullName')} />
                </FormField>
                <FormField start={md ? 3 : 1} end={5}>
                  <Input placeholder={t('email')} onChange={shipmentFieldSetter('email')} />
                </FormField>
              </FormRow>

              <Spacing y={32} />

              <Title>
                {t('shipment_address')}
              </Title>

              <FormRow>
                <FormField start={1} end={5}>
                  <Input placeholder={t('full_name')} onChange={shipmentFieldSetter('recipientFullName')} />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField start={1} end={5}>
                  <Input placeholder={t('address')} onChange={shipmentFieldSetter('address')} />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField start={1} end={3}>
                  <Input placeholder={t('complement')} onChange={shipmentFieldSetter('complement')} />
                </FormField>
                <FormField start={3} end={5}>
                  <Input placeholder={t('postal_code')} onChange={shipmentFieldSetter('postalCode')} />
                </FormField>
              </FormRow>
              <FormRow>
                <FormField start={1} end={3}>
                  <Input placeholder={t('city')} onChange={shipmentFieldSetter('city')} />
                </FormField>
                <FormField start={3} end={4}>
                  <Input placeholder={t('state_province')} onChange={shipmentFieldSetter('state')} />
                </FormField>
                <FormField start={4} end={5}>
                  <StyledSelect
                    placeholder={t('country')} 
                    search
                    flat
                    full
                    align='right' 
                    modal={!md}
                    onSelect={(v: string) => setShipmentField('country', v)}
                  >
                    {countries.map(({ code, name }) => (
                      <Option key={code} value={code} filterValue={name}>
                        {name}
                      </Option>
                    ))}
                  </StyledSelect>
                </FormField>
              </FormRow>

              <NextButton primary large onClick={createOrder} />
            </Form>
          </Container>
        ) : (
          <EmptyCartWarning />
        )}
    </Layout>
  )
}

const Container = styled.div`
  max-width: 620px;
  margin: 0 auto;
  padding: 0 16px;
`

const StyledSelect = styled(Select)`
  background: ${(props: ThemeProps<Theme>) => props.theme.colors.greyLighter};
  color: ${(props: ThemeProps<Theme>) => props.theme.colors.greyDarkest};
  box-shadow: inset 0 -2px 8px -7px rgba(0,0,0,0.5);
  padding: 5.5px 0;
  & > * {
    font-size: 16px;
  }
`

const Title = styled.h2`
  margin-bottom: 32px;
`

export default Shipment