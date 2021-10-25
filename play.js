import { createMuse, compile, length } from "./createMuse.js";

function playSample(name, context, state) {
	const audio = document.querySelector(`#${name}-audio`);
	audio.volume = state.sampleVolume;
	audio.currentTime = 0;
	audio.play();
}

const createSamples = state => state.samples.reduce((acc, cur) => {
	acc[cur.name] = (duration, ctx) => playSample(cur.name, ctx, state);
	return acc;
}, {})


const bindKeys = state => obj => {
	state.keyBindings = obj;
}

const makeIncluded = (state) => ({ 
	// createMuse: createMuse(state),
	compile,
	length, 
	bindKeys: bindKeys(state), 
	createMuse: createMuse(createSamples(state)) 
});

export function play(state) {
	const cm = document.querySelector("#cm");
	const prog = cm.view.state.doc.toString();

	window.localStorage.setItem("muse-samples", JSON.stringify(state.samples));

	const included = makeIncluded(state);
	const f = new Function(...Object.keys(included), prog)
	const result = new f(...Object.values(included));
}
