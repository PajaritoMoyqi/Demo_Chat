var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(req, res){
  fs.readFile(__dirname+'/app.html', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  })
}).listen(57889, function(){
  console.log('Server running on www service');
});

var io = socketio.listen(server);

io.sockets.on('connection', function(socket){
  socket.on('message', function(data){
    io.sockets.emit('message', data);
  })
});