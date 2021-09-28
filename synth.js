
export function start() {
  // create web audio api context
  var audioCtx = new(window.AudioContext || window.webkitAudioContext)();


  async function playNote([frequency, duration]) {
    // create Oscillator node
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency; // value in hertz
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination)
    oscillator.start();

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.04);
     gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.25 );
  }

    function playMelody(notes) {
      let note;
      let tempo = 100;
      while (notes.length > 0) {
        note = notes.pop();
        playNote(note[0], 1000 * 256 / (note[1] * tempo));
      }
    }

  const sleep = m => new Promise(r => setTimeout(r, m));

  const play = async (notes) => {
    for (let i = 0; i < notes.length; i++) {
      const noteSet = notes[i];
      let d = noteSet[0][1];
      noteSet.forEach(note => playNote(note));
      await sleep(d)
    }
  }



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

  // playNote([391, 287])

  const pl = (letter, dur) => playNote([letters[letter]*10, dur])

  const playString = async (string) => {
    const letters = string.split(",")
    for (let i = 0; i < letters.length; i++) {
      const letter = letters[i].split("-");
      const dashes = letter.length;
      pl(letter[0], 100*dashes);
      await sleep(100*dashes);
    }
  }

  const s = "a,b,g,f";

  playString(s);
}

// https://www.google.com/search?q=note+frequency+chart&sxsrf=AOaemvKG6SCFR2ruFdEKYGq1pm6PxpitJg:1632850737102&tbm=isch&source=iu&ictx=1&fir=AhFnzq-f3c0WjM%252CLstW4q-3PfXraM%252C_%253B7vgWxzyXPVj48M%252CPqtZQjqKQnoeGM%252C_%253B5ocRy-vjOognJM%252CluDsl3gAlXaWAM%252C_%253B4pmdoRIMmNH05M%252CL-NnW0qsTaBOtM%252C_%253B9w1Cv1irDiHiOM%252CwR2NZpb62u0BbM%252C_%253BKk4bGu4AKVD3BM%252CJXeFIodjyDvuDM%252C_%253Bzfg8LxzKJS3JMM%252CLstW4q-3PfXraM%252C_%253ByGc-0mYKPUus9M%252C6f_97sxBUyCKcM%252C_%253Bv6Dci4dmwtInnM%252CjM1jNvtQfOtpQM%252C_%253BXC1dYBjZkGiI_M%252CFEUrsNoEJoTCdM%252C_%253BilvAst15XR3LjM%252Cnisd_luyJKn9zM%252C_%253BkF5mKgMg5n4SKM%252CzjnUcN_x9AQwvM%252C_%253BwocSq-Avd0xGTM%252CL-NnW0qsTaBOtM%252C_%253BsJcJBsQEHGZg8M%252CwD-3NW4Pr5S3kM%252C_&vet=1&usg=AI4_-kSoXJMFaknXQhihsmk7J0H8dj8ohw&sa=X&ved=2ahUKEwiyqp-Bm6LzAhULFlkFHQXeDE0Q9QF6BAgdEAE&biw=1353&bih=796&dpr=2#imgrc=7vgWxzyXPVj48M
// pitch
// us: a4
// ABC: A, A a a'

