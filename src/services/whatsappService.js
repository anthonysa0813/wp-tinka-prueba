require("dotenv").config();
const axios = require("axios");

function SendMessageWhatsApp(textResponse, number) {
  const data = {
    messaging_product: "whatsapp",
    to: number,
    text: {
      body: textResponse,
    },
    type: "text",
  };

  const options = {
    method: "post",
    url: "https://graph.facebook.com/v13.0/118552371232224/messages",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
    data: JSON.stringify(data),
  };

  axios(options)
    .then((response) => {
      console.log({
        token: process.env.TOKEN,
      });
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  SendMessageWhatsApp,
};
