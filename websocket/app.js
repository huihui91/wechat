var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const userData=[];

app.get('/', function (req, res) {
 /*  res.sendFile(__dirname + '/index.html'); */
 console.log('链接')
});

// 把public设置为公共的资源目录
app.use(require('express').static('public'))

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('login', data => {
    let user = userData.find(item => item.name === data.name )
    if(user){
      socket.emit('loginError')
    }else{
      userData.push(data);
      socket.username = data.name;
      socket.avatar = data.avatar;
      //登录成功
      socket.emit('loginSuccess',data);
      //广播所有用户该用户登录信息
      io.emit('addUser',{value:data,type:'sys'});
      //广播所有用户信息
      io.emit('userList',userData);
    }
  })

  //监听聊天信息
   socket.on('chatMessage',data=>{
     //广播信息
     console.log(socket.username)
     io.emit('receiveMeaage', { type: 'chat_text', value: data, name: socket.username, avatar: socket.avatar})
   })

  //
  //监听断开连接
  socket.on('disConnect',data=>{
    //广播
    let idx= userData.findIndex(item=>item.name == data.name);
     userData.slice(idx,1);
    //广播离开用户信息
    io.emit('delUser', {name:socket.username,
                        avatar: socket.avatar,
                        type:'sys'
                        });
      
    io.emit('userList',userData)

  })

  //图片处理
  socket.on('sendImg',data=>{
    //广播图片
    io.emit('receiveImg',{type:'img',value:data})
  })

  console.log('changed')

});

http.listen(3000, function () {
  console.log('listening on *:3000');
});