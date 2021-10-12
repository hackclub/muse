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











