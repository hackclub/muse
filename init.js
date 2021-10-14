import { delegate } from "./delegate.js";
import { defaultProg } from "./defaultProg.js";

const listenBody = delegate(document.body);

let audioChunks = [];

export async function init(args, state) {
	dispatch("RENDER");

	listenBody("click", ".trigger-play", () => {
		dispatch("PLAY");
	})

	listenBody("keydown", "", (e) => {
		let code = event.code;
		if (code === "Enter" && event.shiftKey) {
		  event.preventDefault();
		  dispatch("PLAY");
		}
	})

	const saved = window.localStorage.getItem("muse-prog")
	document.querySelector("#cm").view.dispatch({
	  changes: { from: 0, insert: !saved ? defaultProg.trim() : saved }
	});

	const savedSamples = window.localStorage.getItem("muse-samples");
	if (savedSamples) state.samples = JSON.parse(savedSamples);


	dispatch("RENDER")

	const stream = await navigator
		.mediaDevices
		.getUserMedia({ audio: true })

	state.recordingStatus = "ready";
	dispatch("RENDER");

	state.rec = new MediaRecorder(stream)
    state.rec.ondataavailable = (e) => {
        audioChunks.push(e.data)
        if (state.rec.state == "inactive") {
            let blob = new Blob(audioChunks, { type: "audio/mpeg-3" })
            sendData(blob)
        }
    }
}

function makeId(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var numbers = "0123456789"
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function sendData(data) {
    const body = new FormData()
    body.append('sound',data)
    const upload = await fetch('https://sound-sampler.maxwofford.repl.co/upload-sound', {
      method: 'POST',
      body
    }).then(r => r.json())
    const url = 'https://sound-sampler.maxwofford.repl.co/' + upload.data.filename
    const sampleObj = {}
    const name = makeId(4);
	dispatch("ADD_SAMPLE", { name, url, provided: false})
    // sampleObj[name] = {url, provided: false}
    // setSample(sampleObj)
  }