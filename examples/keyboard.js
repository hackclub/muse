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

// const KeyA = () => createMuse({ type }).play(`clay`)
// const KeyS = () => createMuse({ type }).play(`bubbles`)
// const KeyD = () => createMuse({ type }).play(`flash1`)
// const KeyF = () => createMuse({ type }).play(`moon`)
// const KeyG = () => createMuse({ type }).play(`pinwheel`)
// const KeyH = () => createMuse({ type }).play(`splits`)
// const KeyJ = () => createMuse({ type }).play(`strike`)
// const KeyK = () => createMuse({ type }).play(`wipe`)
// const KeyL = () => createMuse({ type }).play(`ufo`)

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