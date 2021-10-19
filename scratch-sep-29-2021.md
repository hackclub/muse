// song goes here
// createMuse({ bpm: 100, type: "sine" }).play(
// `
//   a4 ;- b4 ;- c5
// `,
// `
//   c5 ;- d5 ;- e5
// `
// )

// ^ shift octave

// createMuse({ bpm: 100, type: "sine" }).play(
// `
//   a4 ;- b4 ;- c5 
// `,
// `
//  [ a4 ;- b4 ;- c5 ] ^ 1
// `
// )

createMuse({ bpm: 100, type: "sine" }).play("a4 c5 ; b4 d5 ; c5 e5")
// a4 c5 ; b4 d5 ; c5 e5
// a4 {^1} ; b4 {^1} ; c5 {^1}

//below maps keys so you can compose
key = 4
type = "triangle" // sine | triangle | square | sawtooth

a = () => createMuse({ type }).play(`a${key}`)
s = () => createMuse({ type }).play(`b${key}`)
d = () => createMuse({ type }).play(`c${key+1}`)
f = () => createMuse({ type }).play(`d${key+1}`)
g = () => createMuse({ type }).play(`e${key+1}`)
h = () => createMuse({ type }).play(`f${key+1}`)
j = () => createMuse({ type }).play(`g${key+1}`)
k = () => createMuse({ type }).play(`a${key+1}`)
l = () => createMuse({ type }).play(`b${key+1}`)

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

reflect notes
slide
glide
offset
repeat
reverse


log pauses into console
fix overload audio bug
add other instrument waveforms
make intro video
make sharing site
time how long section takes so you can play after
adjust volume

multiple tracks?




bug

; x 4 fails


// https://www.google.com/search?q=note+frequency+chart&sxsrf=AOaemvKG6SCFR2ruFdEKYGq1pm6PxpitJg:1632850737102&tbm=isch&source=iu&ictx=1&fir=AhFnzq-f3c0WjM%252CLstW4q-3PfXraM%252C_%253B7vgWxzyXPVj48M%252CPqtZQjqKQnoeGM%252C_%253B5ocRy-vjOognJM%252CluDsl3gAlXaWAM%252C_%253B4pmdoRIMmNH05M%252CL-NnW0qsTaBOtM%252C_%253B9w1Cv1irDiHiOM%252CwR2NZpb62u0BbM%252C_%253BKk4bGu4AKVD3BM%252CJXeFIodjyDvuDM%252C_%253Bzfg8LxzKJS3JMM%252CLstW4q-3PfXraM%252C_%253ByGc-0mYKPUus9M%252C6f_97sxBUyCKcM%252C_%253Bv6Dci4dmwtInnM%252CjM1jNvtQfOtpQM%252C_%253BXC1dYBjZkGiI_M%252CFEUrsNoEJoTCdM%252C_%253BilvAst15XR3LjM%252Cnisd_luyJKn9zM%252C_%253BkF5mKgMg5n4SKM%252CzjnUcN_x9AQwvM%252C_%253BwocSq-Avd0xGTM%252CL-NnW0qsTaBOtM%252C_%253BsJcJBsQEHGZg8M%252CwD-3NW4Pr5S3kM%252C_&vet=1&usg=AI4_-kSoXJMFaknXQhihsmk7J0H8dj8ohw&sa=X&ved=2ahUKEwiyqp-Bm6LzAhULFlkFHQXeDE0Q9QF6BAgdEAE&biw=1353&bih=796&dpr=2#imgrc=7vgWxzyXPVj48M
// pitch
// us: a4
// ABC: A, A a a'

for 10 {
  (g3 e4) 
  d4 
  c4 
  d4 
  c4 
  a3 
  a3 
  g3
  sleep 3
}

// envelope control
attack
sustain
release
// delay
decay
levels

// loudness
synth options
amp
pan

// threads

// chords

numerical controls for scales
a3 - 10 is what?



