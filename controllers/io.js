(function() {
  'use strict';

  let people = {};

  module.exports = {
    attachSocket
  };

  /*******************************************
  Implementation
  *******************************************/

  function attachSocket(server) {
    const io = require('socket.io')(server);
    io.on('connection', function(socket) {

      socket.on('user register', function(username) {
        people[socket.id] = username;
      });

      io.emit('user enter', `${socket.id} has entered the chat`);

      socket.on('chat message', function(msg) {
        io.broadcast.emit('chat message', msg);
      });

      socket.on('disconnect', function() {
        io.emit('user exit', `${socket.id} has left the chat`);
        delete people[socket.id];
      });
    });
  }
}());
