createMuse().play(`
 [bubbles ;+ bubbles ;+] x 10
`,
`
 [ ; flash1 ;+ bubbles ;+ ] x 10
`,
`
[ ;; pinwheel ;; ] x 10
`,
)

const KeyV = () => createMuse().play(`
  g5 ;- g5 ;- g5 ;- g5 ;- e5 ;
  g5 ;- g5 ;- g5 ;- g5 ;- e5 ;- d5 ;- c5 ;
`)

const KeyA = () => createMuse().play(`a4`)
const KeyS = () => createMuse().play(`b4`)
const KeyD = () => createMuse().play(`c5`)
const KeyF = () => createMuse().play(`d5`)
const KeyG = () => createMuse().play(`e5`)
const KeyH = () => createMuse().play(`g5`)
const KeyJ = () => createMuse().play(`a5`)

return { KeyA, KeyS, KeyD, KeyF, KeyG, KeyH, KeyJ, KeyV }

///

// createMuse().play(`
//  [bubbles ;+ bubbles ;+] x 10
// `,
// `
//  [ ; flash1 ;+ bubbles ;+ ] x 10
// `,
// `
// [ ;; pinwheel ;; ] x 10
// `,
// )

const KeyV = () => createMuse().play(`
  g5 ;- g5 ;- g5 ;- g5 ;- e5 ;
  g5 ;- g5 ;- g5 ;- g5 ;- e5 ;- d5 ;- c5 ;
`)

const KeyB = () => createMuse().play(`
  [ [ b4 ;- b4 ;- d5 ;- b4 ;- e5 ;- b4 ;- f#5 ;- b4 ;- ]- ] x 2
  [ [ d5 ;- d5 ;- f#5 ;- d5 ;- g5 ;- d5 ;- a5 ;- d5 ;- ]- ] x 2
  [ [ f#5 ;- f#5 ;- a5 ;- f#5 ;- b5 ;- f#5 ;- a5 ;- f#5 ;- ]- ] x 2
  [ [ e5 ;- e5 ;- f#5 ;- e5 ;- g5 ;- f#5 ;- e5 ;- f#5 ;- ]- ] x 2
`)

const riff = `
  [ [ b4 ;- b4 ;- d5 ;- b4 ;- e5 ;- b4 ;- f#5 ;- b4 ;- ]- ] x 2
  [ [ d5 ;- d5 ;- f#5 ;- d5 ;- g5 ;- d5 ;- a5 ;- d5 ;- ]- ] x 2
  [ [ f#5 ;- f#5 ;- a5 ;- f#5 ;- b5 ;- f#5 ;- a5 ;- f#5 ;- ]- ] x 2
  [ [ e5 ;- e5 ;- f#5 ;- e5 ;- g5 ;- f#5 ;- e5 ;- f#5 ;- ]- ] x 2
`

createMuse({type: "triangle"}).play(
  `${riff}`
  ,
  `[;] x 4 ${riff}`
  ,
  `[;] x 8  ${riff}`
)

const key = 5

const KeyA = () => createMuse().play(`a${key}`)
const KeyS = () => createMuse().play(`b${key}`)
const KeyD = () => createMuse().play(`c${key+1}`)
const KeyF = () => createMuse().play(`d${key+1}`)
const KeyG = () => createMuse().play(`e${key+1}`)
const KeyH = () => createMuse().play(`f#${key+1}`)
const KeyJ = () => createMuse().play(`g${key+1}`)
const KeyK = () => createMuse().play(`a${key+1}`)
const KeyL = () => createMuse().play(`b${key+1}`)

return { KeyA, KeyS, KeyD, KeyF, KeyG, KeyH, KeyJ, KeyV, KeyK, KeyL, KeyB }