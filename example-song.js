const v = () => createMuse().play(`
  g5 ;- g5 ;- g5 ;- g5 ;- e5 ;
  g5 ;- g5 ;- g5 ;- g5 ;- e5 ;- d5 ;- c5 ;
`)

const b = () => createMuse().play(`
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

const a = () => createMuse().play(`a${key}`)
const s = () => createMuse().play(`b${key}`)
const d = () => createMuse().play(`c${key+1}`)
const f = () => createMuse().play(`d${key+1}`)
const g = () => createMuse().play(`e${key+1}`)
const h = () => createMuse().play(`f#${key+1}`)
const j = () => createMuse().play(`g${key+1}`)
const k = () => createMuse().play(`a${key+1}`)
const l = () => createMuse().play(`b${key+1}`)

return { a, s, d, f, g, h, j, k, l, v, b }