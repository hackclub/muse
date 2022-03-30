import { Synth } from "./audiosynth.js";


const instruments = {
  piano: Synth.createInstrument('piano'),
  edm: Synth.createInstrument('edm'),
  acoustic: Synth.createInstrument('acoustic'),
  organ: Synth.createInstrument('organ'),
}

let letters = {
  "c": 16.35,
  "c#": 17.32,
  "d": 18.35,
  "d#": 19.45,
  "e": 20.6,
  "f": 21.83,
  "f#": 23.12,
  "g": 24.5,
  "g#": 25.96,
  "a": 27.5,
  "a#": 29.14,
  "b": 30.87,
}

for (let i = 1; i < 10; i++) {
  for (const k in letters) {
    letters[`${k}${i}`] = letters[k]*2**i;
  }
}

async function playNote(frequency, duration, ctx, ops = {}) {
  window.museCurrentlyPlaying = frequency;
  var o = ctx.createOscillator()
  var g = ctx.createGain()
  o.frequency.value = frequency;
  o.type = ops.type || 'sine';
  o.connect(g)
  g.connect(ctx.destination)
  o.start();

  const endTime = ctx.currentTime + duration*2/1000;
  o.stop(endTime)
  
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(.2, ctx.currentTime + duration/5/1000);
  g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration/1000)
  g.gain.linearRampToValueAtTime(0, ctx.currentTime + duration*2/1000) // does this ramp from the last ramp
  o.onended = () => {
    g.disconnect();
  };
}

function getLetters(ops) {
  const type = ops.type ?? "sine";
  const volume = ops.volume ?? 100;

  const newLetters = {};
  if ( ["sine", "triangle", "square", "sawtooth"].includes(type) ) {
    for (const k in letters) {
      let hz = letters[k];
      newLetters[k] = (duration, ctx) => playNote(hz, duration, ctx, ops);
    }
  } else if ( ["piano", "edm", "organ", "acoustic"].includes(type) ) {
    const instrument = instruments[type]
    Synth.setVolume(volume/100);
    const twelveNotes = ["a", "a#", "b", "c", "c#", "d", "d#", "e", "f", "f#", "g", "g#"];
    for (let i = 1; i < 9; i++) {
      twelveNotes.forEach(n => {
        const note = n.toUpperCase();
        newLetters[`${n}${i}`] = (duration) => instrument.play(note, i, duration/1000);
      })
    }
  } else console.error("Unexpected synth type:", type)

  // console.log(newLetters);

  return newLetters;
}

export { getLetters };

