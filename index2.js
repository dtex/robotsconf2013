var request = require("request"),
  _ = require("underscore"),
  twitter = require("twitter"),
  util = require("util"),
  sp = require("serialport"),
  SerialPort = require("serialport").SerialPort,
  //serialPort = new SerialPort("/dev/cu.usbmodemfa131", null, false);
  serialPort = new SerialPort("/dev/cu.usbserial-AH00156H", null, false);



sp.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

serialPort.open(function() {
  setTimeout(function() {
    serialPort.write("N", function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  }, 5000);
  
  setTimeout(function() {
    serialPort.write("O", function(err, results) {
      console.log('err ' + err);
      console.log('results ' + results);
    });
  }, 7000);
  
});

serialPort.on('data', function(data) {
  console.log('data received: ' + data);
});

  /*
// Shhhh this is secret
var twit = new twitter({
    consumer_key: '54AbilZBgx8Vi3C3qCyrA',
    consumer_secret: 'HFmglxWYxKgGC4rnoM4Gr2vvIA7Iwghxn14KLvEtdF4',
    access_token_key: '2233778324-s5hjwcqJBFFImn4aCyQzJjfyskPIyS7vlo1vJW1',
    access_token_secret: 'nKf8hamp5NPd0JjxAkUMqFKqBwAzIRysuFxG0jmaNgAIK'
});

var queue = [], lastID = process.argv[2] || 0;


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
        
        var command = '';
        for (var i=0, j=text.length; i<j; i++) {
          if ('FBLRPS'.indexOf(text[i]) !== -1) {
            command += text[i];
          }
        } 
        
        command = command.substring(0,63);
        console.log('Command received: ' + command + ' from ' + result.user.screen_name + 'id: ' + result.id); 
        queue.unshift( {user: result.user.screen_name, cmd: command, id: result.id, sent: false, complete: false });
      }
    });
    
  }
}

// Handle response from spark.core
var commandResponse = function(err, res, body) {
  if (err) {
    console.log(err);
  } else {
    queue.pop();
    console.log(body);
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
      
      // Send command to spark.core
      //request.post({url: 'https://api.spark.io/v1/devices/55ff78064989495329532587/driveCommand', body: thisCommand.cmd, form: {'access_token': 'c1caf443c876bd1258ba8170edc5d8dfc7816352'}}, commandResponse); 
      board.write('!(' + thisCommand.cmd + ').')
      
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

*/