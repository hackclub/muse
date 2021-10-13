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

export const compile = ast => {
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