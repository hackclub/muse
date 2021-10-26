const key = 4
const type = "triangle" // sine | triangle | square | sawtooth

// a | a# | b | c | c# | d | d# | e | f | f# | g | g#
const q = () => createMuse({ type }).play`a${key}`
const w = () => createMuse({ type }).play`a#${key}`
const e = () => createMuse({ type }).play`b${key}`
const r = () => createMuse({ type }).play`c${key+1}`
const t = () => createMuse({ type }).play`c#${key+1}`
const y = () => createMuse({ type }).play`d${key+1}`
const u = () => createMuse({ type }).play`d#${key+1}`
const i = () => createMuse({ type }).play`e${key+1}`
const o = () => createMuse({ type }).play`f${key+1}`
const p = () => createMuse({ type }).play`f#${key+1}`
const leftBracket = () => createMuse({ type }).play`g${key+1}`
const rightBracket = () => createMuse({ type }).play`g#${key+1}`
const backslash = () => createMuse({ type }).play`a${key+1}`

// these returned s get bound
bindKeys({ 
  q, 
  w,
  e, 
  r,
  t,
  y, 
  u, 
  i, 
  o,
  p,
  "[": leftBracket,
  "]": rightBracket, 
  "\\": backslash
})