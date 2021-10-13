import "https://leomcelroy.com/widgets/code-mirror.js"
import { parse, tokenize } from "./parser.js";
import { start } from "./synth.js";

document.body.innerHTML = `
	<style>
		.cm-wrap { 
			min-height: max-content; 
			border: 1px solid #ddd;
	    	resize: vertical;
	    	overflow: auto;
		}
		.cm-scroller { overflow: auto; }
		.ͼd {
			color: #973e1b;
		}

		.ͼl {
		   	color: #a1a09f;
		}

		.button-container {
			width: 100%;
			display: grid;
			place-content: center;
		}

		.trigger-play {
			width: 100%;
    		margin: 5px;
		}
	</style>

	<code-mirror id="cm"></code-mirror>
	<div class="button-container">
		<button class="trigger-play">play/attach</button>
	</div>
`

const trigger = e => e.composedPath()[0];
const matchesTrigger = (e, selectorString) => trigger(e).matches(selectorString);
// create on listener
const createListener = (target) => (eventName, selectorString, event, remove = false) => { // focus doesn't work with this, focus doesn't bubble, need focusin
	if (target.getAttribute(eventName) === "true" && remove) {
		console.log("removing old listeners")
		target.listeners.forEach( e => target.removeEventListener(eventName, e) );
	} else {
		target.setAttribute(eventName, "true");
	}

	const func = (e) => {
		e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
		if (selectorString === "" || matchesTrigger(e, selectorString)) event(e);
	}

	target.addEventListener(eventName, func)

	target.listeners = target.listeners ? [ ...target.listeners, func ] : [ func ];

}

const listenBody = createListener(document.body);

const lengthen = modifier => modifier.value.includes("-") 
	? 1/2**(modifier.value.length)
	: 2**modifier.value.length;

const applyLengthen = (note, modifier) => [note[0], note[1] * lengthen(modifier)]

const repeat = (arr, num) => [].concat(... new Array(num).fill(arr));

const applyModifier = (notes, modifier) => {
	if (modifier.type === "length") {
		return Array.isArray(notes[0]) ? notes.map(x => applyLengthen(x, modifier)) : applyLengthen(notes, modifier);
	} else if (modifier.type === "repeat") {
		return repeat(notes, modifier.number);
	}
}

const compileNode = node => {
	if (Array.isArray(node)) return compile(node);
	else if (node.type === "symbol" || node.type === ";") return [ node.value, 1 ]
	else if (node.type === "modifier") return applyModifier(compileNode(node.notes), node.modifier)
}

const compile = ast => {
	let i = 0;
	let result = [];
	while (i < ast.length) {
		let current = ast[i];
		let compiled = compileNode(current);

		if (Array.isArray(compiled[0])) result.push(...compiled)
		else result.push(compiled);

		i++;
	}

	return result;
}

class Muse {
	constructor() {}

	play(prog) {
		const toks = tokenize(prog);
		console.log("tokens:\n", toks)
		const [ ast, remainder ] = parse(toks);
		console.log("ast:\n", ast);
		console.log("remainder:\n", remainder);
		
		const result = compile(ast);
		console.log(result);
		start(result);

		return this;
	}
}

const muse = () => new Muse();

let letters = {
	"c": 16.35,
	"c#": 17.32,
	"d": 18.35,
	"d#": 19.45,
	"e": 20.6,
	"f": 21.83,
	"f#": 23.12,
	"g": 24.5,
	"g#": 25.96,
	"a": 27.5,
	"a#": 29.14,
	"b": 30.87,
}

const included = {
	parse,
	tokenize,
	muse,
	start
}

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
	const f = new Function(...Object.keys(included), prog)
	const result = f(...Object.values(included));
	console.log("Attaching keys:", result);

	listenBody("keydown", "", (e) => {

		if (e.target.getAttribute("role") === "textbox") return;
		let code = event.code;

		if (code in result) {
			result[code]();
		} else if (code === "Enter" && event.shiftKey) {
			event.preventDefault();
	  		
	  		play();
		}

	}, true)

}

const prog = `
const KeyA = () => muse().play(\`
	[a4 c5 e5;]x7
\`)

// const KeyB = () => muse().play(\`
// 	d4; d5; d6;
// \`)

return {
	KeyA,
// 	KeyB
}

// muse().play(\`
// 	[a4 c5 e5;]x7
// \`)

// return {}
`

// muse().play(prog);

const toks = tokenize("d4+");
console.log("tokens:\n", toks)
const [ ast, remainder ] = parse(toks);
console.log("ast:\n", ast);
console.log("remainder:\n", remainder);

const result = compile(ast);
console.log(result);

document.querySelector("#cm").view.dispatch({
  changes: { from: 0, insert: prog.trim() }
});

















