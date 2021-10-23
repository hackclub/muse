import { getLetters } from "./letters.js";
import { parse, tokenize } from "./parser.js";
import { compile } from "./compile.js";

const sleep = m => new Promise(r => setTimeout(r, m));

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();


// const test = (str, ...vals) => {
// return str.reduce( 
//   (acc, cur, i) => 
//     i < vals.length 
//       ? acc + cur + vals[i] 
//       : acc + cur, 
//   "")
// }

export const museTag = (strs, ...vals) => { // should be able to insert array of beats
	let result = "";
	let refs = {}; // if val is function store in here
	strs.forEach((str, i) => {
		if (i >= vals.length) result = result + str;
		else {
			const val = vals[i];
			if (typeof val === "function" || Array.isArray(val)) {
				let tempName = `$${i}`;
				refs[tempName] = val;
				result = result + str + tempName; 
			} else {
				result = result + str + val; 
			}
		} 
	})

	const toks = tokenize(result);

	const [ ast, remainder ] = parse(toks);
	console.log(toks)
	const compiled = compile(ast, refs);
	
	return compiled;
	// return compiled.map(x => [ x.value, x.duration ]);
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

	async function run() {
		const arr = museTag(...arguments);
		// const arr = museTag(...arguments).map(({ value, duration }) => [value, duration]);

		playing = true;

		for (let i = 0; i < arr.length; i++) {
			if (playing === false) continue; 
			let [ symbol, beats ] = arr[i];
			dispatch("ADD_PLAYED", { symbol });
			if (symbol === ";") await sleep(60*1000/bpm*beats);
			else if (symbol in samples) samples[symbol](60*1000/bpm*beats, audioCtx);
		}

		playing = false;

		return arr;
	}

	function stop() { playing = false }

	function compile() { return museTag(...arguments) }

	// length, time

	const museObj = { run, stop, compile }

	dispatch("ADD_ACTIVE_MUSE", { newMuse: museObj })

	return museObj;
}


export const createMuse = samples => (ops = {}) => {
	const newMuse = new Muse(samples, ops);
	dispatch("ADD_ACTIVE_MUSE", { newMuse })

	return newMuse;
}