thread \ => for 4 do // loop == for infinity
  a:f:f { decay = 10, attack = 3  } 
  a:f:f { amp = 10, attack = 3  } 
  sleep 3
  d:d:f3 { sustain = 10, release = 3  } 
  d:f3:a2 { sustain-level = 10, release = 3  }
  d:f3:a2 { attack-level = 10, decay-level = 3  }
end

thread do for 4 do // loop == for infinity
  play :a:f:f { decay: 10/2, attack: 3 } 
  a:f:f { amp: 10, attack: 3 } 
  sleep 3
  d:d:f3 { sustain: 10, release: 3 } 
  d:f3:a2 { sustain-level: 10, release: 3 }
  d:f3:a2 { attack-level: 10, decay-level: 3 }
end end

variables 
=

functions 
\ args =>

blocks 
{} or do ... end

dicts 
#[]

array 
[]

loop 
for num | [] as name block

math 
+ - / * % ^

falsy is "", 0, or nil
truthy is anything else

nil

call function
func var0 var1


this is becoming like all the other languages what if it's just a substitution system


<!-- a note -->
a3

<!-- a block -->
section = [
  a4:a3:a2
  f3:a4:a2
]

<!-- a repeat -->
repeat 3 [
  a4:a3:a2 { amp: count }
  f3:a4:a2 { amp: count }
]

if true then [] else []

// maybe options lik { amp } should be piece settings


a3

section = [
  a4:a3:a2
  f3:a4:a2
]

repeat 3 [
  a4:a3:a2 { amp: count }
  f3:a4:a2 { amp: count }
  sleep 0.3

  <!-- or -->

  a4:a3:a2
  amp count

]

if true then [] else []

thread

forever, loop

how should i do pauses

should list of notes play with some tempo or just all at once

<!-- sonic pi -->
play :e3
sleep 0.4
play :e3
sleep 0.4
play :e3
sleep 0.4
play :e3
sleep 0.4

<!-- abcnotation-ish -->
tempo 4/4
e3 e3 e3 e3 e3 e3 e3 e3

how do you know when note is shorter or longer? bars? fractional notes (half, quarter)

sonic pi is more explicity but abcnotation can match music notation
want to learn more about tempo in typical music notations (like sheet music or these
ascii music notations)


comma or other punc could be the pause
e3 g4 g2, e3, e3, e3, e3, e3, e3, e3

or

e3 g4 g2 ; e3 ; e3 ; e3 ; e3 ; e3 ; e3 ; e3

then fractions could be , and ' or _ -
or + -

++(e3 g4 g2) ++; ++e3 -; +e3 ; d4

(e3 g4 g2)++ ;+ e3+ ;- e3+ ; d4

parens are so ++ is applied to all notes

interpolated js
{ ...js... }


////////////////////

oct. 8 2021

notes

a5

pauses

;

loops

loop 4 a4

threads

thread []

+ longer
- shorter


# A Music Language, maybe

# Objectives

- Make a social computing activity
  - music naturally engages other people
  - people can play together
- Motivate computational/programmatic ideas from familiar concepts
  - i.e. want to loop arises naturally when trying to make songs
- Make sweet intro demo for club opener

# TODO

- [] add sample collection
- [] add list of active muses which you can stop
- [] set base tempo
- [] add muse methods
  - [] wait
  - [] start
  - [] stop
- [] why does it stop working after too many calls
- [] adding left recursion?
- [] add loops
- [] js interpolation
- [] set envelope qualities
- [x] pauses
- [] tempo
- [x] threads
- [x] a better editor
  - [] syntax highlighting
- [] realtime controls/instruments
- [] add h note for arbitrary hz value

# Thanks to

- Tevan
- Lux for helping make the sound prettier by eliminating the ugly clicking noise

# Notes

- Instead of adding js interpolation to program, make interpreter for tagged template literal
- should repeat with x work both ways, 3 x a4 == a4 x 3
  - latter of the two could be slightly ambigious as to whether it's repeat 3 more times or repeat 3 times total
- unpitched rythmic component
  - drums have sharp decay and fast attack 

# Links

- https://en.wikipedia.org/wiki/Envelope_(music)


- link to instruments that hack clubbers made for noodling












