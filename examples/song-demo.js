// settings
const key = 5
const type = "sine" // sine | triangle | square | sawtooth | piano | acoustic | edm | organ
const volume = 50
const bpm = 120
const muse = createMuse({ type, volume, bpm })

// song goes here
muse.play`
[ [ d4;d4;d4;d4;d4;d4;d4;d4;f4;f4;f4;f4;c4;c4;c4;c4 ] - ] x 10
`

muse.play`
; [ [ d4;d4;d4;d4;d4;d4;d4;d4;f4;f4;f4;f4;c4;c4;c4;c4 ] - ^ 5 ] x 10
`

// organ
// muse.play`
// [ c4 e4 ;- c4 e4 ;- b3 d4 ;- ] x 10

// `

// muse.play`
// a4;e5;-d5;c5;-d5;c5;c5;e5;-d5;-c5]

// `

const riff = `
[ 
  [ [ b4 ;- b4 ;- d5 ;- b4 ;- e5 ;- b4 ;- f#5 ;- b4 ;- ]- ] x 2
  [ [ d5 ;- d5 ;- f#5 ;- d5 ;- g5 ;- d5 ;- a5 ;- d5 ;- ]- ] x 2
]
`
c = compile`${[";", .8]} ${riff} < _ 5`
l = length(c)

// bpm 150
createMuse({type: "acoustic"})
.play
  `[${riff} < _ 5 ${[";", .8]}] x 10`
.play
  `[${[";", .8]} ${riff} < _ 5] x 10`





// below maps keys sounds
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