// example sample object:
// {
//     bubbles: {
//         url: "https://sound-sampler.maxwofford.repl.co/bubbles.mp3",
//         deleted: false, // only soft delete– these are people's recordings,
//         provided: true, // treat the provided samples differently,
//     },
//     "other-sound": {...}
// }

const starterSamples = [
    "bubbles",
    "clay",
    "confetti",
    "corona",
    "dotted-spiral",
    "flash-1",
    "flash-2",
    "flash-3",
    "glimmer",
    "moon",
    "pinwheel",
    "piston-1",
    "piston-2",
    "piston-3",
    "prism-1",
    "prism-2",
    "prism-3",
    "splits",
    "squiggle",
    "strike",
    "suspension",
    "timer",
    "ufo",
    "veil",
    "wipe",
    "zig-zag",
]

function getSamples() {
    const storage = window.localStorage.getItem("samples")
    try {
        return JSON.parse(storage)
    } catch (e) {
        return null
    }
}

function setSample(sample, updateUI = true) {
    let newSamples = sample
    const existingSamples = getSamples() || {}
    // const updatedSamples = { ...existingSamples, ...newSamples }
    const updatedSamples = objMerge(existingSamples, newSamples)
    window.localStorage.setItem("samples", JSON.stringify(updatedSamples))

    if (updateUI) {
        sampleUIUpdate(updatedSamples)
    }
}
function objMerge(target, source) {
    // https://gist.github.com/ahtcx/0cd94e62691f539160b32ecda18af3d6
    for (const key in Object.keys(source)) {
        console.log(key)
        if (source[key] instanceof Object) {
            console.log(target[key], source[key])
            Object.assign(source[key], merge(target[key], source[key]))
        }
    }
    Object.assign(target || {}, source)
    return target
}

function sampleUIUpdate(sampleObj = getSamples()) {
    document.querySelector('#sample-list').replaceChildren(
        ...Object.entries(sampleObj).map(([name, fields]) => {
            const el = document.createElement('li')

            if (fields.deleted) {
                el.classList.add('deleted')
            }

            const span = document.createElement('span')
            span.innerText = name
            span.classList.add('sample-name')
            el.appendChild(span)

            const player = document.createElement('audio')
            player.src = fields.url
            player.onplay = () => {
                player.parentElement.querySelector('.sample-name').classList.add('playing')
            }
            player.onpause = () => {
                player.parentElement.querySelector('.sample-name').classList.remove('playing')
            }
            el.appendChild(player)

            span.onclick = () => {
                if (player.paused) {
                    player.currentTime = 0
                    player.play()
                } else {
                    player.pause()
                }
            }

            const deleteButton = document.createElement('span')
            deleteButton.innerText = 'x'
            deleteButton.classList.add("delete")
            deleteButton.onclick = () => {
                const shouldContinue = confirm('Are you sure you want to delete this sample?')
                if (shouldContinue) {
                    const updateObj = {}
                    updateObj[name] = { deleted: true }
                    setSample(updateObj)
                }
            }
            el.appendChild(deleteButton)
            return el
        })
    )
}

function createRecordingUI() {
    const el = document.querySelector('#recording-button')
    el.id = 'recording-button'
    el.classList.add('ready')

    el.onclick = () => {
        const currentlyRecording = el.classList.contains('recording')
        if (currentlyRecording) {
            el.classList.remove('recording')
            el.classList.add('ready')
            rec.stop()
        } else {
            el.classList.remove('ready')
            el.classList.add('recording')
            audioChunks = []
            rec.start()
        }
    }
}


navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    handlerFunction(stream)
})

let rec, audioChunks, recordedAudio
function handlerFunction(stream) {
    rec = new MediaRecorder(stream)
    rec.ondataavailable = (e) => {
        audioChunks.push(e.data)
        if (rec.state == "inactive") {
            let blob = new Blob(audioChunks, { type: "audio/mpeg-3" })
            sendData(blob)
        }
    }
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
    const name = Math.random().toString(36).substring(2, 15)
    sampleObj[name] = {url, provided: false}
    setSample(sampleObj)
  }


export function initSamples() {
    if (getSamples() === null) {
        const providedSamples = {}
        starterSamples.forEach(name => {
            providedSamples[name] = {
                url: `https://sound-sampler.maxwofford.repl.co/${name}.mp3`,
                provided: true,
            }
        })
        setSample(providedSamples, false)
        sampleUIUpdate()
    } else {
        sampleUIUpdate()
    }
    createRecordingUI()
}