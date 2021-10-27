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
	showExamples: false,
	examples: [],
	showShared: false,
	colorMode: "light",
}

function copy(str) {
	const inp = document.createElement('input');
	document.body.appendChild(inp);
	inp.value = str;
	inp.select();
	document.execCommand('copy', false);
	inp.remove();
}

const ACTIONS = {
	INIT: init,
	RENDER: (args, state) => { render(view(STATE), document.body) },
	TOGGLE_COLOR_MODE: (args, state) => {
		const setProp = (name, val) => document.documentElement.style.setProperty(name, val);

		let mode = args.mode;
		if (!mode) {
			if (state.colorMode === "dark") mode = "light";
			else if (state.colorMode === "light") mode = "dark";
		}

		if (mode === "dark") {
			setProp("--text-color", "white");
			setProp("--background", "var(--dark-background)");
			setProp("--background-2", "var(--dark-background-2)");
			setProp("--cm-filter", "invert(1)");
		} else if (mode === "light") {
			setProp("--text-color", "black");
			setProp("--background", "var(--light-background)");
			setProp("--background-2", "var(--light-background-2)");
			setProp("--cm-filter", "");
		}

		state.colorMode = mode;
	},
	ADD_ACTIVE_MUSE: ({ newMuse }, state) => {
		state.activeMuses.push(newMuse);
	},
	DELETE_SAMPLE: ({index}, state) => {
		state.samples[index].deleted = true;
		dispatch("RENDER");
	},
	START_RECORDING: (args, state) => {

		state.recordingStatus = "three"
		dispatch("RENDER");

		setTimeout(() => {
				state.recordingStatus = "two"
			dispatch("RENDER");
		}, 1000);

		setTimeout(() => {
			state.recordingStatus = "one"
			dispatch("RENDER");
		}, 2000);

		setTimeout(() => {
			state.rec.start()
			state.recordingStatus = "recording"
			dispatch("RENDER");
		}, 3000);

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
	EXAMPLES: ({ show }, state) => {
		state.showExamples = show;
		dispatch("RENDER");
	},
	LOAD: ({ txt }, state) => {
		const cm = document.querySelector("#cm");
		const prog = cm.view.state.doc.toString();

		cm.view.dispatch({
		  changes: { from: 0, to: prog.length, insert: txt }
		});
	},
	SHARE: (args, state) => {
		const cm = document.querySelector("#cm");
		const prog = cm.view.state.doc.toString();
		const url = 'https://airbridge.hackclub.com/v0.2/Saved%20Projects/Muse%20Projects/?authKey=recgJS1YFxdq7ypts1634664978nkjcc8fdj4';
		(async () => {
  			const res = await fetch(url, {
			    method: "POST",
			    headers: {'Content-Type': 'application/json'},
			    body: JSON.stringify({
			      "Content": prog
			    })
			  }).then(r => r.json())

  			copy(res.fields["Link"]);
  			state.showShared = true;
			dispatch("RENDER");
		})()
		
	},
	PLAY: (args, state) => {
		play(state);
	}
}

const dispatch = (action, args = {}) => {
	if (action in ACTIONS) ACTIONS[action](args, STATE);
	else console.error("Unrecongized action:", action);
}

window.dispatch = dispatch;

dispatch("INIT");













