import { getLetters } from "./letters.js";
import { parse, tokenize } from "./parser.js";
import { compile } from "./compile.js";

const sleep = m => new Promise(r => setTimeout(r, m));

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

class Muse {
	constructor(samples, { bpm, volume, synthOptions }) {
		bpm = bpm ?? 110;
		volume = volume ?? 100;
		// const AudioContext = window.AudioContext || window.webkitAudioContext;
		// this.audioCtx = new AudioContext();
		this.audioCtx = audioCtx;
		this.bpm = bpm;
		this.volume = volume;
		// asdr

		this.samples = { ...samples, ...getLetters(synthOptions) };
	}

	async play(prog) {
		const toks = tokenize(prog);
		console.log("tokens:\n", toks)
		const [ ast, remainder ] = parse(toks);
		console.log("ast:\n", ast);
		console.log("remainder:\n", remainder);
		
		const result = compile(ast);
		console.log(result);

		for (let i = 0; i < result.length; i++) {
		  let [ symbol, beats] = result[i];
		  if (symbol === ";") await sleep(60*1000/this.bpm*beats);
		  else if (symbol in this.samples) this.samples[symbol](60*1000/this.bpm*beats, this.audioCtx);
		}

		return this;
	}

	stop() {

	}
}


export const createMuse = samples => (ops = {}) => {
	const newMuse = new Muse(samples, ops);
	// dispatch("ADD_ACTIVE_MUSE", { newMuse })

	return newMuse;
}











