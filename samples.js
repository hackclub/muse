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
    } catch(e) {
        return null
    }
}

function setSample(sample, updateUI=true) {
    let newSamples = sample
    const existingSamples = getSamples() || {}
    const updatedSamples = {...existingSamples, ...newSamples}
    window.localStorage.setItem("samples", JSON.stringify(updatedSamples))

    if (updateUI) {
        sampleUIUpdate(updatedSamples)
    }
}

function sampleUIUpdate(sampleObj=getSamples()) {
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
                    updateObj[name] = {deleted: true}
                    setSample(updateObj)
                }
            }
            el.appendChild(deleteButton)
            return el
        })
    )
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
}