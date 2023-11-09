const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./log.txt"));

const verifyToken = (req, res) => {
  try {
    const accessToken = "GHADFGAHD552FGADAR5A12AS";
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (challenge != null && token != null && token == accessToken) {
      res.send(challenge);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    return res.status(400).send();
  }
};

const receivedMessage = (req, res) => {
  try {
    const entry = req.body["entry"][0];
    const changes = entry["changes"][0];
    const value = changes["value"];
    const messageObject = value["messages"];

    if (typeof messageObject != "undefined") {
      //  myConsole.log(messageObject);
      const messages = messageObject[0];
      const text = GetTextUser(messages);
      console.log(text);
      myConsole.log(text);
    }

    return res.send("EVENT_RECEIVED");
  } catch (error) {
    return res.send("EVENT_RECEIVED");
  }
};

function GetTextUser(messages) {
  var text = "";
  var typeMessge = messages["type"];
  if (typeMessge == "text") {
    text = messages["text"]["body"];
  } else if (typeMessge == "interactive") {
    var interactiveObject = messages["interactive"];
    var typeInteractive = interactiveObject["type"];

    if (typeInteractive == "button_reply") {
      text = interactiveObject["button_reply"]["title"];
    } else if (typeInteractive == "list_reply") {
      text = interactiveObject["list_reply"]["title"];
    } else {
      myConsole.log("sin mensaje");
    }
  } else {
    myConsole.log("sin mensaje");
  }
  return text;
}

module.exports = {
  verifyToken,
  receivedMessage,
};
