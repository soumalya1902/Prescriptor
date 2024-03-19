////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var medCountText = 0;
var recordMedCount = 0;
var uploadMedCount = 0;

var completeJson = {
  doctor: null,
  info: { firstname: null, lastname: null, age: null, gender: null },
  diagnosis: { diagnosis: null, symptoms: null },
  medicine: [{ name: null, duration: null, dosage: null }],
  advice: null,
};
var inputMedicine;
var inputInfo;
var inputdiagnosis;
var inputAdvice;
var x, st;
///////////////////////////////////////
var message = document.querySelector("#textInfo");
var textField;

var docJsonData = sessionStorage.getItem("docInfo");
console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
var docData = JSON.parse(docJsonData);
completeJson.doctor = docData;
console.log(completeJson);

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;

var grammar = "#JSGF V1.0;";

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = "en-US";
recognition.interimResults = false;

recognition.onresult = function (event) {
  var last = event.results.length - 1;
  var command = event.results[last][0].transcript;
  message.textContent = "Voice Input: " + command + ".";
  textField.val(command);
};

recognition.onspeechend = function () {
  recognition.stop();
  $("#load").detach();
  $("#loadDia").detach();
  $("#loadMed").detach();
  $("#loadAdv").detach();
};

recognition.onerror = function (event) {
  message.textContent = "Error occurred in recognition: " + event.error;
};

//patient info input
document
  .querySelector("#recordPInfo")
  .addEventListener("click", async function () {
    $("#loadingmessage").append(
      `<div  id="load" class="load1"><img src="./images/recordingLoader.gif"/><p>Recording now</p></div>`
    );
    $("#loadingmessage").show();
    await recognition.start();
    textField = $("#textInfo");

    // $("#loadingmessage").hide();
  });

//diagnosis input
document.querySelector("#recordDiag").addEventListener("click", function () {
  $("#loadingmessageDia").append(
    `<div  id="loadDia" class="load1"><img src="./images/recordingLoader.gif"/><p>Recording now</p></div>`
  );
  $("#loadingmessageDia").show();
  recognition.start();
  textField = $("#textDiag");
});

//medicine input
document.querySelector("#recordMed").addEventListener("click", function () {
  $("#loadingmessageMed").append(
    `<div  id="loadMed" class="load1"><img src="./images/recordingLoader.gif"/><p>Recording now</p></div>`
  );
  $("#loadingmessageMed").show();
  recognition.start();
  textField = $("#textMed");
});

//advice input
document.querySelector("#recordAdvice").addEventListener("click", function () {
  $("#loadingmessageAdv").append(
    `<div  id="loadAdv" class="load1"><img src="./images/recordingLoader.gif"/><p>Recording now</p></div>`
  );
  $("#loadingmessageAdv").show();

  recognition.start();
  textField = $("#textAdvice");
});

