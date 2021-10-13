import { render } from "https://unpkg.com/lit-html@2.0.1/lit-html.js";
import { delegate } from "./delegate.js";
import { createMuse } from "./Muse.js";
import { view } from "./view.js";
import { initialSamples } from "./samples.js";

const STATE = {
	activeMuses: [],
	samples: initialSamples(),
	recordingStatus: "ready",
}

let rec
let audioChunks = []

navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    handlerFunction(stream)
})

function handlerFunction(stream) {
    rec = new MediaRecorder(stream)
    rec.ondataavailable = (e) => {
        audioChunks.push(e.data)
        if (rec.state == "inactive") {
            let blob = new Blob(audioChunks, { type: "audio/mpeg-3" })
            sendData(blob)
        }
    }
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
	INIT: (args, state) => {},
	RENDER: (args, state) => {},
	ADD_ACTIVE_MUSE: ({ newMuse }, state) => {
		state.activeMuses.push(newMuse);
	},
	DELETE_SAMPLE: ({index}, state) => {
		state.samples[index].deleted = true
		console.log({STATE})
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

const listenBody = delegate(document.body);

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


function play() {
	const cm = document.querySelector("#cm");
	const prog = cm.view.state.doc.toString();
	window.localStorage.setItem("svg-pcb", prog)
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

const prog = `
const KeyA = () => createMuse().play(\`
	[a4 c5 e5;]-x7
\`)

const KeyB = () => createMuse().play(\`
	d4; d5; d6;
\`)

createMuse().play(\`
	c
\`)

return {
	KeyA,
	KeyB
}

`

const saved = window.localStorage.getItem("muse")
console.log(saved);
document.querySelector("#cm").view.dispatch({
  changes: { from: 0, insert: !saved ? prog.trim() : saved }
});

function initRecorder() {

}
initRecorder()

// initSamples()
















