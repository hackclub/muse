const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

export function start(notes) {
  // create web audio api context
  // let audioCtx = new(window.AudioContext || window.webkitAudioContext)();

  async function playNote([frequency, duration]) {
    var o = audioCtx.createOscillator()
    var g = audioCtx.createGain()
    o.frequency.value = frequency;
    o.type = 'sine';
    o.connect(g)
    g.connect(audioCtx.destination)
    o.start()
    g.gain.setValueAtTime(0, audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(.2, audioCtx.currentTime + 0.1);
    g.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration/1000)
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

  const sleep = m => new Promise(r => setTimeout(r, m));

  // play(notes);
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

  // console.log(letters);

  // playNote([391, 287])

  let oneBeat = 600; // 60*1000/bpm

  const playString = async (notes) => {
    for (let i = 0; i < notes.length; i++) {
      let [ symbol, beats] = notes[i];
      if (symbol === ";") await sleep(oneBeat*beats);
      else playNote([letters[symbol], oneBeat*beats]);
    }
  }

  playString(notes);
}

// https://www.google.com/search?q=note+frequency+chart&sxsrf=AOaemvKG6SCFR2ruFdEKYGq1pm6PxpitJg:1632850737102&tbm=isch&source=iu&ictx=1&fir=AhFnzq-f3c0WjM%252CLstW4q-3PfXraM%252C_%253B7vgWxzyXPVj48M%252CPqtZQjqKQnoeGM%252C_%253B5ocRy-vjOognJM%252CluDsl3gAlXaWAM%252C_%253B4pmdoRIMmNH05M%252CL-NnW0qsTaBOtM%252C_%253B9w1Cv1irDiHiOM%252CwR2NZpb62u0BbM%252C_%253BKk4bGu4AKVD3BM%252CJXeFIodjyDvuDM%252C_%253Bzfg8LxzKJS3JMM%252CLstW4q-3PfXraM%252C_%253ByGc-0mYKPUus9M%252C6f_97sxBUyCKcM%252C_%253Bv6Dci4dmwtInnM%252CjM1jNvtQfOtpQM%252C_%253BXC1dYBjZkGiI_M%252CFEUrsNoEJoTCdM%252C_%253BilvAst15XR3LjM%252Cnisd_luyJKn9zM%252C_%253BkF5mKgMg5n4SKM%252CzjnUcN_x9AQwvM%252C_%253BwocSq-Avd0xGTM%252CL-NnW0qsTaBOtM%252C_%253BsJcJBsQEHGZg8M%252CwD-3NW4Pr5S3kM%252C_&vet=1&usg=AI4_-kSoXJMFaknXQhihsmk7J0H8dj8ohw&sa=X&ved=2ahUKEwiyqp-Bm6LzAhULFlkFHQXeDE0Q9QF6BAgdEAE&biw=1353&bih=796&dpr=2#imgrc=7vgWxzyXPVj48M
// pitch
// us: a4
// ABC: A, A a a'

