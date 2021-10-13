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
	<hr />
	<em>Samples</em>
	<div id="recording-button" class="${state.recordingStatus}" @click=${(e) => {
		switch(state.recordingStatus) {
			case "ready":
				dispatch("START_RECORDING")
				break;
			case "recording":
				dispatch("STOP_RECORDING")
				break
			default:
				// someone clicked while this is 'loading' or out of state
				break;
		}
	}}></div>
	<ul id="sample-list">
	${state.samples.map( (sample, i) => html`
		<li class="${sample.deleted ? 'deleted' : ''}">
			<span class="sample-name" @click=${(e) => {
				const player = e.target.parentElement.querySelector('audio')
				if (player.paused) {
					player.load()
					player.currentTime = 0
					player.play()
				} else {
					player.pause()
				}
			}}>${sample.name}</span>
			<audio
				src="${sample.url}" 
				@play=${(e) => {
					e.target.parentElement.querySelector('.sample-name').classList.add('playing')
				}}
				@pause=${(e) => {
					e.target.parentElement.querySelector('.sample-name').classList.remove('playing')
				}}
			></audio>
			<span class="delete" @click="${(e) => {
				const shouldContinue = confirm("Are you sure you want to delete this sample?")
				if (shouldContinue) {
					const player = e.target.parentElement.querySelector('audio')
					player.pause()
					dispatch("DELETE_SAMPLE", {index: i})
				}
			}}">x</span>
		</li>
	`)}
	</ul>
`










