import { getLetters } from "./letters.js";
import { parse, tokenize } from "./parser.js";
import { compile } from "./compile.js";

const sleep = m => new Promise(r => setTimeout(r, m));

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

class Muse {
	constructor(samples, { bpm, volume, type }) {
		bpm = bpm ?? 110;
		volume = volume ?? 100; // TODO
		type = type ?? "sine";
		const synthOptions = { type }
		// const AudioContext = window.AudioContext || window.webkitAudioContext;
		// this.audioCtx = new AudioContext();
		this.audioCtx = audioCtx;
		this.bpm = bpm;
		this.volume = volume;
		// asdr

		this.samples = { ...samples, ...getLetters(synthOptions) };

		this.playing = [];
	}

	play(...progs) {


		progs.map((prog, i) => {
			this.playing[i] = true;
			play(prog, i, this)
		});


		return this;
	}

	stop() {
		this.playing.forEach((x, i) => {
			this.playing[i] = false;
		})
	}
}

async function play(prog, index, that) {
	const toks = tokenize(prog);
	console.log("tokens:\n", toks)
	const [ ast, remainder ] = parse(toks);
	console.log("ast:\n", ast);
	console.log("remainder:\n", remainder);
	
	const result = compile(ast).map(x => [ x.value, x.duration ]);
	console.log(result);

	for (let i = 0; i < result.length; i++) {
		if (that.playing[index] === false) continue; 
		let [ symbol, beats] = result[i];
		dispatch("ADD_PLAYED", { symbol });
		if (symbol === ";") await sleep(60*1000/that.bpm*beats);
		else if (symbol in that.samples) that.samples[symbol](60*1000/that.bpm*beats, that.audioCtx);
	}

	that.playing[index] = false;

	return that;
}


export const createMuse = samples => (ops = {}) => {
	const newMuse = new Muse(samples, ops);
	dispatch("ADD_ACTIVE_MUSE", { newMuse })

	return newMuse;
}











