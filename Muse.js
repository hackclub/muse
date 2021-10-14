import { getLetters } from "./letters.js";
import { parse, tokenize } from "./parser.js";
import { compile } from "./compile.js";

const sleep = m => new Promise(r => setTimeout(r, m));

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

class Muse {
	constructor(samples, { bpm, volume, type }) {
		bpm = bpm ?? 110;
		volume = volume ?? 100;
		type = type ?? "sine";
		const synthOptions = { type }
		// const AudioContext = window.AudioContext || window.webkitAudioContext;
		// this.audioCtx = new AudioContext();
		this.audioCtx = audioCtx;
		this.bpm = bpm;
		this.volume = volume;
		// asdr

		this.samples = { ...samples, ...getLetters(synthOptions) };

		// this.current = null;
	}

	play(...progs) {
		// (async () => {
		// 	console.log(this.current);
		// 	if (this.current !== null) {
		// 		await this.current;
		// 		this.current = null;
		// 	}

		// 	console.log(this.current);

		// 	this.current = Promise.all([ progs.map(prog => play(prog, this)) ]);
		// })()

		progs.map(prog => play(prog, this));

		return this;
	}

	stop() {

	}
}

async function play(prog, that) {
	const toks = tokenize(prog);
	console.log("tokens:\n", toks)
	const [ ast, remainder ] = parse(toks);
	console.log("ast:\n", ast);
	console.log("remainder:\n", remainder);
	
	const result = compile(ast).map(x => x.value);
	console.log(result);

	for (let i = 0; i < result.length; i++) {
	  let [ symbol, beats] = result[i];
	  if (symbol === ";") await sleep(60*1000/that.bpm*beats);
	  else if (symbol in that.samples) that.samples[symbol](60*1000/that.bpm*beats, that.audioCtx);
	}

	return that;
}


export const createMuse = samples => (ops = {}) => {
	const newMuse = new Muse(samples, ops);
	// dispatch("ADD_ACTIVE_MUSE", { newMuse })

	return newMuse;
}











