(function() {
  'use strict';

  const people = {};

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
        socket.emit('user register success');
        socket.broadcast.emit('user join', username);
      });

      socket.on('chat message', function(msg) {
        socket.broadcast.emit('chat message', people[socket.id], msg);
      });

      socket.on('disconnect', function() {
        if (people[socket.id]) {
          socket.broadcast.emit('user exit', people[socket.id]);
        }
        delete people[socket.id];
      });
    });
  }
}());
