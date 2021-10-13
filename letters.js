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
  var o = ctx.createOscillator()
  var g = ctx.createGain()
  o.frequency.value = frequency;
  o.type = ops.type || 'sine';
  o.connect(g)
  g.connect(ctx.destination)
  o.start()
  g.gain.setValueAtTime(0, ctx.currentTime);
  g.gain.linearRampToValueAtTime(.2, ctx.currentTime + 0.1);
  g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration/1000)
  // o.stop();
  // audioCtx.close();

  // create Oscillator node
  // var oscillator = audioCtx.createOscillator();
  // var gainNode = audioCtx.createGain();
  // oscillator.type = 'sine';
  // oscillator.frequency.value = frequency; // value in hertz
  // oscillator.connect(gainNode);
  // gainNode.connect(audioCtx.destination)
  // oscillator.start();
  // gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
  // gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + duration/2/1500);
  // gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration/1500);
}

function getLetters(ops) {
  const newLetters = {};
  for (const k in letters) {
    let hz = letters[k];
    newLetters[k] = (duration, ctx) => playNote(hz, duration, ctx, ops);
  }

  return newLetters;
}

export { getLetters };
