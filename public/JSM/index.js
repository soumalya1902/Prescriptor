var urlReceived;
var dataToServer;

function sendRequest() {
  var x = document.getElementById("inputData").value;
  console.log("in server request function");

  ////url too send
  dataToServer = JSON.stringify({
    sectionType: "patientInfo",
    recordSentence: x
  });

  console.log(x);

  //////////////////////////////////////////
  $.ajax({
    url: "/dataSent",
    type: "POST",
    contentType: "application/json",
    data: dataToServer,
    success: function(res) {
      var print = res;

      console.log("detected intent----");
      console.log(JSON.parse(print).intentData);
    }
  });
  ///////////////////////////////////////////
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//record button
///////////////////////////////////////////////////////////////////////////////////////////////////////////
URL = window.URL || window.webkitURL;

var gumStream;
var rec;
var input;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext;

var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");
var pauseButton = document.getElementById("pauseButton");
var uploadButton = document.getElementById("uploadButton");

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
pauseButton.addEventListener("click", pauseRecording);
uploadButton.addEventListener("click", uploadRecording);

var url;

function startRecording() {
  console.log("recordButton clicked");

  var constraints = { audio: true, video: false };

  recordButton.disabled = true;
  stopButton.disabled = false;
  pauseButton.disabled = false;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function(stream) {
      console.log(
        "getUserMedia() success, stream created, initializing Recorder.js ..."
      );

      audioContext = new AudioContext();

      document.getElementById("formats").innerHTML =
        "Format: 1 channel pcm @ " + audioContext.sampleRate / 1000 + "kHz";
      console.log(audioContext.sampleRate / 1000);

      gumStream = stream;

      input = audioContext.createMediaStreamSource(stream);

      rec = new Recorder(input, { numChannels: 1 });

      rec.record();

      console.log("Recording started");
    })
    .catch(function(err) {
      recordButton.disabled = false;
      stopButton.disabled = true;
      pauseButton.disabled = true;
    });
}

function pauseRecording() {
  console.log("pauseButton clicked rec.recording=", rec.recording);
  if (rec.recording) {
    //pause
    rec.stop();
    pauseButton.innerHTML = "Resume";
  } else {
    //resume
    rec.record();
    pauseButton.innerHTML = "Pause";
  }
}

function stopRecording() {
  console.log("stopButton clicked");

  stopButton.disabled = true;
  recordButton.disabled = true;
  // uploadButton.disabled = false;
  pauseButton.disabled = true;

  pauseButton.innerHTML = "Pause";

  rec.stop();

  //stop microphone access
  gumStream.getAudioTracks()[0].stop();

  rec.exportWAV(createDownloadLink);
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// function uploadRecording(blob) {
//   console.log("upload recording");
//   recordButton.disabled = true;
//   pauseButton.disabled = true;
//   stopButton.disabled = true;
//   // uploadFile(blob);
// }

async function createDownloadLink(blob, sendRequest) {
  uploadFile(blob)
    .then(waitingUpload(blob))
    .then(() => {
      $.ajax({
        url: "/dataSent",
        type: "POST",
        contentType: "application/json",
        data: urlAudio,
        success: function(res) {
          console.log(res);
        }
      });
    });
  // await sendRequest();
  // .then(sendRequest());
}

function waitingUpload(blob) {
  url = URL.createObjectURL(blob);
  var au = document.createElement("audio");
  var li = document.createElement("li");
  var link = document.createElement("a");

  var filename = new Date().toISOString();

  //////////////////////////////////////////
  // uploadRecording(blob);
  ////////////////////////////////////////

  au.controls = true;
  au.src = url;

  link.href = url;
  console.log(filename + ".wav");
  link.download = filename + ".wav";
  link.innerHTML = "Save to disk";

  li.appendChild(au);

  li.appendChild(document.createTextNode(filename + ".wav "));

  li.appendChild(link);

  var upload = document.createElement("a");
  upload.href = "#";
  upload.innerHTML = "Upload";
  // upload.addEventListener("click", function(event) {
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function(e) {
  //     if (this.readyState === 4) {
  //       console.log("Server returned: ", e.target.responseText);
  //     }
  //   };
  //   var fd = new FormData();
  //   fd.append("audio_data", blob, filename);
  //   xhr.open("POST", "upload.php", true);
  //   xhr.send(fd);
  // });
  li.appendChild(document.createTextNode(" "));
  li.appendChild(upload);

  //add the li element to the ol
  recordingsList.appendChild(li);
}
//////////////////////////////////////////////////////////////////////////////////////////////
