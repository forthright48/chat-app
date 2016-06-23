(function() {
  'use strict';

  module.exports = {
    attachSocket
  };

  /*******************************************
  Implementation
  *******************************************/

  function attachSocket(server) {
    const io = require('socket.io')(server);
    io.on('connection', function(socket) {
      io.emit('user enter');

      socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
      });

      socket.on('disconnect', function() {
        io.emit('user exit');
      });
    });
  }
}());
