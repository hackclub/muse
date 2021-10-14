export const defaultProg = `
// song goes here
createMuse({ bpm: 110, type: "sin" }).play(
`


`
)


// below maps keys so you can compose
const key = 4
const type = "triangle" // sine | triangle | square | sawtooth

const KeyA = () => createMuse({ type }).play(`a${key}`)
const KeyS = () => createMuse({ type }).play(`b${key}`)
const KeyD = () => createMuse({ type }).play(`c${key+1}`)
const KeyF = () => createMuse({ type }).play(`d${key+1}`)
const KeyG = () => createMuse({ type }).play(`e${key+1}`)
const KeyH = () => createMuse({ type }).play(`f#${key+1}`)
const KeyJ = () => createMuse({ type }).play(`g${key+1}`)
const KeyK = () => createMuse({ type }).play(`a${key+1}`)
const KeyL = () => createMuse({ type }).play(`b${key+1}`)

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

`