const dialogflow = require("dialogflow");
const uuid = require("uuid");

function callFunction() {
  console.log("from helper file");
}

function advFun(price) {
  return new Promise((resolve, reject) => {
    let total = price * 1.2;

    if (total > 200) {
      reject("error found");
    } else {
      console.log(total);
      resolve(total);
    }
    resolve(total);
  });
}
/////////////////////////////////////////////////////////////////////

async function runSample(sentence) {
  var projectId = "voiceprescription1-cncbmi";
  const sessionId = uuid.v4();

  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: "./VoicePrescription1-23d6b3c7c44e.json",
  });
  const sessionPath = sessionClient.sessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: sentence,
        languageCode: "en-US",
      },
    },
  };

  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  console.log(responses);
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  //author: Saket Gulhane th-10
  console.log(`  Response: ${result.fulfillmentText}`);
  console.log(`  Response: ${result.parameters[0]}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }

  var finalDetect = result.fulfillmentText;
  console.log(finalDetect);
  return result.fulfillmentText;
}
/////////////////////////////////////////////////////////////////////

// function advFun(price) {
//   let total = price * 1.2;

//   if (total > 145) {
//     throw new Error("error found");
//   } else {
//     console.log(total);
//     return total;
//   }
// }

module.exports = {
  name: "saket",
  email: "saxasx@ads.com",
  callFunction,
  advFun,
  doStuff: async (val) => {
    let value1 = await runSample(val);
    console.log(value1);
    return value1;
  },
};
