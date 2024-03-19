const helper = require("./api/helper.js");

// const api = require("./api/test.js");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

// const morgan = require("morgan");

const { Storage } = require("@google-cloud/storage");

var filenumber = 248765;

////////////////////////////////////////////////
//pdf create
const pupp = require("puppeteer");
const fs = require("fs-extra");
const hbs = require("handlebars");
const path = require("path");
const moment = require("moment");

//key google storage
const storage = new Storage({
  keyFilename: "./pdfsave-c309e9e7e14b.json",
});

//////////////////////////////////////////////////

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//static pages dir
app.use(express.static(__dirname + "/public"));

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//index page
app.get("/index", function (req, res) {
  res.sendFile("./public/index.html", { root: __dirname + "/" });
  //author: Saket Gulhane th-10
  res.sendFile("./public/js/index.js", { root: __dirname + "/" });
  res.sendFile("./public/css/style.css", { root: __dirname + "/" });
  res.sendFile("./public/js/firebaseUpload.js", { root: __dirname + "/" });
});

/////////////////////////////////////////////////////////////////////////////
//login page

// app.get("/login", function (req, res) {
//   res.sendFile("./public/next.html", { root: __dirname + "/" });
// });

// //////////////////////////////////////////////////////////////////////////////////////////////
// //userDashboard page
// app.get("/userDashboard", function (req, res) {
//   res.sendFile("./public/userDashboard.html", { root: __dirname + "/" });
// });

// app.get("/downloadprescription", function (req, res) {
//   res.sendFile("./public/downloadprescription.html", { root: __dirname + "/" });
// });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//main page request createPrescription
app.post("/dataSent", async function (req, res) {
  console.log(req.body);
  console.log("aaaaaaaaaa");

  // apiCall
  //   .apiFun(req.body.url)
  //   .then(result => {
  //     answer = result;
  //     console.log(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  type = req.body.sectionType;
  console.log(type);

  var answer = await helper
    .doStuff(req.body.recordSentence)
    .then((result) => {
      /////////////create response string
      answer = result;
      send = JSON.stringify({
        status: "ok",
        sectionType: type,
        intentData: result,
      });
      /////send request
      res.send(send);
    })
    .catch((err) => {
      console.log(err);
    });
});

////////////////////////////////////////////////////////////////////////////////
//from downloadPrescription
app.post("/finalJson", async function (req, res) {
  // console.log(req.body);

  console.log(req.body);
  var currentURL;
  //create pdf module call
  var currentFilename = await pdfInit(req.body);
  console.log(currentFilename);

  //upload file to google cloud
  var currentURL = await doit(currentFilename)
    .then((returnurl) => {
      console.log("aaaaaaaaaaaaaaaaaa----" + returnurl);
      sendData = JSON.stringify({
        status: "ok",
        pdfurl: `${returnurl}`,
      });
      fs.unlinkSync(`${currentFilename}.pdf`);
      console.log(currentFilename);
      res.send(sendData);
    })
    .catch((err) => {
      console.log(err);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//complete upload
// Creates a client

async function uploadFile(currentFileName) {
  await storage
    .bucket("pdfiles")
    .upload(`./${currentFileName}.pdf`, {
      gzip: true,
      metadata: {
        cacheControl: "public, max-age=31536000",
      },
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(`../${currentFileName}.pdf uploaded to "pdfiles" bucket.`);
}

async function makePublic(currentFileName) {
  // Makes the file public
  await storage
    .bucket("pdfiles")
    .file(`${currentFileName}.pdf`)
    .makePublic()
    .catch((err) => {
      console.log(err);
    });
  //author: Saket Gulhane th-10

  // console.log(`gs://${"pdfiles"}/ ${currentFileName}.pdf is now public.`);
  console.log(`https://storage.googleapis.com/pdfiles/${currentFileName}.pdf`);

  var urlCurrent = `https://storage.googleapis.com/pdfiles/${currentFileName}.pdf`;
  return urlCurrent;
}

async function doit(currentFileName) {
  try {
    await uploadFile(currentFileName).catch((err) => {
      console.log(err);
    });
    var urlCurrent = await makePublic(currentFileName).catch((err) => {
      console.log(err);
    });
    return urlCurrent;
  } catch (e) {
    console.log(e);
  }
}

////////////////////////////////////////////////////////////////////////////////
//complete pdf
const compile = async function (templateName, data) {
  const filePath = path.join(process.cwd(), "template", `${templateName}.hbs`);
  const html = await fs.readFile(filePath, "utf-8");
  console.log(html);
  return hbs.compile(html)(data);
};

hbs.registerHelper("dataFormat", function (value, format) {
  console.log("formatting", value, format);
  return moment(value).format(format);
});

//author: Saket Gulhane th-10
async function pdfInit(completeData) {
  try {
    const browser = await pupp.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    console.log(completeData);
    const content = await compile("page", completeData);

    console.log(content);

    //custom file name
    var filenameCustom =
      completeData.info.firstname +
      "_" +
      completeData.info.lastname +
      "_" +
      completeData.metaData.date.slice(6) +
      "_" +
      completeData.metaData.time.slice(6) +
      "_" +
      filenumber;
    filenumber += 13;

    await page.setContent(content);
    await page.emulateMedia("screen");
    await page.pdf({
      path: `${filenameCustom}.pdf`,
      format: "A4",
      printBackground: true,
    });

    console.log("done");
    await browser.close();
    return filenameCustom;
  } catch (e) {
    console.log(e);
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`running on port--${port}`);
});
