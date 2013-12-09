@FloatBot at robotsconf2013
==============

@FloatBot was an interactive  RobotsConf2013 project that allowed attendees to tweet driving commands to our robot in the form "@FloatBot FFPLFRBPS". Query services polled Twitter for new commands and passed them along wirelessly to a simple robot built on top of a Parallax chassis with an Arduino-compatible [Spark Core](https://www.spark.io/) as the brains.

There were three layers to the @floatbot stack.

1) spas [(gitub)](https://www.github.com/dtex/spas)- This was an existing node.js application that we leveraged. spas is an API proxy server that cached our requests to Twitter and handled the authentication for us. One  limiting factor was the delay imposed by Twitter's API rate limiting rules. We could only refresh from Twitter once every minute which took some of the fun out of it. In retrospect we might have used Twilio to listen to SMS messages and get a faster interactive response.

2) Message Relay- A node.js app that polled the API proxy, grabbed the latest @floatbot tweets, determined which ones were new, extracted the move commands and sent them on to @floatbot via http using our Spark Core. This layer also sent response tweets to the Twitter user that issued the commands when their instructions were executing. Had we planned to do that last step in the beginning we probably would have left out the first layer since we had to handle oauth here as well.

3) Arduino code- Using the Spark Core [Cloud API](http://docs.spark.io/#/api), we received the move commands via a RESTful interface that exposed our robot drive functionality. The on-board function parsed the string of individual move commands and controlled the servos as needed to drive forward, drive backward, turn left, turn right, spin in place, or pause. The drive commands just use fixed time delays but would ideally use more sophisticated means for ensuring accurate navigation.

4) Web interface (future)- With more time, we wanted to add a web interface that showed the command queue and which user's instructions were currently being executed.
