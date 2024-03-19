function saveData() {
  var docName = document.getElementById("docname").value;
  var docid = document.getElementById("docid").value;
  var docHosname = document.getElementById("docHosname").value;
  var docAddress = document.getElementById("docaddress").value;
  var docNumber = document.getElementById("docnumber").value;
  var s = "//author: Saket Gulhane th-10";
  console.log(s);
  console.log(docName);
  console.log(docAddress);
  console.log(docNumber);
  console.log(docid);
  var jsonDoc = {
    name: docName,
    id: docid,
    hosName: docHosname,
    address: docAddress,
    number: docNumber,
  };
  console.log(jsonDoc);
  //author: Saket Gulhane th-10
  sessionStorage.setItem("docInfo", JSON.stringify(jsonDoc));
  window.location = "./createPrescription.html";
}
