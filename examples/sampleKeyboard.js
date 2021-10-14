// song goes here
createMuse({ bpm: 110, type: "sin" }).play(
`


`
)


// below maps keys so you can compose
const key = 4
const type = "triangle" // sine | triangle | square | sawtooth

const KeyA = () => createMuse({ type }).play(`clay`)
const KeyS = () => createMuse({ type }).play(`bubbles`)
const KeyD = () => createMuse({ type }).play(`flash1`)
const KeyF = () => createMuse({ type }).play(`moon`)
const KeyG = () => createMuse({ type }).play(`pinwheel`)
const KeyH = () => createMuse({ type }).play(`splits`)
const KeyJ = () => createMuse({ type }).play(`strike`)
const KeyK = () => createMuse({ type }).play(`wipe`)
const KeyL = () => createMuse({ type }).play(`ufo`)

// these returned keys get bound
return { 
  KeyA, 
  KeyS, 
  KeyD, 
  KeyF, 
  KeyG, 
  KeyH, 
  KeyJ, 
  KeyK, 
  KeyL 
}