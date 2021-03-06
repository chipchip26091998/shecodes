URL = window.URL || window.webkitURL;
var gumStream;
var rec;
var input;

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;
//new audio context to help us record 
var recordButton = document.getElementById("recordButton");
var stopButton = document.getElementById("stopButton");

recordButton.addEventListener("click", recordButton);
stopButton.addEventListener("click", stopButton);

navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

let onFail = function(e) {
    alert('Error '+e);
    console.log('Rejected!', e);
};

let onSuccess = function(s) {
    console.log('Recording...');
    let tracks = s.getTracks();
    recordButton.setAttribute('disabled', true);
    stopButton.removeAttribute('disabled');
    context = new AudioContext();
    let mediaStreamSource = context.createMediaStreamSource(s);
    recorder = new Recorder(mediaStreamSource);
    recorder.record();

    stopButton.addEventListener('click', ()=>{
        console.log('Stop Recording...');
        stopButton.setAttribute('disabled', true);
        recordButton.removeAttribute('disabled');
        recorder.stop();
        tracks.forEach(track => track.stop());
        recorder.exportWAV(function(s) {
            var audio = document.createElement('audio');
            audio.controls = true;
            audio.src = window.URL.createObjectURL(s);
            document.getElementById("controls").appendChild(audio);
        });
    });
}

recordButton.addEventListener('click', ()=>{
    if (navigator.getUserMedia) {
        
        navigator.getUserMedia({audio: true}, onSuccess, onFail); 																			
    } else {
        console.warn('navigator.getUserMedia not present');
    }
});


// function startRecording() { 
//     console.log("recordButton clicked"); 


//     var constraints = {
//         audio: true,
//         video: false
//     } 

//     recordButton.disabled = true;
//     stopButton.disabled = false;
//     pauseButton.disabled = false;

//     navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
//         console.log("getUserMedia() success, stream created, initializing Recorder.js ..."); 
//         /* assign to gumStream for later use */
//         gumStream = stream;
//         /* use the stream */
//         input = audioContext.createMediaStreamSource(stream);
//         /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
//         rec = new Recorder(input, {
//             numChannels: 1
//         }) 
//         //start the recording process 
//         rec.record();
//         console.log("Recording started");
//     }).catch(function(err) {
//         //enable the record button if getUserMedia() fails 
//         recordButton.disabled = false;
//         stopButton.disabled = true;
//         pauseButton.disabled = true
//     });
// }

// function pauseRecording() {
//     console.log("pauseButton clicked rec.recording=", rec.recording);
//     if (rec.recording) {
//         //pause 
//         rec.stop();
//         pauseButton.innerHTML = "Resume";
//     } else {
//         //resume 
//         rec.record();
//         pauseButton.innerHTML = "Pause";
//     }
// }

// function stopRecording() {
//     console.log("stopButton clicked");
//     //disable the stop button, enable the record too allow for new recordings 
//     stopButton.disabled = true;
//     recordButton.disabled = false;
//     pauseButton.disabled = true;
//     //reset button just in case the recording is stopped while paused 
//     pauseButton.innerHTML = "Pause";
//     //tell the recorder to stop the recording 
//     rec.stop(); //stop microphone access 
//     gumStream.getAudioTracks()[0].stop();
//     //create the wav blob and pass it on to createDownloadLink 
//     rec.exportWAV(createDownloadLink);
// }

// function createDownloadLink(blob) {
//     var url = URL.createObjectURL(blob);
//     var au = document.createElement('audio');
//     var li = document.createElement('li');
//     var link = document.createElement('a');
//     //add controls to the <audio> element 
//     au.controls = true;
//     au.src = url;
//     //link the a element to the blob 
//     link.href = url;
//     link.download = new Date().toISOString() + '.wav';
//     link.innerHTML = link.download;
//     //add the new audio and a elements to the li element 
//     li.appendChild(au);
//     li.appendChild(link);
//     alert(link);
//     //add the li element to the ordered list 
//     recordingsList.appendChild(li);
// }




