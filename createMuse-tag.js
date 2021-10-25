import { getLetters } from "./letters.js";
import { parse, tokenize } from "./parser.js";
import { compile } from "./compile.js";

const sleep = m => new Promise(r => setTimeout(r, m));

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

export const museTag = (strs, ...vals) => { // should be able to insert array of beats
	let result = "";
	let refs = {}; // if val is function store in here
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

	console.log(result);

	const toks = tokenize(result);
	console.log(toks);

	const [ ast, remainder ] = parse(toks);
	console.log(ast);
	const compiled = compile(ast, refs);
	console.log(compiled);
	return compiled;
}

export const createMuseTag = samples => (ops = {}) => {	
	const bpm = ops.bpm ?? 110;
	const volume = ops.volume ?? 100; // TODO
	const type = ops.type ?? "sine";

	const synthOptions = { type }

	// const AudioContext = window.AudioContext || window.webkitAudioContext;
	// this.audioCtx = new AudioContext();

	// asdr

	samples = { ...samples, ...getLetters(synthOptions) };

	let playing = false;

	async function play() { // run vs play?
		const arr = museTag(...arguments);
		// const arr = museTag(...arguments).map(({ value, duration }) => [value, duration]);

		playing = true;

		for (let i = 0; i < arr.length; i++) {
			if (playing === false) continue; 
			let [ symbol, beats ] = arr[i];
			dispatch("ADD_PLAYED", { symbol });
			if (symbol === ";") await sleep(1000/bpm*60*beats);
			else if (symbol in samples) samples[symbol](60*1000/bpm*beats, audioCtx);
		}

		// playing = false; // leave this out to call muse multiple times, stop is just a force stop

		return arr;
	}

	function stop() { playing = false }

	function compile() { return museTag(...arguments) }

	// length, time

	const museObj = { play, stop, compile }

	dispatch("ADD_ACTIVE_MUSE", { newMuse: museObj })

	return museObj;
}


export const createMuse = samples => (ops = {}) => {
	const newMuse = new Muse(samples, ops);
	dispatch("ADD_ACTIVE_MUSE", { newMuse })

	return newMuse;
}

const length = x => x.reduce((acc, cur) => acc + (cur[0] == ";" ? cur[1] : 0), 0)












