// time

const muse = createMuseTag({bpm: 200})

const shortenHelper = ({type, value, duration})=>({type,value,duration:duration*.2})
const shorten = group => group.map(shortenHelper)

const compiled = muse.run`
[
e5 c5 ; c5 e5 ; f5 d5 ; g5 e5 ; 
g5 e5 ; d5 f5 ; c5 e5 ; d5 b4 ;
a4 c5 ; a4 c5 ; b4 d5 ; e5 c5 ;
e5 c5 ; b4 d5 ; d5 b4 ;
]

`

// const compiled = muse.compile`
// [a4; a5; a6;] ${[["a4", 2]]}
// `

// [a4; a5; a6;] ${x => x.map( ([val, dur]) => [val, dur*0.3] )}

console.log(compiled)


const key = 4
const type = "triangle" // sine | triangle | square | sawtooth

const a = () => createMuse({ type }).play(`a${key}`)
const s = () => createMuse({ type }).play(`b${key}`)
const d = () => createMuse({ type }).play(`c${key+1}`)
const f = () => createMuse({ type }).play(`d${key+1}`)
const g = () => createMuse({ type }).play(`e${key+1}`)
const h = () => createMuse({ type }).play(`f${key+1}`)
const j = () => createMuse({ type }).play(`g${key+1}`)
const k = () => createMuse({ type }).play(`a${key+1}`)
const l = () => createMuse({ type }).play(`a#${key+1}`)

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