var express = require('express'),
    app= express(),
    server= require('http').createServer(app),
    io= require('socket.io').listen(server),
    path = require('path');

var users=[];
    server.listen(3000);

    app.get('/',function(req,res)
    {
        res.sendFile(__dirname + '/index.html' );
    });
app.use(express.static('public'));
io.sockets.on('connection',function(socket)
{
    console.log("new user connected");
    socket.on('new user',function(data)
    {
        socket.context=data;
      users.push(socket.context);
       // console.log(data);
       io.sockets.emit('all users',users);
    });
    socket.on('send message',function(data){
        io.sockets.emit('new message',data);
    });

    socket.on('send coordinates',function(data)
    {
        socket.broadcast.emit('draw',data);
       //console.log(data);
    });
});