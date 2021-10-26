// song goes here
createMuse({ bpm: 120, type: "sine" }).play`




`



// below maps keys so you can compose
const key = 4
const type = "triangle" // sine | triangle | square | sawtooth

const a = () => createMuse({ type }).play`a${key}`
const s = () => createMuse({ type }).play`b${key}`
const d = () => createMuse({ type }).play`c${key+1}`
const f = () => createMuse({ type }).play`d${key+1}`
const g = () => createMuse({ type }).play`e${key+1}`
const h = () => createMuse({ type }).play`f#${key+1}`
const j = () => createMuse({ type }).play`g${key+1}`
const k = () => createMuse({ type }).play`a${key+1}`
const l = () => createMuse({ type }).play`b${key+1}`

// these returned s get bound
bindKeys({ 
  a, 
  s, 
  d, 
  f, 
  g, 
  h, 
  j, 
  k, 
  l 
})