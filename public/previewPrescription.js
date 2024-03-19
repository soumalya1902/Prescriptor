var completePrescription = sessionStorage.getItem("completePrescription");
var completeData = JSON.parse(completePrescription);
console.log(completeData);

var defEmptys = "NA";

try {
  console.log(completeData.info.firstname);
} catch (e) {
  console.log(e);
}
//info

try {
  var firstn = completeData.info.firstname.trim();
  var lastn = completeData.info.lastname.trim();
  var gender = completeData.info.gender.trim();
  var age = completeData.info.age.trim();
} catch (err) {
  console.log(err);
  console.log("patitent info json data is incomplete");
}
try {
  //diagnosis
  var diaSymText = completeData.diagnosis.symptoms.trim();
  var diaDiaText = completeData.diagnosis.diagnosis.trim();
} catch (err) {
  console.log(err);
  console.log("disgnosis json data is incomplete");
}

try {
  //medcines
  var medText = completeData.medicine;
} catch (err) {
  console.log(err);
  console.log("medicine json data is incomplete");
}
//advice
try {
  var adviceText = completeData.advice.trim();
} catch (err) {
  console.log(err);
  console.log("advice json data is incomplete");
}

try {
  //firstname
  document.getElementById("inputFirstName").value =
    firstn[0].toUpperCase() + firstn.slice(1);

  //lastname
  document.getElementById("inputLastName").value =
    lastn[0].toUpperCase() + lastn.slice(1);

  //gender
  document.getElementById("inputGender").value =
    gender[0].toUpperCase() + gender.slice(1);
  // string[0].toUpperCase() + string.slice(1);

  //age
  document.getElementById("inputAge").value = age;
} catch (err) {
  document.getElementById("inputFirstName").value = defEmptys;
  document.getElementById("inputLastName").value = defEmptys;
  document.getElementById("inputGender").value = defEmptys;
  document.getElementById("inputAge").value = defEmptys;

  console.log(err);
  console.log("input field is incomplete");
}
//symptoms

try {
  document.getElementById("inputSymptoms").value =
    diaSymText[0].toUpperCase() + diaSymText.slice(1);

  document.getElementById("inputDiagnosis").value =
    diaDiaText[0].toUpperCase() + diaDiaText.slice(1);
} catch (err) {
  document.getElementById("inputSymptoms").value = defEmptys;
  //author: Saket Gulhane th-10
  document.getElementById("inputDiagnosis").value = defEmptys;

  console.log(err);
  console.log("input dia is incomplete");
}
//medicine text
text = "Name\t\t\t\tDuration\t\t\t\tDosage\n";

try {
  co = 0;
  medText.forEach((ele) => {
    if (co == 0) {
      co += 1;
    } else {
      text =
        text +
        ele.name +
        "\t\t\t\t" +
        ele.duration +
        "\t\t\t\t" +
        ele.dosage +
        "\n";
    }
  });
  document.getElementById("inputPrescription").value = text;
  console.log(text);
} catch (err) {
  natext = text + defEmptys + "\t\t\t\t" + defEmptys + "\t\t\t\t" + defEmptys;
  document.getElementById("inputPrescription").value = natext;

  console.log(err);
  console.log("med input is incomplete");
}
//author: Saket Gulhane th-10
//advice

try {
  document.getElementById("inputAdvice").value =
    adviceText[0].toUpperCase() + adviceText.slice(1);
} catch (err) {
  document.getElementById("inputAdvice").value = defEmptys;
  console.log(err);
  console.log("advice input is incomplete");
}

//for fetching info from input and setting to json file
function goToFun() {
  console.log(document.getElementById("inputFirstName").value);
  console.log(completeData);

  try {
    completeData.info.firstname = document.getElementById(
      "inputFirstName"
    ).value;
    completeData.info.lastname = document.getElementById("inputLastName").value;
    completeData.info.gender = document.getElementById("inputGender").value;
    completeData.info.age = document.getElementById("inputAge").value;
  } catch (e) {
    completeData.info.firstname = defEmptys;
    completeData.info.lastname = defEmptys;
    completeData.info.gender = defEmptys;
    completeData.info.age = defEmptys;
  }
  try {
    completeData.diagnosis.symptoms = document.getElementById(
      "inputSymptoms"
    ).value;
    completeData.diagnosis.diagnosis = document.getElementById(
      "inputDiagnosis"
    ).value;
  } catch (e) {
    completeData.diagnosis.symptoms = defEmptys;
    completeData.diagnosis.diagnosis = defEmptys;
  }
  completeData.advice = document.getElementById("inputAdvice").value;

  /////////////////////////////////////////////////////////////////////
  //for textarea medicine

  var presText = document.getElementById("inputPrescription").value;
  console.log(presText);
  var mediArray = presText.split(/\r?\n/);
  var medLen = completeData.medicine;
  completeData.medicine = [];
  //author: Saket Gulhane th-10
  var locali = 0;
  console.log(completeData);
  mediArray.forEach((st) => {
    if (locali == 0) {
      locali += 1;
    } else {
      console.log(st);
      ele = st.split(/\r?\t\t\t\t/);
      console.log(ele[0] + " " + ele[1] + " " + ele[1]);
      arr = { name: ele[0], duration: ele[1], dosage: ele[2] };
      console.log(arr);
      completeData.medicine.push(arr);
      console.log(completeData);
      var s = "//author: Saket Gulhane th-10";
      console.log(s);
    }
  });
  // completeData.medicine.pop();
  ////////////////////////////////////////////////////////////////////////
  console.log(completeData);
  sessionStorage.setItem("completePrescription", JSON.stringify(completeData));
  window.location = "./downloadprescription.html";
}

function goToDashboard() {
  var r = confirm("This will lose all the data, click ok to confirm.");
  if (r == true) {
    window.location = "./userDashboard.html";
  }
}
