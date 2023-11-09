const verifyToken = (req, res) => {
  res.send("Hola VerifyToken");
};

const receivedMessage = (req, res) => {
  res.send("Hola receivedMessage");
};

module.exports = {
  verifyToken,
  receivedMessage,
};
