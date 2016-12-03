var prevVisitedSubs = [];

//When rSlash starts, get the saved list of subreddits to suggest
chrome.omnibox.onInputStarted.addListener ( function() {
    chrome.storage.sync.get('subredditsList', function (items) {
      console.log(JSON.stringify(items));

      prevVisitedSubs = items['subredditsList'] ? items['subredditsList'] : [];

      console.log(JSON.stringify(prevVisitedSubs));
    })
  }
);

//Listener for whenever the user changes the text in the omnibox.
//@TODO: implement subreddit suggestions
chrome.omnibox.onInputChanged.addListener ( function(text, suggest) {
    
    if (prevVisitedSubs.length > 0) {
      var matchingSuggestions = [];
      for (var i = 0; i < prevVisitedSubs.length; i++) {
        if (prevVisitedSubs[i].content.indexOf(text) > -1) {
          matchingSuggestions.push(prevVisitedSubs[i]);
        }
      }

      if (matchingSuggestions.length > 0) {
        suggest(matchingSuggestions);
      }
    }
  }
);

chrome.omnibox.setDefaultSuggestion({
  description: 'rSlash: Jump to Subreddit'
});

//Listener for whenver the user has entered the keyword ('r') and a subreddit name
chrome.omnibox.onInputEntered.addListener (
  function(text) {
    //Append the user-inputted text to the base URL
    var redditString = 'https://www.reddit.com/r/' + text;
    
    chrome.tabs.query({
      'currentWindow': true,
      'active': true
    }, function(tab) {
      //Navigate to the URL generated above
      chrome.tabs.update(tab[0].id, {'url' : redditString});

      //if this is the first time the user has used rSlash to go to this subreddit, save it
      for (var i = 0; i < prevVisitedSubs.length; i++) {
        if (prevVisitedSubs[i].content.indexOf(text) > -1)
          return;
      }

      prevVisitedSubs.push({content: text, description: 'r/' + text});
      console.log("adding new item to prevVisitedSubs: " + JSON.stringify(prevVisitedSubs));
      chrome.storage.sync.set({subredditsList: prevVisitedSubs});
    });
  }
);

// chrome.omnibox.onInputCancelled.addListener(function () {
//   return;
// })
