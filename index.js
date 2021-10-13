import { render } from "https://unpkg.com/lit-html@2.0.1/lit-html.js";
import { delegate } from "./delegate.js";
import { createMuse } from "./Muse.js";
import { view } from "./view.js";
import { initialSamples } from "./samples.js";
import { defaultProg } from "./defaultProg.js";

const listenBody = delegate(document.body);

let rec;
let audioChunks = [];

async function init(args, state) {
	dispatch("RENDER");

	listenBody("click", ".trigger-play", () => {
		play();
	})

	listenBody("keydown", "", (e) => {
		let code = event.code;
		if (code === "Enter" && event.shiftKey) {
		  event.preventDefault();
		  play();
		}
	})

	const saved = window.localStorage.getItem("muse")
	document.querySelector("#cm").view.dispatch({
	  changes: { from: 0, insert: !saved ? defaultProg.trim() : saved }
	});


	const stream = await navigator
		.mediaDevices
		.getUserMedia({ audio: true })

	rec = new MediaRecorder(stream)
    rec.ondataavailable = (e) => {
        audioChunks.push(e.data)
        if (rec.state == "inactive") {
            let blob = new Blob(audioChunks, { type: "audio/mpeg-3" })
            sendData(blob)
        }
    }

	dispatch("RENDER")
}

const STATE = {
	activeMuses: [],
	samples: initialSamples(),
	recordingStatus: "ready",
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
    const name = Math.random().toString(36).substring(2, 15)
	dispatch("ADD_SAMPLE", { name, url, provided: false})
    // sampleObj[name] = {url, provided: false}
    // setSample(sampleObj)
  }


const ACTIONS = {
	INIT: init,
	RENDER: (args, state) => {},
	ADD_ACTIVE_MUSE: ({ newMuse }, state) => {
		state.activeMuses.push(newMuse);
	},
	DELETE_SAMPLE: ({index}, state) => {
		state.samples[index].deleted = true;
	},
	START_RECORDING: (args, state) => {
		rec.start()
		state.recordingStatus = "recording"
	},
	ADD_SAMPLE: (sample, state) => {
		state.recordingStatus = "ready"
		state.samples.push(sample)
	},
	STOP_RECORDING: async (args, state) => {
		state.recordingStatus = "loading"
		dispatch("RENDER") // force re-render

		await rec.stop()
	},
}

const dispatch = (action, args) => {
	if (action in ACTIONS) {
		ACTIONS[action](args, STATE);
		render(view(STATE), document.body)
	} else console.error("Unrecongized action:", action);
}

window.dispatch = dispatch;

dispatch("INIT");

const included = { createMuse }


function play() {
	const cm = document.querySelector("#cm");
	const prog = cm.view.state.doc.toString();
	window.localStorage.setItem("muse", prog);
	const f = new Function(...Object.keys(included), prog)
	const result = f(...Object.values(included));
	console.log("Attaching keys:", result);

	listenBody("keydown", "", (e) => {
		let code = event.code;

		if (code === "Enter" && event.shiftKey) {
			event.preventDefault();
	  		play();
		}

		if (e.target.getAttribute("role") === "textbox") return;

		if (code in result) {
			result[code]();
		}

	}, true)

}













