import { render } from "https://unpkg.com/lit-html@2.0.1/lit-html.js";
import { delegate } from "./delegate.js";
import { createMuse } from "./Muse.js";
import { view } from "./view.js";
import { initialSamples } from "./samples.js";
import { init } from "./init.js";
import "./test.js";

const listenBody = delegate(document.body);

const STATE = {
	activeMuses: [],
	samples: initialSamples(),
	recordingStatus: "pre-permission",
	sampleVolume: 0.35,
	rec: undefined,
	played: [],
}


const ACTIONS = {
	INIT: init,
	RENDER: (args, state) => { render(view(STATE), document.body) },
	ADD_ACTIVE_MUSE: ({ newMuse }, state) => {
		state.activeMuses.push(newMuse);
	},
	DELETE_SAMPLE: ({index}, state) => {
		state.samples[index].deleted = true;
		dispatch("RENDER");
	},
	START_RECORDING: (args, state) => {
		state.rec.start()
		state.recordingStatus = "recording"
		dispatch("RENDER");
	},
	ADD_SAMPLE: (sample, state) => {
		state.recordingStatus = "ready"
		state.samples.push(sample)
		dispatch("RENDER");
	},
	STOP_RECORDING: async (args, state) => {
		state.recordingStatus = "loading"
		dispatch("RENDER") // force re-render

		await state.rec.stop()
	},
	ADD_PLAYED: ({symbol}, state) => {
		state.played.push(symbol);
		dispatch("RENDER");
		const el = document.querySelector(".played-log");
   		el.scrollTop = el.scrollHeight - el.clientHeight;
	},
	CLEAR_PLAYED: (args, state) => {
		state.played = [];
		dispatch("RENDER");
		const el = document.querySelector(".played-log");
   		el.scrollTop = el.scrollHeight - el.clientHeight;
	},
	PLAY: (args, state) => {
		play(state);
	}
}

const dispatch = (action, args) => {
	if (action in ACTIONS) ACTIONS[action](args, STATE);
	else console.error("Unrecongized action:", action);
}

window.dispatch = dispatch;

dispatch("INIT");

function playSample(name, context, state) {
	const audio = document.querySelector(`#${name}-audio`);
	audio.volume = state.sampleVolume;
	audio.currentTime = 0;
	audio.play();
}


const makeIncluded = (state) => ({ createMuse: createMuse(state.samples.reduce((acc, cur) => {
	acc[cur.name] = (duration, ctx) => playSample(cur.name, ctx, state);
	return acc;
}, {})) })


function play(state) {
	const cm = document.querySelector("#cm");
	const prog = cm.view.state.doc.toString();
	window.localStorage.setItem("muse-prog", prog);

	window.localStorage.setItem("muse-samples", JSON.stringify(state.samples));

	const included = makeIncluded(state);
	const f = new Function(...Object.keys(included), prog)
	const result = new f(...Object.values(included));

	listenBody("keydown", "", (e) => {
		let code = event.code;

		if (code === "Enter" && event.shiftKey) {
			event.preventDefault();
	  		play(state);
		}

		if (e.target.getAttribute("role") === "textbox") return;

		if (code in result) {
			result[code]();
		}

	}, true)

}













