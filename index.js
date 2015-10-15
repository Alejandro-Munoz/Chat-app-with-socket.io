/**
 * Created by Alejandro on 10/14/2015.
 */
var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req,res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    socket.on('chat message',function(msg){
        io.emit('chat message',msg);
    });
    console.log('a user connected');
    io.on('disconnect',function(){
        io.emit('disconnect','user disconnected')

    });
});


http.listen(3000, function () {
    console.log('listening on port 3000');
});

