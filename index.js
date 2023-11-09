const dotenv = require("dotenv").config();

const express = require("express");

const dialogflow = require("dialogflow");

const uuid = require("uuid");

const PORT = process.env.PORT || 7000;

const projectId = process.env.PROJECT_ID || "small-talk-2-2-2-2";
const credentialsPath =
  process.env.CREDENTIALS_PATH || "./small-talk-2-2-2-2-5b3b3b3b3b3b.json";

process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

async function runSample() {
  // A unique identifier for the given session
  const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient();
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: "cuanto cuesta?",
        // The language used by the client (en-US)
        languageCode: "en-US",
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  const result = responses[0].queryResult.fulfillmentText;
  const queryText = responses[0].queryResult.queryText;

  if (result) {
    return {
      user: queryText,
      bot: result,
    };
  } else {
    return Error("No intent matched");
  }
}

const app = express();

app.get("/", async (req, res) => {
  try {
    const result = await runSample();
    return res.status(200).json({ message: "Success", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error });
  }
});

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
