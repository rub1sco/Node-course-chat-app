const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const express = require('express');
const port = process.env.PORT || 3000;
const http = require('http');
const socketIO= require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require ('./utils/users');



var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();



app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log('new user connected');


  socket.on('join', (params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room are required')
    }else {

      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name,params.room);

      io.to(params.room).emit('updateUserList', users.getUserList(params.room));

      //socket.emit from admin text should be welcome newMessage
      socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App'));
      //socket.broadcast.emit from admin text should be new user joined
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin', `${params.name} has joined`));

      callback();
    };
  });

  socket.on('createMessage', (message, callback)=>{
    console.log('message data',message)
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () =>{
    var user = users.removeUser(socket.id);
    if (user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});



server.listen(port,()=>{
  console.log(`server is up on ${port}`)
})