////////////////////////////////////////////////////////////////////////////////////////////////////
//seperate medicine
function recordmultiple(idThis) {
  $("#loadingmessageMed").append(
    `<div  id="loadMed" class="load1"><img src="./images/recordingLoader.gif"/><p>Recording now</p></div>`
  );
  $("#loadingmessageMed").show();
  console.log("hjfghf");
  console.log(idThis + "hjfhff");
  recognition.start();
  //author: Saket Gulhane th-10
  var ss = "#ctext" + idThis;
  console.log(ss);
  textField = $("#ctext" + idThis);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////

// document.querySelector("#uploadMed").addEventListener("click", function() {
//   var x = document.getElementById("textMed").value;
//   console.log("in server request function");

//   ////url too send
//   dataToServer = JSON.stringify({
//     sectionType: "medInfo",
//     recordSentence: x
//   });

//   console.log(x);
//   $.ajax({
//     url: "/prescription/dataSent",
//     type: "POST",
//     contentType: "application/json",
//     data: dataToServer,
//     success: function(res) {
//       var print = res;

//       console.log("detected intent----");
//       console.log(JSON.parse(print).intentData);
//     }
//   });
// });

// document.querySelector("#uploadPInfo").addEventListener("click", function() {
//   var x = document.getElementById("textPInfo").value;
//   console.log("in server request function");

//   ////url too send
//   dataToServer = JSON.stringify({
//     sectionType: "patientInfo",
//     recordSentence: x
//   });

//   console.log(x);
//   $.ajax({
//     url: "/prescription/dataSent",
//     type: "POST",
//     contentType: "application/json",
//     data: dataToServer,
//     success: function(res) {
//       var print = res;

//       console.log("detected intent----");
//       console.log(JSON.parse(print).intentData);
//     }
//author: Saket Gulhane th-10
//   });
// });

// document.querySelector("#uploadDiag").addEventListener("click", function() {
//   var x = document.getElementById("textDiag").value;
//   console.log("in server request function");

//   ////url too send
//   dataToServer = JSON.stringify({
//     sectionType: "diagnosisInfo",
//     recordSentence: x
//   });

//   console.log(x);
//   $.ajax({
//     url: "/prescription/dataSent",
//     type: "POST",
//     contentType: "application/json",
//     data: dataToServer,
//     success: function(res) {
//       var print = res;

//       console.log("detected intent----");
//       console.log(JSON.parse(print).intentData);
//     }
//   });
// });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//request to server
// function sendRequestFun(x){
//     $.ajax({
//         url: "/dataSent",
//         type: "POST",
//         contentType: "application/json",
//         data: dataToServer,
//         success: function(res) {
//           var print = res;

//           console.log("detected intent----");
//           console.log(JSON.parse(print).intentData);
//         }
//       });
//       return JSON.parse(print).intentData;
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//only for medicine
async function serverRequetMedicine(sectionType, id) {
  $("#loadingmessageMed").append(
    `<div  id="loadMed" class="load1"><img src="./images/saveLoading.gif"/><p>Please Wait</p></div>`
  );
  $("#loadingmessageMed").show();
  var responseJson;
  var qq;

  var secType = sectionType;
  var ctext = "ctext" + id;
  //
  x = document.getElementById(ctext).value;
  console.log("in medicine section");
  console.log(x);
  ////url to send
  var dataToServer = JSON.stringify({
    sectionType: secType,
    recordSentence: x,
  });
  console.log(x);

  try {
    await $.ajax({
      url: "/dataSent",
      type: "POST",
      contentType: "application/json",
      data: dataToServer,
      success: function (res) {
        var print = res;

        console.log("detected intent----");
        st = JSON.parse(print).intentData;
        // qq = JSON.parse(st);
        console.log(st);
      },
    });
  } catch (e) {
    console.log(e);
    alert("Can't Send Request to Server");
  }

  console.log("after response");
  console.log(st);
  //////////////////////////////////////////////////////////////
  if (st === "errorerror") {
    alert("Opps!! Please record again..");
  } else {
    try {
      saveMedicine(st);
    } catch (e) {
      console.log(e);
    }
  }
  //////////////////////////////////////////////////////////////

  console.log(completeJson);
  $("#loadMed").detach();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//section type:
//1.info
//2.diagnos
//3.medicine
//4.advice
async function serverRequet(sectionType) {
  document.getElementById("genPrescription").disabled = true;
  var responseJson;
  var qq;

  var secType = sectionType;
  if (secType === "info") {
    document.getElementById("uploadPInfo").disabled = true;
    $("#loadingmessage").append(
      `<div  id="load" class="load1"><img src="./images/saveLoading.gif"/><p>Please Wait</p></div>`
    );
    $("#loadingmessage").show();
    //
    inputInfo = document.getElementById("textInfo").value;
    x = inputInfo;
    console.log("in patientInfo section ppp");
    console.log(inputInfo);
    //
  }
  /////
  else if (secType === "diagnos") {
    document.getElementById("uploadDiag").disabled = true;
    $("#loadingmessageDia").append(
      `<div  id="loadDia" class="load1"><img src="./images/saveLoading.gif"/><p>Please Wait</p></div>`
    );
    $("#loadingmessageDia").show();
    //
    inputdiagnosis = document.getElementById("textDiag").value;
    x = inputdiagnosis;
    console.log("in diagnosis section");
    console.log(inputdiagnosis);
    //
  }
  //////////
  else if (secType === "medicines") {
    document.getElementById("uploadMed").disabled = true;
    $("#loadingmessageMed").append(
      `<div  id="loadMed" class="load1"><img src="./images/saveLoading.gif"/><p>Please Wait</p></div>`
    );
    $("#loadingmessageMed").show();
    //
    inputMedicine = document.getElementById("textMed").value;
    x = inputMedicine;
    console.log("in medicine section");
    console.log(inputMedicine);
    var s = "//author: Saket Gulhane th-10";
    console.log(s);
    //
  }
  /////
  else if (secType === "advice") {
    document.getElementById("uploadAdv").disabled = true;
    $("#loadingmessageAdv").append(
      `<div  id="loadAdv" class="load1"><img src="./images/saveLoading.gif"/><p>Please Wait</p></div>`
    );
    $("#loadingmessageAdv").show();
    //
    inputAdvice = document.getElementById("textAdvice").value;
    x = inputAdvice;
    console.log("in advice section");
    console.log(inputAdvice);
    //
  }

  if (x === "") {
    alert("Please record the text first!!");
  } else {
    //dont send request for sectype not equal to advice
    if (secType !== "advice") {
      ////url to send
      var dataToServer = JSON.stringify({
        sectionType: secType,
        recordSentence: x,
      });
      console.log(x);

      try {
        await $.ajax({
          url: "/dataSent",
          type: "POST",
          contentType: "application/json",
          data: dataToServer,
          success: function (res) {
            var print = res;

            console.log("detected intent----");
            st = JSON.parse(print).intentData;
            // qq = JSON.parse(st);
            console.log(st);
          },
        });
      } catch (e) {
        console.log(e);
        alert("Can't Send Request to Server");
      }

      if (st === "errorerror") {
        alert("Opps!! Can't recognize it..\nPlease record again..");
      } else {
        console.log("after response");
        console.log(st);
        //////////////////////////////////////////////////////////////
        try {
          if (secType === "info") {
            saveInfo(st);
          } else if (secType === "diagnos") {
            saveDiagnos(st);
          } else if (secType === "medicines") {
            saveMedicine(st);
          }
        } catch (e) {
          console.log(e);
        }
      }

      //////////////////////////////////////////////////////////////
    } else {
      completeJson.advice = inputAdvice;
    }
  }

  console.log(completeJson);
  //record btn
  $("#load").detach();
  $("#loadAdv").detach();
  $("#loadDia").detach();
  $("#loadMed").detach();

  //save btn
  document.getElementById("uploadPInfo").disabled = false;
  document.getElementById("uploadDiag").disabled = false;
  document.getElementById("uploadMed").disabled = false;
  document.getElementById("uploadAdv").disabled = false;
  ///last btn
  document.getElementById("genPrescription").disabled = false;
}

function saveInfo(str) {
  var sepData = str.split(",");
  var jsonInfo = {
    firstname: sepData[0],
    lastname: sepData[1],
    age: sepData[2],
    gender: sepData[3],
  };
  completeJson.info = jsonInfo;
}

function saveDiagnos(str) {
  var sepData = str.split(",");
  var jsonDia = { diagnosis: sepData[0], symptoms: sepData[1] };
  completeJson.diagnosis = jsonDia;
}

//edit in dialogflow first
function saveMedicine(str) {
  var sepData = str.split("?");
  // var rawMedicine = sepData[0];
  // var rawDuration = sepData[1];
  // jsonRawMedicine = rawMedicine.split(", ");
  // console.log(jsonRawMedicine);
  var jsonMedcine = {
    name: sepData[0],
    duration: sepData[1],
    dosage: sepData[2],
  };
  // completeJson.medicine = jsonMedcine;
  var org = completeJson.medicine;
  org.push({ name: sepData[0], duration: sepData[1], dosage: sepData[2] });
  completeJson.medicine = org;
  console.log(completeJson);
}
////////////////////////////////////////////////////////////////////////////////

// var inputMedicine = document.getElementById("textMed").value;
// console.log("in server request function");

// ////url too send
// dataToServer = JSON.stringify({
//   sectionType: "medInfo",
//   recordSentence: inputMedicine
// });

// console.log(x);
// $.ajax({
//   url: "/prescription/dataSent",
//   type: "POST",
//   contentType: "application/json",
//   data: dataToServer,
//   success: function(res) {
//     var print = res;

//     console.log("detected intent----");
//     console.log(JSON.parse(print).intentData);
//   }
// });
// });

//  inputMedicine = document.getElementById("textMed").value;
//  inputInfo = document.getElementById("textPInfo").value;
//  inputdiagnosis = document.getElementById("textDiag").value;
//  inputAdvice = document.getElementById("textAdvice").value;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// container id = medicineList
function addMedicine() {
  medCountText += 1;
  recordMedCount += 1;
  uploadMedCount += 1;
  var ctext = "ctext" + medCountText;
  var crecord = "crecord" + recordMedCount;
  var csave = "csave" + uploadMedCount;
  console.log("add bbbbb");
  code = `<div class="col-md-8">
              <input
                class="speechConverted col-md-12 dummy"
                type="text"
                id="${ctext}"
                name="fname"
              />
            </div>

            <div class="col-md-4 justify-content-end">
              <div class="button_grp">
                <button class="buttons dummy" id="${crecord}" type="button" onclick="recordmultiple(${recordMedCount})
                  ">
                  Start Recording
                </button>
                <button
                  class="buttons"
                  id="${csave}"
                  type="button"
                  onclick="serverRequetMedicine('medicines', ${recordMedCount})"
                >
                  SAVE
                </button>
              </div>
            </div>`;
  $("#medicineList").append(code);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sendDataToPreview() {
  console.log(completeJson);
  sessionStorage.setItem("completePrescription", JSON.stringify(completeJson));

  if (
    completeJson.info != null &&
    completeJson.diagnosis != null &&
    completeJson.medicine != [] &&
    completeJson.advice != null
  ) {
    window.location = "./previewPrescription.html";
  } else {
    var r = confirm(
      "Please fill all inputs and click Save!!\nClick ok to ignore this message."
    );
    if (r == true) {
      window.location = "./previewPrescription.html";
    }
  }
}
