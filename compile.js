const lengthen = modifier => modifier.value.includes("-") 
	? 1/2**(modifier.value.length)
	: 2**modifier.value.length;

const applyLengthen = (note, modifier) => ({ 
	type: "beat", 
	value: note[0],
	duration: npte[1] * lengthen(modifier)
})

const twelveNotes = ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"];
const bindPitch = n => Math.min(Math.max(n, 0), 10);

const shiftHelper = (note, num) => {

	const [symbol] = note.split(/\d+/)
	const number = Number(note.slice(symbol.length));

	if (!twelveNotes.includes(symbol)) return note;

	let finalNote = symbol;
	let steps = 0;
	let currentIndex = twelveNotes.indexOf(symbol);

	if (num === 0) return `${finalNote}${number}`;
	else if (num > 0) {
		for (let i = 1; i < num + 1; i++) {
			finalNote = twelveNotes[(i + currentIndex)  % 12];
			if (finalNote === "c") steps++;
		}
	} else {
		for (let i = -1; i > num - 1 ; i--) {
			finalNote = twelveNotes[((i + currentIndex) % 12 + 12) % 12];
			if (finalNote === "b") steps--;
		}
	}

	const pitch = bindPitch(number + steps);

	return `${finalNote}${pitch}`
}

const shift = (note, modifier, up = true) => ({ 
	type: "beat", 
	value: shiftHelper(note[0], up ? modifier.number : -modifier.number),
	duration: note[1]
})

const repeat = (arr, num) => [].concat(... new Array(num).fill(arr));

const isBeat = (node) => {
	if (!Array.isArray(node)) return false;

	const [ symbol, duration ] = node;
	return typeof symbol === "string" && typeof duration === "number";
}

const modifiers = {
	"length": (notes, modifier) => !isBeat(notes) && Array.isArray(notes) 
			? notes.map(x => applyLengthen(x, modifier)) 
			: applyLengthen(notes, modifier),
	"repeat": (notes, modifier) => repeat(notes, modifier.number),
	"up-shift": (notes, modifier) => !isBeat(notes) && Array.isArray(notes) 
			? notes.map(x => shift(x, modifier)) 
			: shift(notes, modifier),
	"down-shift": (notes, modifier) => !isBeat(notes) && Array.isArray(notes) 
			? notes.map(x => shift(x, modifier, false)) 
			: shift(notes, modifier, false),
	"<": (notes, modifier) => !isBeat(notes) && Array.isArray(notes) 
			? notes.reverse() 
			: notes,
}



const applyModifier = (notes, modifier, refs) => {
	const type = modifier.type;
	if (type in modifiers) return modifiers[type](notes, modifier);
	else if (type === "reference") {
		const ref = refs[modifier.value];
		const refType = 
			Array.isArray(ref) ? "array" 
			: typeof ref === "function" ? "function"
			: "unexpected";

		const switchOps = {
			"function": ref => ref(Array.isArray(notes) ? notes : [notes]),
			"array": ref => Array.isArray(notes) ? [...notes, ...ref] : [notes, ...ref]
		}
		if (!(refType in switchOps)) throw "Unexpected interpolated value."
		return switchOps[refType](ref);

	} else throw `Unrecongized modifier: ${modifier}`;
}

// const applyModifier = (notes, modifier) => {
// 	if (modifier.type === "length") {
// 		return Array.isArray(notes) 
// 			? notes.map(x => applyLengthen(x, modifier)) 
// 			: applyLengthen(notes, modifier);
// 	} else if (modifier.type === "repeat") {
// 		return repeat(notes, modifier.number);
// 	}
// }

const compileNode = (node, refs) => {
	// if (isBeat(node)) return { type: "beat", value: node[0], duration: node[1] };
	if (!isBeat(node) && Array.isArray(node)) return compile(node, refs);
	// else if (node.type === "symbol" || node.type === ";") return { type: "beat", value: node.value, duration: 1 }
	else if (node.type === "symbol" || node.type === ";") return [ node.value, 1 ]
	else if (node.type === "modifier") return node.modifiers.reduce( (acc, cur, i) => {
			return applyModifier(acc, cur, refs);
		}, compileNode(node.notes, refs))
}

export const compile = (ast, refs = {}) => {
	const result = [];
	ast.forEach(item => {
		const val = compileNode(item, refs);

		if (!isBeat(val) && Array.isArray(val)) {
		  result.push(...val);
		} else {
		  result.push(val);
		}
	});

	return result;
}





