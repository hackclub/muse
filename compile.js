const lengthen = modifier => modifier.value.includes("-") 
	? 1/2**(modifier.value.length)
	: 2**modifier.value.length;

const applyLengthen = (note, modifier) => ({ 
	type: "beat", 
	value: note.value,
	duration: note.duration * lengthen(modifier)
})

const twelveNotes = ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"];
const bindPitch = n => Math.min(Math.max(n, 0), 10);

const shiftHelper = (note, num) => {

	const [symbol] = note.split(/\d+/)
	const number = Number(note.slice(symbol.length));

	if (!twelveNotes.includes(symbol)) return note;

	let finalNote = symbol;
	let steps = 0;

	if (num === 0) return `${finalNote}${number}`;
	else if (num > 0) {
		for (let i = 1; i < num + 1; i++) {
			finalNote = twelveNotes[i % 12];
			if (finalNote === "c") steps++;
		}
	} else {
		for (let i = 1; i > num - 1; i--) {
			finalNote = twelveNotes[(i % 12 + 12) % 12];
			if (finalNote === "b") steps--;
		}
	}

	return `${finalNote}${number + steps}`
}

const shift = (note, modifier, up = true) => ({ 
	type: "beat", 
	value: shiftHelper(note.value, up ? modifier.number : -modifier.number),
	duration: note.duration
})

const repeat = (arr, num) => [].concat(... new Array(num).fill(arr));

const modifiers = {
	"length": (notes, modifier) => Array.isArray(notes) 
			? notes.map(x => applyLengthen(x, modifier)) 
			: applyLengthen(notes, modifier),
	"repeat": (notes, modifier) => repeat(notes, modifier.number),
	"up-shift": (notes, modifier) => Array.isArray(notes) 
			? notes.map(x => shift(x, modifier)) 
			: shift(notes, modifier),
	"down-shift": (notes, modifier) => Array.isArray(notes) 
			? notes.map(x => shift(x, modifier, false)) 
			: shift(notes, modifier, false),
	"<": (notes, modifier) => Array.isArray(notes) 
			? notes.reverse() 
			: notes,
}

const applyModifier = (notes, modifier) => {
	const type = modifier.type;
	if (type in modifiers) return modifiers[type](notes, modifier);
	else throw `Unrecongized modifier: ${modifier}`;
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

const compileNode = node => {
	if (Array.isArray(node)) return compile(node);
	else if (node.type === "symbol" || node.type === ";") return { type: "beat", value: node.value, duration: 1 }
	else if (node.type === "modifier") return node.modifiers.reduce( (acc, cur) => {
			return applyModifier(acc, cur);
		}, compileNode(node.notes))
}

export const compile = ast => {
	let i = 0;
	let result = [];
	while (i < ast.length) {
		let current = ast[i];
		let compiled = compileNode(current);

		if (Array.isArray(compiled)) result.push(...compiled)
		else result.push(compiled);

		i++;
	}

	return result;
}