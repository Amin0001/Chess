var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/default.html');
});

http.listen(port, function() {
  console.log('listening on *: ' + port);
});
// setup my socket server
var io = require('socket.io')(http, {
  path: '/socket.io'
});

var io = require('socket.io')(http);
io.on('connection', function(socket) {
    console.log('new connection');

    // Called when the client calls socket.emit('move')
    socket.on('move', function(msg) {
       socket.broadcast.emit('move', msg); 
    });
});
// functions/default.js

// The handler function for the root endpoint
exports.handler = async (event, context) => {
  try {
    // Assuming you want to serve the 'default.html' file from the 'public' folder
    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: '<html><body><h1>Hello, Serverless World!</h1></body></html>',
    };

    return response;
  } catch (error) {
    // Handle any errors
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
// functions/move.js

exports.handler = async (event, context) => {
  try {
    // Assuming you want to broadcast the 'move' event message to clients
    const { msg } = JSON.parse(event.body);

    // Perform any processing or validation on the message if needed

    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'success' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

