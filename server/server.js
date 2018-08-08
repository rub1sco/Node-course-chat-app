const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const express = require('express');
const port = process.env.PORT || 3000;
const http = require('http');
const socketIO= require('socket.io');

var app = express();
var server = http.createServer(app);
var io= socketIO(server);



app.use(express.static(publicPath));

server.listen(port,()=>{
  console.log(`server is up on ${port}`)
})
