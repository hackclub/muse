const starterSamples = [
    "bubbles",
    "clay",
    "confetti",
    "corona",
    "dottedspiral",
    "flash1",
    "flash2",
    "flash3",
    "glimmer",
    "moon",
    "pinwheel",
    "piston1",
    "piston2",
    "piston3",
    "prism1",
    "prism2",
    "prism3",
    "splits",
    "squiggle",
    "strike",
    "suspension",
    "timer",
    "ufo",
    "veil",
    "wipe",
    "zigzag",
]

export function initialSamples() {
    return starterSamples.map(name => ({
        name,
        url: `https://hackclub.github.io/muse/samples/${name}.mp3`,
        provided: true,
    }))
}
