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
  res.send("Hola receivedMessage");
};

module.exports = {
  verifyToken,
  receivedMessage,
};
