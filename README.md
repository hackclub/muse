# 🎸 Muse: a simple language for jamming!

**[Launch the Muse Editor →](https://hackclub.github.io/muse/)**

Muse is a simple language embedded in a JavaScript environment.

To create a song create a muse and pass in your code.

```js
createMuse().play`a4+ ;- [ c5 ; e5 ] x 4`
```

The language has notes: `a`, `a#`, `b`, `c`, `c#`, `d`, `d#`, `e`, `f`, `f#`, `g` & `g#`  with an optional number suffix (from `1` to `10`) for pitch. For example:

```
a4
```

You can lengthen notes by appending a `+`:

```
a4+
a4++
a4+++
```

or shorten them by appending a `-`:

```
a4-
a4--
a4---
```

Each `+` or `-` corresponds to a power of 2.

A pause is `;` which can also be lengthened or shortened.

So an arpeggio is:

```
a4 ; c5 ; e5
```

And a chord is:

```
a4 c5 e5
```

A group is denoted with brackets `[ ]`:

```
[ a4 c5 e5 ]++
```

To repeat something use `x` and some number:

```
[ a4 c5 e5 ; ] x 4
```

`createMuse` also takes some optional arguments for beats per minute and wave type:

```js
createMuse({ bpm: 10, type: "sine" }) // type can be sine | sawtooth | triangle | square
```

You can also use samples that are listed to the right of the editor:

```js
createMuse().play`bubbles ; bubbles -`
```

To play multiple tracks just call play multiple times:

```js
const muse = createMuse()
muse.play`[ a4 ; e4 ; d5 ; ]`
muse.play`[ a5 ; e5 ; d6 ; ]`
```

Offset notes up by half steps with a `^`:

```js
const muse = createMuse()
muse.play`[ a4 ; e4 ; d5 ; ]`
muse.play`[ a4 ; e4 ; d5 ; ] ^ 3`
```

Offset notes down by half steps with a `_`.

```js
const muse = createMuse()
muse.play`[ a4 ; e4 ; d5 ; ]`
muse.play`[ a4 ; e4 ; d5 ; ] _ 3`
```

You can also bind functions to keys with the `bindKey` function. The key will correspond to the `keydown` event key and the value to the callback function.

Here is an example keyboard with the `bindKey` function:

```js
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
  l 
})
```

The console on the right of the editor just logs whatever was played.

If the playback is becoming choppy, just refresh the browser. Your current project won't be deleted. 


## Advanced

Create your own custom modifier by interpolating in a function:

```js
const muse = createMuse();
muse.play`[ a4 ; e4 ; d5 ; ]  ${x => x.reverse()}`
```

The function will be called with the preceding notes in a compiled array form: `[symbol, beats]`.

An array in this form can be returned or passed in directly.

This custom modifier with shorten pauses and lengthen other notes:

```js
const customModifier = x => x.map( ([sym, dur]) => sym === ";" 
  ? [sym, dur * .2] 
  : [sym, dur * 2]
)

createMuse().play`
  [ a4 ; e4 ; d5 ; c5 ; e4 ; d5 ; ] ${customModifier}
`
```

## Importing Muse

The `Muse` class can be imported through modules. For example:

```js
import { Muse } from "https://muse.hackclub.dev/exports.js";
import confetti from 'https://cdn.skypack.dev/canvas-confetti';

const samples = {
  "confetti": (ctx, duration) => confetti()
}
const muse = new Muse({ samples });
muse.play`
  a4; c5 confetti; e5;
  confetti ;
`
```

## Acknowledgements

Code editor created using the amazing [CodeMirror](https://codemirror.net/).

Audio samples come from [Patatap](https://www.patatap.com/), a delightful interactive art piece.
