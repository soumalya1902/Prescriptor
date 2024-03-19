// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDNCNdjpG7FesSpGEtq5d7qSCgsQAeOf_w",
  authDomain: "voiceprescription1-cncbmi.firebaseapp.com",
  databaseURL: "https://voiceprescription1-cncbmi.firebaseio.com",
  projectId: "voiceprescription1-cncbmi",
  storageBucket: "voiceprescription1-cncbmi.appspot.com",
  messagingSenderId: "708469216633",
  appId: "1:708469216633:web:66eb9cedda04611b644ba8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

async function uploadFile(blob) {
  const ref = firebase.storage().ref();

  // const file = document.querySelector("#fileWav").files[0]

  const file = blob;
  const name = new Date() + "-" + file.name;

  const metaData = {
    contentType: file.type
  };

  const task = ref.child(name).put(file, metaData);

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      //pass this as url for request to server
      console.log(url);
      urlReceived = url;
      console.log(urlReceived);

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      alert("file uploaded");
      recordButton.disabled = false;
    });
}
