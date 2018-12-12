var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
 /*  res.sendFile(__dirname + '/index.html'); */
 console.log('链接')
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('login', data => {
    console.log(data)
  })
  console.log('changed')

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});