var input; 
var gumStream; 	
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext; 
function startRecording() 
{
	var constraints = { audio: true, video:false }
	navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
		audioContext = new AudioContext();
		gumStream = stream;
		input = audioContext.createMediaStreamSource(stream);
		recorder = new WebAudioRecorder(input, {
			workerDir: "js/", // must end with slash
			encoding: 'wav',
			numChannels:2, //2 is the default, mp3 encoding supports only 2
			onEncoderLoading: function(recorder, encoding) { 
				//__log("Loading "+encoding+" encoder...");
			},
			onEncoderLoaded: function(recorder, encoding) { 
				//__log(encoding+" encoder loaded");
			}
		});
		recorder.onComplete = function(recorder, blob) { 
			//__log("Encoding complete");
			createDownloadLink(blob,recorder.encoding);
			//encodingTypeSelect.disabled = false;
		}

		recorder.setOptions({
			timeLimit:12000,
			encodeAfterRecord:true,
				ogg: {quality: 0.5},
				mp3: {bitRate: 160}
			});

		//start the recording process
		recorder.startRecording();

		//__log("Recording started");

	}).catch(function(err) {
			//enable the record button if getUSerMedia() fails
			// recordButton.disabled = false;
			// stopButton.disabled = true;
			console.log('--->',err)
	});


}
function stopRecording() {
	gumStream.getAudioTracks()[0].stop();
	recorder.finishRecording();
}

function createDownloadLink(blob,encoding) {
	console.log('bolb-->',blob)
	var url = URL.createObjectURL(blob);
	var au = document.createElement('audio');
	var li = document.createElement('li');
	var link = document.createElement('a');

	//add controls to the <audio> element
	au.controls = true;
	au.src = url;

	//link the a element to the blob
	link.href = url;
	link.download = new Date().toISOString() + '.'+encoding;
	link.innerHTML = link.download;

	//add the new audio and a elements to the li element
	li.appendChild(au);
	li.appendChild(link);

	//add the li element to the ordered list
	recordingsList.appendChild(li);
}