const trigger = e => e.composedPath()[0];
const matchesTrigger = (e, selectorString) => trigger(e).matches(selectorString);
// create on listener
export const delegate = (target) => (eventName, selectorString, event, remove = false) => { // focus doesn't work with this, focus doesn't bubble, need focusin
	if (target.getAttribute(eventName) === "true" && remove) {
		console.log("removing old listeners")
		target.listeners.forEach( e => target.removeEventListener(eventName, e) );
	} else {
		target.setAttribute(eventName, "true");
	}

	const func = (e) => {
		e.trigger = trigger(e); // Do I need this? e.target seems to work in many (all?) cases
		if (selectorString === "" || matchesTrigger(e, selectorString)) event(e);
	}

	target.addEventListener(eventName, func)

	target.listeners = target.listeners ? [ ...target.listeners, func ] : [ func ];

}
