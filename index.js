import "https://leomcelroy.com/widgets/code-mirror.js"



document.body.innerHTML = `
	<style>
		.cm-wrap { 
			min-height: max-content; 
			border: 1px solid #ddd;
	    	resize: vertical;
	    	overflow: auto;
		}
		.cm-scroller { overflow: auto; }
		.ͼe {
			color: #973e1b;
		}

		.ͼl {
		   	color: #a1a09f;
		}
	</style>

	<code-mirror id="cm"></code-mirror>
	<button class="trigger-play">play</button>
`

const trigger = e => e.composedPath()[0];
const matchesTrigger = (e, selectorString) => trigger(e).matches(selectorString);
// create on listener
const createListener = (target) => (eventName, selectorString, event) => { // focus doesn't work with this, focus doesn't bubble, need focusin
	target.addEventListener(eventName, (e) => {
		e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
		if (selectorString === "" || matchesTrigger(e, selectorString)) event(e);
	})
}

const bodyListener = createListener(document.body);

const included = {
	
}

bodyListener("click", ".trigger-play", () => {
	const cm = document.querySelector("#cm");
	const prog = cm.view.state.doc.toString();
	const f = new Function(...Object.keys(included), prog)
	const result = f(...Object.values(included));
})

















