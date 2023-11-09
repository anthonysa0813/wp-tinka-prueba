const express = require("express");
const apiRoute = require("./routes/route");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.json());
app.use("/whatsapp", apiRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
