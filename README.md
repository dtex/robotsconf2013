robotsconf2013
==============

There were three layers to the @floatbot stack.

1) Twitter API proxy - This was an existing node.js application called [spas](http://dtex.github.io/spas). SPAS is an API proxy server that cached our requests to Twitter and handled the authentication for us. Our biggest limiting factor was the delay imposed by Twitter's API rate limiting rules. We could only refresh from Twitter once every minute which took some of the fun out of it. In retrospect we should have used Twilio to listen to SMS messages.

2) Message Relay - A node.js app that talked to the API proxy and grabbed the latest @floatbot tweets, determined which ones were new, extracted to move commands and sent them on to @floatbot via http using our Spark Core. This layer also sent response tweets to the Twitter user that issued the commands. Had we planned to do that last step in the beginning we probably would have left out the first layer since we had to handle oauth here as well.

3) Arduino code -
