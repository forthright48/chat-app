(function() {
  'use strict';

  const express = require('express');
  const app = express();
  const http = require('http');
  const server = http.createServer(app);
  const io = require('socket.io')(server);

  /*app
   **************************/
  app.set('port', process.env.PORT || 4802);
  app.set('view engine', 'pug');


  app.get('/', function(req, res) {
    res.sendFile(`${__dirname}/index.html`);
  });

  io.on('connection', function(socket) {
    console.log('a user connected');

    socket.on('chat message', function(msg) {
      io.emit('chat message', msg);
    });

    socket.on('disconnect', function() {
      console.log('user disconnected');
    });
  });

  if (require.main === module) {
    server.listen(app.get('port'), function() {
      console.log(`Server running at port ${ app.get('port') }`);
    });
  } else {
    module.exports = {
      dirname: __dirname,
      server,
      app
    };
  }
}());
