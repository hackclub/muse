// settings
const type = "sine" // sine | triangle | square | sawtooth | piano | acoustic | edm | organ
const bpm = 120
const muse = createMuse({ type, volume, bpm })

// song goes here
//"a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"
muse.play`

`

// below maps keys sounds
const key = 4

const a = () => muse.play`a${key}`
const s = () => muse.play`b${key}`
const d = () => muse.play`c${key+1}`
const f = () => muse.play`d${key+1}`
const g = () => muse.play`e${key+1}`
const h = () => muse.play`f${key+1}`
const j = () => muse.play`g${key+1}`
const k = () => muse.play`a${key+1}`
const l = () => muse.play`b${key+1}`

// these keys get bound
bindKeys({ 
  a, 
  s, 
  d, 
  f, 
  g, 
  h, 
  j, 
  k, 
  l,
})