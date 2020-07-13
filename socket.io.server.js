var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');

var server = http.createServer(function(req, res){
  fs.readFile(__dirname+'/main.html', function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
  })
}).listen(57889, function(){
  console.log('Server running on www service');
});

var io = socketio.listen(server);
var id = 0;

io.sockets.on('connection', function(socket){
  id = socket.id;
  socket.on('rint', function(data){
    io.sockets.to(id).emit('smart', data);
  });
});

