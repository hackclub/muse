export const defaultProg = `
const KeyA = () => createMuse().play(\`
	[a4 c5 e5;]-x7
\`)

const KeyB = () => createMuse().play(\`
	d4; d5; d6;
\`)

createMuse().play(\`
	c
\`)

return {
	KeyA,
	KeyB
}

`