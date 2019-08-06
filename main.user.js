// ==UserScript==
// @name         Hide "Set Reminder"
// @version      0.1
// @author       Luke C Fairchild
// @include      https://www.youtube.com*
// @grant        none
// ==/UserScript==

(function () {
	const observeDOM = (function () {
		const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

		return function (obj, callback) {
			if (!obj || !obj.nodeType === 1) return;

			if (MutationObserver) {
				const obs = new MutationObserver(function (mutations, observer) {
					callback(mutations);
				});

				obs.observe(obj, {
					childList : true,
					subtree   : true
				});

			} else if (window.addEventListener) {
				obj.addEventListener('DOMNodeInserted', callback, false);
				obj.addEventListener('DOMNodeRemoved', callback, false);
			}
		}
	})();

	observeDOM(document.body, () => {
		document.querySelectorAll('yt-formatted-string').forEach((element) => {

			if (element.textContent.toLowerCase() === 'set reminder') {
				let target = element;

				while (target.tagName !== 'YTD-GRID-VIDEO-RENDERER' && target.tagName !== 'YTD-VIDEO-RENDERER') {
					console.log(target.tagName);
					target = target.parentNode;
				}

				target.remove();
			}
		})
	});
})();
