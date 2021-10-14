createMuse().play(`
 [bubbles ;+ bubbles ;+] x 10
`,
`
 [ ; flash1 ;+ bubbles ;+ ] x 10
`,
`
[ ;; pinwheel ;; ] x 10
`,
)

const KeyV = () => createMuse().play(`
  g5 ;- g5 ;- g5 ;- g5 ;- e5 ;
  g5 ;- g5 ;- g5 ;- g5 ;- e5 ;- d5 ;- c5 ;
`)

const KeyA = () => createMuse().play(`a4`)
const KeyS = () => createMuse().play(`b4`)
const KeyD = () => createMuse().play(`c5`)
const KeyF = () => createMuse().play(`d5`)
const KeyG = () => createMuse().play(`e5`)
const KeyH = () => createMuse().play(`g5`)
const KeyJ = () => createMuse().play(`a5`)

return { KeyA, KeyS, KeyD, KeyF, KeyG, KeyH, KeyJ, KeyV }