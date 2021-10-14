import { html } from "https://unpkg.com/lit-html@2.0.1/lit-html.js";
import "https://leomcelroy.com/widgets/code-mirror.js"

export const view = (state) => html`
	<code-mirror id="cm"></code-mirror>
	<div class="button-container">
		<button class="trigger-play">play/attach</button>
	</div>
	${state.activeMuses.map( (x, i) => html`<div>
			<span>Muse ${i}</span>
			<button @click=${e => dispatch("REMOVE_MUSE", { index : i })}>stop</button>
		</div>`)
	}
	<div class="played-log">${state.played.join(" ")}</div>
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
				const audio = document.querySelector(`#${sample.name}-audio`)
				audio.volume = state.sampleVolume;
				audio.currentTime = 0;
				audio.play()
			}}>${sample.name}</span>
			<audio
				id="${sample.name}-audio"
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
					document.querySelector(`#${sample.name}-audio`).pause()
					dispatch("DELETE_SAMPLE", {index: i})
				}
			}}">x</span>
		</li>
	`)}
	</ul>
`










