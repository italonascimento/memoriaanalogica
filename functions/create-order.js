const axios = require('axios')
const uuid = require('uuidv4')

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

  axios.post('https://connect.squareup.com/v2/locations/E7W8DM4QEPBJK/orders', {
    "idempotency_key": uuid(),
    "order": {
        "line_items": data.items
      }
    }, {
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + process.env.GATSBY_SQUARE_APLLICATION_TOKEN,
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json'
      }
    }).then( result => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
        body: JSON.stringify(result),
      })
    }).catch( err => {
      console.log(err)
      callback("Something went wrong with your request. Try again later", {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept",
        },
        body: "Something went wrong with your request. Try again later",
      })
    })
}