const axios = require('axios')

exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body)

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