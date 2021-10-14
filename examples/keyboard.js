const key = 4

const KeyA = () => createMuse().play(`a${key}`)
const KeyS = () => createMuse().play(`b${key}`)
const KeyD = () => createMuse().play(`c${key+1}`)
const KeyF = () => createMuse().play(`d${key+1}`)
const KeyG = () => createMuse().play(`e${key+1}`)
const KeyH = () => createMuse().play(`f#${key+1}`)
const KeyJ = () => createMuse().play(`g${key+1}`)
const KeyK = () => createMuse().play(`a${key+1}`)
const KeyL = () => createMuse().play(`b${key+1}`)

return { KeyA, KeyS, KeyD, KeyF, KeyG, KeyH, KeyJ, KeyV, KeyK, KeyL }