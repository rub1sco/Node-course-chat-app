const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const express = require('express');
const port = process.env.PORT || 3000;
const http = require('http');
const socketIO= require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');


var app = express();
var server = http.createServer(app);
var io = socketIO(server);



app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('new user connected');

//socket.emit from admin text should be welcome newMessage
socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));
//socket.broadcast.emit from admin text should be new user joined
socket.broadcast.emit('newMessage',generateMessage('Admin', 'new User joined'));

  socket.on('createMessage', (message, callback)=>{
    console.log('message data',message)
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () =>{
    console.log('user disconnected.')
  });
});



server.listen(port,()=>{
  console.log(`server is up on ${port}`)
})
