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
      Authorization: `Bearer EAAxd4ABBIqUBO6buwtFABygO8bpAlFhb0EH07zJfKZBBxnBy5vE8sN8oVIh2vhndPkdl3ScqUzGsMCBcz7V1K3lu7dNUh7dIekSZBj3DTyJTfmlDIdWIW4zR1hB2fhbSZCBj08zE4XA4uwkm1vJwRevrplMtMwCaHIK7XMGwFecDzCclVF771r15Qab51ZBBQsRKNRgZA5bw15f7WBgFwmnP2ffDT0QqDoXZAbboUZD`,
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
