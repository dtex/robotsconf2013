robotsconf2013
==============

There were actually a few layers to the @floatbot stack.

1) Twitter API proxy - This was an existing node.js application called [spas](http://dtex.github.io/spas). SPAS is an API proxy server that cached our requests to Twitter and handled the oauth for us.

2) Message Relay - A node.js app that talked to the API proxy and grabbed the latest @floatbot tweets, determined which ones were new, extracted to move commands and sent them on to @floatbot via http using our Spark Core.

3) Arduino code -
