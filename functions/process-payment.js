const crypto = require("crypto")
const squareConnect = require("square-connect")
require("dotenv").config({})

exports.handler = async (event, context, callback) => {
  console.log(`function method: ${event.httpMethod}`)
  try {
    if (event.httpMethod === "OPTIONS") {
      callback(null, {
        statusCode: 205,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
        body: "BOOP",
      })
      return
    }

    if (event.httpMethod !== "POST" || !event.body) {
      callback(null, { statusCode: 405, body: "Method Not Allowed" })
      return
    }

    const token = process.env.GATSBY_SQUARE_APLLICATION_TOKEN
    if (!token) {
      callback(null, {
        statusCode: 405,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
        body:
          "Something is wrong with the configuration. Check your configuration",
      })
      return
    }

    const data = JSON.parse(event.body)

    const defaultClient = squareConnect.ApiClient.instance
    const oauth2 = defaultClient.authentications["oauth2"]
    oauth2.accessToken = token
    defaultClient.basePath = "https://connect.squareupsandbox.com"
    const idempotency_key = crypto.randomBytes(22).toString("hex")
    const payments_api = new squareConnect.PaymentsApi()

    const request_body = {
      source_id: data.cardNounce,
      amount_money: {
        amount: data.paymentAmount,
        currency: 'USD',
      },
      order_id: data.orderId,
      reference_id: "123456",
      idempotency_key: idempotency_key,
    }

    const response = await payments_api.createPayment(request_body)
    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        message: `Payment Successful`,
        paymentInfo:response
      }),
    })
  } catch (error) {
    console.log(error)
    if (error.response && error.response.body && error.response.body.errors) console.log(error.response.body.errors)
    callback("Something went wrong with your request. Try again later", {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: "Something went wrong with your request. Try again later",
    })
  }
}