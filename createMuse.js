import { getLetters } from "./letters.js";
import { parse, tokenize } from "./parser.js";
import { compile as compileTemp } from "./compile.js";

const sleep = m => new Promise(r => setTimeout(r, m));

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const museTag = (strs, ...vals) => {
	let result = "";
	let refs = {};
	strs.forEach((str, i) => {
		if (i >= vals.length) result = result + str;
		else {
			const val = vals[i];
			if (typeof val === "function") {
				let tempName = `$f${i}`;
				refs[tempName] = val;
				result = result + str + tempName; 
			} else if (Array.isArray(val)) {
				let tempName = `$a${i}`;
				refs[tempName] = val;
				result = result + str + tempName; 
			} else if (typeof val === "string" || typeof val === "number") {
				result = result + str + val; 
			} else {
				console.error("Unexpected interpolated value:", val);
			}
		} 
	})

	// console.log(result);

	const toks = tokenize(result);
	// console.log(toks);

	const [ ast, remainder ] = parse(toks);
	// console.log(ast);
	const compiled = compileTemp(ast, refs);
	// console.log(compiled);
	return compiled;
}

async function playHelper(that, args) {
	const arr = museTag(...args);

	that.playing = true;

	for (let i = 0; i < arr.length; i++) {
		if (that.playing === false) continue; 
		let [ symbol, beats ] = arr[i];
		if (window.IS_MUSE_EDITOR) dispatch("ADD_PLAYED", { symbol });
		if (symbol === ";") await sleep(1000/that.bpm*60*beats);
		else if (symbol in that.samples) that.samples[symbol](60*1000/that.bpm*beats, audioCtx);
	}

	that.playing = false;
}

export class Muse {
	constructor(ops = {}) {
		this.bpm = ops.bpm ?? 110;
		this.volume = ops.volume ?? 100; // TODO

		const type = ops.type ?? "sine";
		const synthOptions = { type, volume: this.volume };
		const samples = ops.samples ?? {};

		this.samples = { ...samples, ...getLetters(synthOptions) };
		this.playing = false;
	}

	play() {
		playHelper(this, arguments)

		return this; // arr?
	}


	stop() {
		this.playing = false;
	}

}

const createMuse = (samples = {}) => (ops = {}) => {
	ops.samples = samples;
	const newMuse = new Muse(ops);
	if (window.IS_MUSE_EDITOR) dispatch("ADD_ACTIVE_MUSE", { newMuse })

	return newMuse;
}

const length = x => x.reduce((acc, cur) => acc + (cur[0] == ";" ? cur[1] : 0), 0)
const compile = (...args) => museTag(...args);


export { createMuse, compile, length };










