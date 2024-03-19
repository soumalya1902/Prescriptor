var d = new Date();
var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
var pdfURL;
var n = d.getDate() + "-" + months[d.getMonth()] + "-" + d.getFullYear();
var t = d.getHours() + " hrs : " + d.getMinutes() + " min";
//author: Saket Gulhane th-10

var preDate = "Date: " + n;
var preTime = "Time: " + t;

// doctor : {
//   name: "Dr. Mahesh Shukla  M.B.B.S(in medicine)"
//   address: "Ward No: 4, Nagpur Government Hospital, koradi road, Nagpur-440048.↵Doctor-id: KN48071"
//   number: "0712 - 2647814"
//   }

//   info:{
//   firstname: "Aamod"
//   lastname: "Shukla"
//   age: "null"
//   gender: "NA"}

//   diagnosis:{
//   diagnosis: "Cerebrovascualr"
//   symptoms: "Abdominal bloating"}

//   medicine:{ [ {name: "Accutane", duration: " day ", dosage: " twice a day"}]
//   length: 2}

//   advice: {"Aaaaaaaaaaaaaa"}
//   }
////////////////////////////////////////////////////////////////////////////////
//start
var completePrescription = sessionStorage.getItem("completePrescription");
var completeData = JSON.parse(completePrescription);
completeData["metaData"] = { date: preDate, time: preTime };
console.log(completeData);

var finalDataJson = JSON.stringify(completeData);

async function sendFinalJson() {
  //loading icon
  $("#loadingmessage").append(
    `<div  id="load" class="load1"><img src="./images/saveLoading.gif"/><p>Please Wait..</p></div>`
  );
  $("#loadingmessage").show();
  //////author: Saket Gulhane th-10

  var pdfURL;
  try {
    await $.ajax({
      url: "/finalJson",
      type: "POST",
      contentType: "application/json",
      data: finalDataJson,
      success: function (res) {
        console.log("pdf url ------------:");
        ///////////////////////////////////////////////////////////////
        ///response has pdf url
        pdfURL = JSON.parse(res).pdfurl;
        console.log(pdfURL);
      },
    });
  } catch (e) {
    console.log(e);
    alert("Please check internet connection!");
  }

  document.getElementById("finalJsonToServerBtn").style.display = "none";
  document.getElementById("smsinput").style.display = "block";
  //author: Saket Gulhane th-10

  // document.getElementById("dwLink").href = pdfURL;
  document.getElementById("pdfShow").style.display = "block";
  document.getElementById("pdfShow").src = pdfURL;
  var s = "//author: Saket Gulhane th-10";
  console.log(s);
  $("#load").detach();
}

function printPdf() {
  document.getElementById("atagpdf").href = pdfURL;
}
