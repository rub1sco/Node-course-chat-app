const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const express = require('express');
const port = process.env.PORT || 3000;
const http = require('http');
const socketIO= require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('new user connected');

//socket.emit from admin text should be welcome newMessage
socket.emit('newMessage',{
  from: 'Admin',
  text: 'welcome to the chat',
  createdAt: new Date().getTime()
});
//socket.broadcast.emit from admin text should be new user joined
socket.broadcast.emit('newMessage',{
  from: 'Admin',
  text: 'New user joined',
  createdAt: new Date().getTime()
})

  socket.on('createMessage', (message)=>{
    console.log('message data',message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage'),{
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // }
  });

  socket.on('disconnect', () =>{
    console.log('user disconnected.')
  });
});



server.listen(port,()=>{
  console.log(`server is up on ${port}`)
})
