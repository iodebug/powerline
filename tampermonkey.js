// ==UserScript==
// @name	powerline.io
// @namespace	http://tampermonkey.net/
// @version	0.4
// @description	Replaces inline JS on powerline.io
// @author	Shaun Mitchell
// @match	*://powerline.io/*
// @grant	unsafeWindow
// @run-at	document-start
// ==/UserScript==

var evilJSRegex = /SpaceWars/;
var replacementJSUrl = "http://test.shitchell.com/powerline/powerline.js";

function removeInlineJS(e) {
	if (evilJSRegex.test(e.target.innerText)) {
		// Stop the default JS from running
		e.stopPropagation();
		e.preventDefault();

		// Create a new script tag for our custom JS
		var awesomeJS = document.createElement("script");
		awesomeJS.type = "text/javascript";
		awesomeJS.src = replacementJSUrl;

		// Replace the old JS with our custom shiznit
		var parentNode = e.target.parentNode;
		parentNode.removeChild(e.target);
		parentNode.appendChild(awesomeJS);

		// Remove the event listener
		unsafeWindow.addEventListener("beforescriptexecute", removeInlineJS, true);
	}
}

(function() {
	'use strict';
	Object.defineProperty(unsafeWindow, "debug", {
		get: function() {
			return true;
		},
		set: function(x) {
			console.log("Cannot change value of debug variable.");
		}
	});

	unsafeWindow.addEventListener("beforescriptexecute", removeInlineJS, true);
})();