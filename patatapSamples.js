export function playSample(id, context) {
	const audio = document.querySelector(`#${id}`);
	// const source = context.createMediaElementSource(audio);
 //    var g = context.createGain()
 //    source.connect(g)
 //    g.connect(context.destination)
 //    source.start()
 //    g.gain.setValueAtTime(0, context.currentTime);
 //    g.gain.linearRampToValueAtTime(.2, context.currentTime + 0.1);
 //    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + duration/1000)


	audio.currentTime = 0;
	audio.play();
}

export const patatapSamples = {
	"piano": (duration, ctx) => playSample("sample", duration, ctx),
	"bubbles": (duration, ctx) => playSample("bubbles", duration, ctx),
	"clay": (duration, ctx) => playSample("clay", duration, ctx),
	"confetti": (duration, ctx) => playSample("confetti", duration, ctx),
	"corona": (duration, ctx) => playSample("corona", duration, ctx),
	"dottedspiral": (duration, ctx) => playSample("dottedspiral", duration, ctx),
	"flash1": (duration, ctx) => playSample("flash1", duration, ctx),
	"flash2": (duration, ctx) => playSample("flash2", duration, ctx),
	"flash3": (duration, ctx) => playSample("flash3", duration, ctx),
	"glimmer": (duration, ctx) => playSample("glimmer", duration, ctx),
	"moon": (duration, ctx) => playSample("moon", duration, ctx),
	"pinwheel": (duration, ctx) => playSample("pinwheel", duration, ctx),
	"piston1": (duration, ctx) => playSample("piston1", duration, ctx),
	"piston2": (duration, ctx) => playSample("piston2", duration, ctx),
	"piston3": (duration, ctx) => playSample("piston3", duration, ctx),
	"prism1": (duration, ctx) => playSample("prism1", duration, ctx),
	"prism2": (duration, ctx) => playSample("prism2", duration, ctx),
	"prism3": (duration, ctx) => playSample("prism3", duration, ctx),
	"splits": (duration, ctx) => playSample("splits", duration, ctx),
	"squiggle": (duration, ctx) => playSample("squiggle", duration, ctx),
	"strike": (duration, ctx) => playSample("strike", duration, ctx),
	"suspension": (duration, ctx) => playSample("suspension", duration, ctx),
	"timer": (duration, ctx) => playSample("timer", duration, ctx),
	"ufo": (duration, ctx) => playSample("ufo", duration, ctx),
	"veil": (duration, ctx) => playSample("veil", duration, ctx),
	"wipe": (duration, ctx) => playSample("wipe", duration, ctx),
	"zigzag": (duration, ctx) => playSample("zigzag", duration, ctx),
}