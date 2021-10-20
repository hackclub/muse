import { render } from "https://unpkg.com/lit-html@2.0.1/lit-html.js";
import { delegate } from "./delegate.js";
import { view } from "./view.js";
import { initialSamples } from "./samples.js";
import { init } from "./init.js";
import { play } from "./play.js";

import "./test.js";

const listenBody = delegate(document.body);

const STATE = {
	activeMuses: [],
	samples: initialSamples(),
	recordingStatus: "pre-permission",
	sampleVolume: 0.35,
	rec: undefined,
	played: [],
	keyBindings: {},
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
	STOP: (args, state) => {
		state.activeMuses.forEach( muse => muse.stop() );
		state.activeMuses = [];
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













