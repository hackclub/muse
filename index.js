import { render } from "https://unpkg.com/lit-html@2.0.1/lit-html.js";
import { delegate } from "./delegate.js";
import { createMuse } from "./Muse.js";
import { view } from "./view.js";

const STATE = {
	activeMuses: []
}

const ACTIONS = {
	INIT: (args, state) => {},
	RENDER: (args, state) => {},
	ADD_ACTIVE_MUSE: ({ newMuse }, state) => {
		state.activeMuses.push(newMuse);
	}
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


initSamples()
















