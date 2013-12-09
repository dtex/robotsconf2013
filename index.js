var request = require("request"),
  _ = require("underscore"),
  twitter = require("twitter"),
  util = require("util");
  
var Sparky = require('sparky');

var sparky = new Sparky({
    deviceId: '',
    token: '',
});
  
// Shhhh this is secret
var twit = new twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

var queue = [], lastID = process.argv[2] || 409408836098097150;


// Get tweets from our proxy server
getData = function() {
  request({url: 'http://166.78.153.236/rc2013'}, handleResponse);
}

// Parse tweets
var handleResponse = function(err, res, body) {

  if (!err) {
    
    var jsonBody = JSON.parse(body);
    body = jsonBody.searchTweets.result;
    
    // reorder these so the earliest is at the top
    body = _.sortBy(body, function(result){ return result.id; });
    
    _.each(body, function(result, key) {
      var i, l;

      // If this tweet is new
      if (result.id > lastID) {
        
        lastID = result.id;
        
        // filter out some strings we expect and should ignore
        var text = String(result.text).toUpperCase().replace('FLOATBOT', '').replace('ROBOTSCONF', '');
        
        var command = '', pauseLength = 0;
        
        for (var i=0, j=text.length; i<j; i++) {
          if ('FBLRPS'.indexOf(text[i]) !== -1) {
            command += text[i];
          }
        } 
        
        command = command.substring(0,63);
        
        for (var i=0, j=command.length; i<j; i++) {
          text[i] = 'S' ? pauseLength += 4 : pauselenth += 1;
        } 
        
        console.log('Command received: ' + command + ' from ' + result.user.screen_name + 'id: ' + result.id); 
        queue.unshift( {user: result.user.screen_name, cmd: command, id: result.id, sent: false, complete: false, pause: pauseLength });
      }}
    );
    
  }
}

// Handle response from spark.core
var commandResponse = function(err, res, body) {
  if (err) {
    console.log(err);
  } else {
    queue.pop();
    //console.log(body);
  }
}


// Let's send the command string to floatbot
var sendCommand = function() {
    var thisCommand = queue[queue.length - 1];
    
    if (thisCommand && thisCommand.complete === true) {
      queue.pop();
      return;
    }
    
    if (thisCommand && thisCommand.sent === false) {
      
      console.log('send command:' + thisCommand.cmd + ' from user: ' + thisCommand.user );
      thisCommand.sent = true;
      
      sparky.run('drive', thisCommand.cmd, commandResponse);
      
      setTimeout(commandResponse, thisCommand.pause * 1000);
      
      // Send a reply tweet
      twit.updateStatus('@' + thisCommand.user + ' Everything\'s shiny, Cap\'n. Not to fret. Running: ' + thisCommand.cmd,
        function(data) {
            //console.log(util.inspect(data));
        }
      );
    }
}

var getTweetsInterval = setInterval(getData, 5000);
var sendCommandsInterval = setInterval(sendCommand, 1000);

