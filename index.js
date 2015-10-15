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

function User(){
    var id=0;
    this.getUser=function(){
        return 'User '+ id++;
    }
}
var u = new User();
io.on('connection',function(socket){
    var userid = u.getUser();
    console.log(userid + ' connected');

    socket.on('chat message',function(msg){
        io.emit('chat message',userid + ' says: '+msg);
    });
    socket.on('disconnect',function(){
        io.emit('disconnect',userid + ' disconnected')

    });
});


http.listen(8888, function () {
    console.log('listening on port 8888');
});

