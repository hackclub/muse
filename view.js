import { html } from "https://unpkg.com/lit-html@2.0.1/lit-html.js";
import "https://leomcelroy.com/widgets/code-mirror.js"

const activeMuses = muses => muses.map( (x, i) => html`<div>
	<span>Muse ${i}</span>
	<button @click=${e => dispatch("REMOVE_MUSE", { index : i })}>stop</button>
</div>`)

const drawExamples = (state) => html`
	<div class="examples">
		${state.examples.map((x, i) => html`
			<span class="example" @click=${() => dispatch("LOAD", { txt: x["Content"] })}>
				${x["Name"]}
			</span>
		`)}
	</div>
`

export const view = (state) => html`
	<div class="editor">
		<div>
			<code-mirror id="cm" class="CodeMirror cm-s-3024-night"></code-mirror>
			<div class="button-container">
				<button class="trigger-play">play/attach</button>
				<button @click=${() => dispatch("STOP")}>stop</button>
				<button @click=${() => dispatch("SHARE")}>share</button>
				<button @click=${() => dispatch("EXAMPLES", { show: !state.showExamples })}>
					examples
				</button>
			</div>
		</div>
		<div class="left-editor">
			<div>
				<div class="played-notes-heading-holder">
					<span class="played-notes-heading">Played Notes</span> 
					<small @click=${() => dispatch("CLEAR_PLAYED")}>Clear Sounds</small>
				</div>
				<div class="played-log">${state.played.join(" ")}</div>
			</div>
			${drawSamples(state)}
		</div>
		${ state.showExamples ? drawExamples(state) : "" }
		${ state.showShared ? html`<div class="shared-confirmation">Sharing link copied to clipboard!</div>` : "" }
	</div>
`

const drawSamples = (state) => html`
	<div class="samples">
	<div class="played-notes-heading-holder">
		<span class="played-notes-heading">Samples</span> 
		<small id="recording-button" class="${state.recordingStatus}" @click=${(e) => {
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
		}}></small>
	</div>
		<div id="sample-list">
		${state.samples.map( (sample, i) => html`
			<li class="${sample.deleted ? 'deleted' : ''}">
				<span class="sample-name" @click=${(e) => {
					const audio = document.querySelector(`#${sample.name}-audio`)
					audio.volume = state.sampleVolume;
					audio.currentTime = 0;
					audio.play()
				}}>${sample.name}</span>
				<span class="delete" @click="${(e) => {
					const shouldContinue = confirm("Are you sure you want to delete this sample?")
					if (shouldContinue) {
						document.querySelector(`#${sample.name}-audio`).pause()
						dispatch("DELETE_SAMPLE", {index: i})
					}
				}}">x</span>
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
			</li>
		`)}
		</div>
	</div>
`










