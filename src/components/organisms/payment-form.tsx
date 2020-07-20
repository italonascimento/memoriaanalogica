import React, { Component, CSSProperties, useState, useEffect } from 'react'
import axios from 'axios'
import { PaymentResponse } from '../../types/payment-response'

interface PaymentFormProps {
  orderId: string
  paymentForm: any
  amount: number
  onPaymentSuccess: (payment: PaymentResponse) => void
  onPaymentStart: () => void
}

const PaymentForm = (props: PaymentFormProps) => {
  const [paymentForm, setPaymentForm] = useState<any>()
  const [cardBrand, setCardBrand] = useState<string>('')
  const [nonce, setNonce] = useState<string>()
  const [googlePay, setGooglePay] = useState()
  const [applePay, setApplePay] = useState()
  const [masterpass, setMasterpass] = useState()
  const [error, setError] = useState(false)

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
      inputStyles: [
        {
          fontSize: "16px",
          fontFamily: "Helvetica Neue",
          padding: "16px",
          color: "#373F4A",
          backgroundColor: "transparent",
          lineHeight: "1.15em",
          placeholderColor: "#000",
          _webkitFontSmoothing: "antialiased",
          _mozOsxFontSmoothing: "grayscale",
        },
      ],
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
        placeholder: "• • • •  • • • •  • • • •  • • • •",
      },
      cvv: {
        elementId: "sq-cvv",
        placeholder: "CVV",
      },
      expirationDate: {
        elementId: "sq-expiration-date",
        placeholder: "MM/YY",
      },
      postalCode: {
        elementId: "sq-postal-code",
        placeholder: "Zip",
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
          if (errors) {
            // Log errors from nonce generation to the JavaScript console
            console.log("Encountered errors:")
            errors.forEach(function (error: any) {
              console.log("  " + error.message)
            })
            return
          }
          setNonce(nonce)
          
          axios.post('https://memoriaanalogica.netlify.app/.netlify/functions/process-payment', {
            paymentAmount: props.amount*100, 
            cardNounce: nonce,
            orderId: props.orderId,
          }).then( result => {
            props.onPaymentSuccess(result.data.payment)
          }).catch(error=>{
            console.log(`error in processing payment:${error}`)
            setError(true)
          })
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
          <hr />
        </div>

        <div id="sq-ccbox">
          <p>
            <span style={styles.leftCenter}>Enter Card Info Below </span>
            <span style={styles.blockRight}>
              {cardBrand.toUpperCase()}
            </span>
          </p>
          <div id="cc-field-wrapper">
            <label>
              Card Number
              <div id="sq-card-number" />
            </label>
            <input type="hidden" id="card-nonce" name="nonce" />
            <label>
              Expiration Date
              <div id="sq-expiration-date" />
            </label>
            <label>
              CVV
              <div id="sq-cvv" />
            </label>
          </div>
          <label>
            Name
            <input
              id="name"
              style={styles.name}
              type="text"
              placeholder="Name"
            />
          </label>
          <label>
            Postal Code
            <div id="sq-postal-code" />
          </label>
        </div>
        <button
          className="button-credit-card"
          onClick={requestCardNonce}
        >
          Pay
        </button>
      </div>
      <p style={styles.center} id="error" />
    </div>
  )
}

export default PaymentForm

const styles: {[key in string]: CSSProperties} = {
  name: {
    verticalAlign: "top",
    display: "none",
    margin: 0,
    border: "none",
    fontSize: "16px",
    fontFamily: "Helvetica Neue",
    padding: "16px",
    color: "#373F4A",
    backgroundColor: "transparent",
    lineHeight: "1.15em",
  },
  leftCenter: {
    float: "left",
    textAlign: "center",
  },
  blockRight: {
    display: "block",
    float: "right",
  },
  center: {
    textAlign: "center",
  },
}
