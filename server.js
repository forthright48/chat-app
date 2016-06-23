(function() {
  'use strict';

  const express = require('express');
  const app = express();
  const http = require('http');
  const server = http.createServer(app);
  const path = require('path');

  /*app
   **************************/
  app.set('port', process.env.PORT || 4802);
  app.set('view engine', 'pug');

  /*Static files
   ***************************/
  app.use('/public', express.static(path.join(__dirname, '/public')));

  /*Attach Socket
   ***************************/
  require('./controllers/io.js').attachSocket(server);

  app.get('/', function(req, res) {
    res.render('index.pug');
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
