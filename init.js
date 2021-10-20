import { delegate } from "./delegate.js";
import { defaultProg } from "./defaultProg.js";

const listenBody = delegate(document.body);

let audioChunks = [];

export async function init(args, state) {
	dispatch("RENDER");

	listenBody("click", ".trigger-play", () => {
		dispatch("PLAY");
	})

	listenBody("keydown", "", (e) => {
		let key = event.key;

        const cm = document.querySelector("#cm");
        const prog = cm.view.state.doc.toString();

        window.localStorage.setItem("muse-prog", prog);

		if (key === "Enter" && event.shiftKey) {
		  event.preventDefault();
		  dispatch("PLAY");
		}

        if (e.target.getAttribute("role") === "textbox") return;

        if (key in state.keyBindings) {
            state.keyBindings[key]();
        }
	})

    listenBody("mousedown", "", (e) => {
        if (!e.target.matches(".examples > *, .examples")) {
            dispatch("EXAMPLES", { show: false });
        }

        if (!e.target.matches(".shared-confirmation")) {
            state.showShared = false;
            dispatch("RENDER");
        }
    })

	const savedSamples = window.localStorage.getItem("muse-samples");
	if (savedSamples) state.samples = JSON.parse(savedSamples);

    // load program
    const url = new URL(window.location.href);
    const search = window.location.search;
    const file = new URLSearchParams(search).get("file");
    if (file) {
        let file_url = file;
        if (file.startsWith("rec")) { // fetch from airtable
            // fetch rec with that ID
            const url = `https://api2.hackclub.com/v0.1/Saved Projects/Muse Projects/?select={"filterByFormula": "RECORD_ID()='${file}'"}`;            
            (async () => {
                  const json = await fetch(url, {mode: 'cors'}).then(r => r.json())
                  document.querySelector("#cm").view.dispatch({
                      changes: {from: 0, insert: json[0].fields["Content"] }
                    });
            })()

        } else { // fetch from another page
            if (!file.startsWith("http")) file_url = `examples/${file}`;

            (async () => {
                const file = await fetch(file_url,  {mode: 'cors'});
                const txt = await file.text();

                document.querySelector("#cm").view.dispatch({
                  changes: {from: 0, insert: txt}
                });
            })()
        }
        
    } else { // if no parameter and empty load cached program else load default program
        const saved = window.localStorage.getItem("muse-prog")
        document.querySelector("#cm").view.dispatch({
          changes: { from: 0, insert: !saved ? defaultProg.trim() : saved }
        });
    }


	dispatch("RENDER")

	const stream = await navigator
		.mediaDevices
		.getUserMedia({ audio: true })

	state.recordingStatus = "ready";
	dispatch("RENDER");

	state.rec = new MediaRecorder(stream)
    state.rec.ondataavailable = (e) => {
        audioChunks.push(e.data)
        if (state.rec.state == "inactive") {
            let blob = new Blob(audioChunks, { type: "audio/mpeg-3" })
            sendData(blob)
        }
    }

    
    (async () => {
        const examplesURL = `https://api2.hackclub.com/v0.1/Saved Projects/Muse Projects/?select={"filterByFormula": "{Public}=TRUE()"}`;
        const json = await fetch(examplesURL).then(res => res.json());
        state.examples = json.map(x => x.fields);
    })()
}

function makeId(length) {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz';
    var numbers = "0123456789"
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function sendData(data) {
    const body = new FormData()
    body.append('sound',data)
    const upload = await fetch('https://sound-sampler.maxwofford.repl.co/upload-sound', {
      method: 'POST',
      body
    }).then(r => r.json())
    const url = 'https://sound-sampler.maxwofford.repl.co/' + upload.data.filename
    const sampleObj = {}
    const name = makeId(4);
	dispatch("ADD_SAMPLE", { name, url, provided: false})
    // sampleObj[name] = {url, provided: false}
    // setSample(sampleObj)
  }