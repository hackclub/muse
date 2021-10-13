import { letters } from "./letters.js";
import { parse, tokenize } from "./parser.js";
import { compile } from "./compile.js";

let samples = {
	"piano": (duration, ctx) => playSample("sample", duration, ctx),
	...letters
}

let oneBeat = 600; // 60*1000/bpm

const sleep = m => new Promise(r => setTimeout(r, m));

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

class Muse {
	constructor() {
		// const AudioContext = window.AudioContext || window.webkitAudioContext;
		// this.audioCtx = new AudioContext();
		this.audioCtx = audioCtx;
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
		  if (symbol === ";") await sleep(oneBeat*beats);
		  else if (symbol in samples) samples[symbol](oneBeat*beats, this.audioCtx);
		}

		return this;
	}

	stop() {

	}
}


export const createMuse = () => {
	const newMuse = new Muse();
	// dispatch("ADD_ACTIVE_MUSE", { newMuse })

	return newMuse;
}

export function playSample(id, context) {
	const audio = document.querySelector(`#${id}`);
	// const source = context.createMediaElementSource(audio);
 //    var g = context.createGain()
 //    source.connect(g)
 //    g.connect(context.destination)
 //    source.start()
 //    g.gain.setValueAtTime(0, context.currentTime);
 //    g.gain.linearRampToValueAtTime(.2, context.currentTime + 0.1);
 //    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration/1000)


	audio.currentTime = 0;
	audio.play();
}











