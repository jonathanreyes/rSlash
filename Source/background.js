chrome.omnibox.onInputChanged.addListener (
	function(text, suggest) {
		return;
	}
);

chrome.omnibox.onInputEntered.addListener (
	function(text) {
		var redditString = 'https://www.reddit.com/r/' + encodeURIComponent(text);
		chrome.tabs.query({
			'currentWindow': true,
			'active': true
		}, function(tab) {
			chrome.tabs.update(tab[0].id, {'url' : redditString});
		});
	}
);
