import React, { useState, useEffect } from 'react'
import Input from '../atoms/input'
import { Form, FormRow, FormField } from '../molecules/form'
import useTranslation from '../hooks/useTanslation'
import NextButton from '../atoms/next-button'

interface PaymentFormProps {
  orderId: string
  paymentForm: any
  amount: number
  onPaymentStart: () => void
  onNonceReceived: (nonce: string, cardData: string) => void
}

const PaymentForm = (props: PaymentFormProps) => {
  const [paymentForm, setPaymentForm] = useState<any>()
  const [cardBrand, setCardBrand] = useState<string>('')
  const [googlePay, setGooglePay] = useState()
  const [applePay, setApplePay] = useState()
  const [masterpass, setMasterpass] = useState()

  const t = useTranslation()
  const k = useTranslation('checkout.payment')

  const requestCardNonce = () => {
    if (paymentForm) {
      props.onPaymentStart()
      paymentForm.requestCardNonce()
    }
  }

  useEffect(() => {
    const config = {
      applicationId: "sandbox-sq0idb-a_jR0z9d3-AEKGWl7NTZ9Q",
      locationId: "GMT96A77XABR1",
      inputClass: "sq-input",
      autoBuild: false,
      inputStyles: [{
        fontSize: '16px',
        backgroundColor: '#f5f5f5',
        padding: '12px',
        color: '#333333'
      }],
      applePay: {
        elementId: "sq-apple-pay",
      },
      masterpass: {
        elementId: "sq-masterpass",
      },
      googlePay: {
        elementId: "sq-google-pay",
      },
      cardNumber: {
        elementId: "sq-card-number",
        placeholder: k('card_number'),
      },
      cvv: {
        elementId: "sq-cvv",
        placeholder: k('cvv'),
      },
      expirationDate: {
        elementId: "sq-expiration-date",
        placeholder: k('mm_yy'),
      },
      postalCode: {
        elementId: "sq-postal-code",
        placeholder: k('zip_code'),
      },
      callbacks: {
        methodsSupported: (methods: any) => {
          console.log(methods)
          if (methods.googlePay) {
            setGooglePay(methods.googlePay)
          }
          if (methods.applePay) {
            setApplePay(methods.applePay)
          }
          if (methods.masterpass) {
            setMasterpass(methods.masterpass)
          }
          return
        },
        createPaymentRequest: () => {
          return {
            requestShippingAddress: false,
            requestBillingInfo: true,
            currencyCode: "USD",
            countryCode: "US",
            total: {
              label: "MERCHANT NAME",
              amount: "100",
              pending: false,
            },
            lineItems: [
              {
                label: "Subtotal",
                amount: "100",
                pending: false,
              },
            ],
          }
        },
        cardNonceResponseReceived: (errors: any, nonce: string, cardData: any) => {
          // TODO: handle error
          if (errors) {
            // Log errors from nonce generation to the JavaScript console
            console.log("Encountered errors:")
            errors.forEach(function (error: any) {
              console.log("  " + error.message)
            })
            return
          }
          props.onNonceReceived(nonce, cardData)
        },
        unsupportedBrowserDetected: () => {},
        inputEventReceived: (inputEvent: any) => {
          switch (inputEvent.eventType) {
            case "focusClassAdded":
              break
            case "focusClassRemoved":
              break
            case "errorClassAdded":
              document.getElementById("error")!!.innerHTML =
                "Please fix card information errors before continuing."
              break
            case "errorClassRemoved":
              document.getElementById("error")!!.style.display = "none"
              break
            case "cardBrandChanged":
              if (inputEvent.cardBrand !== "unknown") {
                setCardBrand(inputEvent.cardBrand)
              } else {
                setCardBrand('')
              }
              break
            case "postalCodeChanged":
              break
            default:
              break
          }
        },
        paymentFormLoaded: function () {
          document.getElementById("name")!!.style.display = "inline-flex"
        },
      },
    }

    const form = new props.paymentForm(config)
    form.build()
    setPaymentForm(form)
  }, [])

  return (
    <div className="container">
      <div id="form-container">
        <div id="sq-walletbox">
          <button
            style={{ display: applePay ? "inherit" : "none" }}
            className="wallet-button"
            id="sq-apple-pay"
          />
          <button
            style={{ display: masterpass ? "block" : "none" }}
            className="wallet-button"
            id="sq-masterpass"
          />
          <button
            style={{ display: googlePay ? "inherit" : "none" }}
            className="wallet-button"
            id="sq-google-pay"
          />
        </div>

        <div id="sq-ccbox">
          <Form id="cc-field-wrapper">
            <FormRow>
              <FormField start={1} end={5}>
                <div id="sq-card-number" />
                <input type="hidden" id="card-nonce" name="nonce" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField start={1} end={2}>
                <div id="sq-cvv" />
              </FormField>
              <FormField start={2} end={3}>
                <div id="sq-expiration-date" />
              </FormField>
              <FormField start={3} end={5}>
                <div id="sq-postal-code" />
              </FormField>
            </FormRow>
            <FormRow>
              <FormField start={1} end={5}>
                <Input
                    id="name"
                    type="text"
                    placeholder={k('name_in_card')}
                  />
              </FormField>
            </FormRow>
            
            <NextButton
              primary
              large
              onClick={requestCardNonce}
              className="button-credit-card"
            />
          </Form>
        </div>
      </div>
      <p id="error" />
    </div>
  )
}

export default PaymentForm