const sgMail = require('@sendgrid/mail')

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

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  const msg = {
    "from":{
      "email":"analogicamemoria@gmail.com"
    },
    "personalizations":[
        {
          "to":[
              {
                "email": data.email
              }
          ],
          "dynamic_template_data": data
        }
    ],
    "template_id": process.env[data.template.toUpperCase() + '_TEMPLATE_ID']
  }

  try {
    sgMail.send(msg)
  } catch(e) {
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
  }
}