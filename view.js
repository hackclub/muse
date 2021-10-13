import { html } from "https://unpkg.com/lit-html@2.0.1/lit-html.js";
import "https://leomcelroy.com/widgets/code-mirror.js"

export const view = (state) => html`
	<style>
		.cm-wrap { 
			min-height: max-content; 
			border: 1px solid #ddd;
	    	resize: vertical;
	    	overflow: auto;
		}
		.cm-scroller { overflow: auto; }
		.ͼd {
			color: #973e1b;
		}

		.ͼl {
		   	color: #a1a09f;
		}

		.button-container {
			width: 100%;
			display: grid;
			place-content: center;
		}

		.trigger-play {
			width: 100%;
    		margin: 5px;
		}

		.sample-item:hover {
			cursor: pointer;
		}
	</style>

	<code-mirror id="cm"></code-mirror>
	<div class="button-container">
		<button class="trigger-play">play/attach</button>
	</div>
	${state.activeMuses.map( (x, i) => html`<div>
			<span>Muse ${i}</span>
			<button @click=${e => dispatch("REMOVE_MUSE", { index : i })}>stop</button>
		</div>`)
	}
	<div>
		Welcome to Muse

		todo: examples
	</div>
	<audio id="bubbles" src="./samples/bubbles.mp3"></audio> 
	<audio id="clay" src="./samples/clay.mp3"></audio>
	<audio id="confetti" src="./samples/confetti.mp3"></audio>
	<audio id="corona" src="./samples/corona.mp3"></audio>
	<audio id="dottedspiral" src="./samples/dottedspiral.mp3"></audio>
	<audio id="flash1" src="./samples/flash1.mp3"></audio>
	<audio id="flash2" src="./samples/flash2.mp3"></audio>
	<audio id="flash3" src="./samples/flash3.mp3"></audio>
	<audio id="glimmer" src="./samples/glimmer.mp3"></audio>
	<audio id="moon" src="./samples/moon.mp3"></audio>
	<audio id="pinwheel" src="./samples/pinwheel.mp3"></audio>
	<audio id="piston1" src="./samples/piston1.mp3"></audio>
	<audio id="piston2" src="./samples/piston2.mp3"></audio>
	<audio id="piston3" src="./samples/piston3.mp3"></audio>
	<audio id="prism1" src="./samples/prism1.mp3"></audio>
	<audio id="prism2" src="./samples/prism2.mp3"></audio>
	<audio id="prism3" src="./samples/prism3.mp3"></audio>
	<audio id="splits" src="./samples/splits.mp3"></audio>
	<audio id="squiggle" src="./samples/squiggle.mp3"></audio>
	<audio id="strike" src="./samples/strike.mp3"></audio>
	<audio id="suspension" src="./samples/suspension.mp3"></audio>
	<audio id="timer" src="./samples/timer.mp3"></audio>
	<audio id="ufo" src="./samples/ufo.mp3"></audio>
	<audio id="veil" src="./samples/veil.mp3"></audio>
	<audio id="wipe" src="./samples/wipe.mp3"></audio>
	<audio id="zigzag" src="./samples/zigzag.mp3"></audio>
	<div>Included Samples</div>
	<ul>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#bubbles`).play()}>bubbles</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#clay`).play()}>clay</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#confetti`).play()}>confetti</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#corona`).play()}>corona</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#dottedspiral`).play()}>dottedspiral</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#flash1`).play()}>flash1</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#flash2`).play()}>flash2</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#flash3`).play()}>flash3</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#glimmer`).play()}>glimmer</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#moon`).play()}>moon</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#pinwheel`).play()}>pinwheel</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#piston1`).play()}>piston1</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#piston2`).play()}>piston2</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#piston3`).play()}>piston3</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#prism1`).play()}>prism1</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#prism2`).play()}>prism2</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#prism3`).play()}>prism3</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#splits`).play()}>splits</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#squiggle`).play()}>squiggle</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#strike`).play()}>strike</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#suspension`).play()}>suspension</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#timer`).play()}>timer</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#ufo`).play()}>ufo</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#veil`).play()}>veil</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#wipe`).play()}>wipe</li>
		<li class="sample-item" @mousedown=${() => document.querySelector(`#zigzag`).play()}>zigzag</li>
	</ul>
`










