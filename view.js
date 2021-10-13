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
	<audio id="sample" src="http://carolinegabriel.com/demo/js-keyboard/sounds/053.wav">
`










