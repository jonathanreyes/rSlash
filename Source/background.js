//Listener for whenever the user changes the text in the omnibox.
//@TODO: implement subreddit suggestions
chrome.omnibox.onInputChanged.addListener (
	function(text, suggest) {
		return;
	}
);

//Listener for whenver the user has entered the keyword ('r/') and a subreddit name
chrome.omnibox.onInputEntered.addListener (
	function(text) {
		//Append the user-inputted text to the base URL
		var redditString = 'https://www.reddit.com/r/' + encodeURIComponent(text);

		chrome.tabs.query({
			'currentWindow': true,
			'active': true
		}, function(tab) {
			//Navigate to the URL generated above
			chrome.tabs.update(tab[0].id, {'url' : redditString});
		});
	}
);
