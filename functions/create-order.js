const axios = require('axios')
const { uuid } = require('uuidv4')

exports.handler = async (event, context, callback) => {
  console.log(`function method: ${event.httpMethod}`)
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

  const data = JSON.parse(event.body)
  console.log(data)

  try {
    const result = await axios.post('https://connect.squareupsandbox.com/v2/locations/E7W8DM4QEPBJK/orders', {
        "idempotency_key": uuid(),
        "order": {
          "line_items": data.items,
          "fulfillments": [{
            "type": "SHIPMENT",
            "state": "PROPOSED",
            "shipment_details": {
              "recipient": {
                address: {
                  address_line_1: 'Teste',
                  administrative_district_level_1: 'test',
                  country: 'BR',
                  locality: 'test',
                  first_name: 'test',
                  postal_code: '090832982'
                },
                display_name: 'Teste',
                email_address: 'any@any.com'
              }
            }
          }]
        }
      }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + process.env.GATSBY_SQUARE_APLLICATION_TOKEN,
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json'
        }
      })
  
      console.log('result:', result)
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
        body: JSON.stringify(result),
      })
  } catch(err) {
    console.log(err.response)
    console.log(err.response.data)
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